import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ConversationList from './ConversationList';
import '../css/custom.css';

const API_URL = 'https://wppapp.glitch.me';
const WS_URL = 'ws://wppapp.glitch.me';

// Função para recuperar URL de mídia
const fetchMediaUrl = async (mediaId) => {
  try {
    const mediaUrl = `${API_URL}/proxy_media/${mediaId}`;
    console.log(`Obtendo URL de mídia para ID ${mediaId}: ${mediaUrl}`);
    return mediaUrl;
  } catch (error) {
    console.error('Erro ao obter a URL da mídia:', error);
    return '';
  }
};

// Função para processar mensagens com mídia
const fetchMessagesWithMedia = async (messages) => {
  if (!messages || messages.length === 0) return [];

  return await Promise.all(
    messages.map(async (msg) => {
      try {
        if (['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type)) {
          if (msg.media_id) {
            const mediaUrl = await fetchMediaUrl(msg.media_id);
            return { 
              ...msg, 
              mediaUrl,
              caption: msg.media?.caption || msg.caption || msg.message // Inclui msg.message como fallback
            };
          }
          if (msg.media?.id) {
            const mediaUrl = await fetchMediaUrl(msg.media.id);
            return { 
              ...msg, 
              mediaUrl,
              caption: msg.media.caption || msg.caption || msg.message // Inclui msg.message como fallback
            };
          }
        }
      } catch (error) {
        console.error('Erro ao processar mensagem com mídia:', msg, error);
      }
      return msg;
    })
  );
};

const InteractiveComponent = () => {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState('');

  const fileInputRef = useRef(null);
  const socketRef = useRef(null);

  // Normalizar contato com processamento de mídia
  const normalizeContact = async (contact) => {
    const firstMessage = contact.messages[0];
    const messages = contact.messages || [];

    const messagesWithMedia = await fetchMessagesWithMedia(messages);

    return {
      id: contact.wamid ||
           (firstMessage.contacts && firstMessage.contacts[0].wa_id) ||
           firstMessage.from_number,
      wamid: contact.wamid ||
             (firstMessage.contacts && firstMessage.contacts[0].wa_id),
      fromNumber: firstMessage.from_number,
      name: contact.name ||
            (firstMessage.contacts && firstMessage.contacts[0].profile.name) ||
            firstMessage.contact_name ||
            'Contato Desconhecido',
      messages: messagesWithMedia,
      lastMessage: messages[messages.length - 1]?.message || '',
      timestamp: messages[messages.length - 1]?.timestamp || new Date().toISOString()
    };
  };

  // Buscar conversas
  const fetchConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/conversations`);

      const processedContacts = await Promise.all(
        response.data.map(normalizeContact)
      );

      const sortedConversations = processedContacts.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      );

      setConversations(sortedConversations);

      if (sortedConversations.length > 0) {
        const firstConversation = sortedConversations[0];
        setSelectedConversation(firstConversation);
        setMessages(firstConversation.messages || []);
      }
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectConversation = useCallback(async (conversation) => {
    setSelectedConversation(conversation);
    setMessages(conversation.messages || []);
    localStorage.setItem('selectedConversation', JSON.stringify(conversation));
    
    try {
      const unreadMessages = conversation.messages.filter(msg => msg.from_number !== 'meu_numero');
      await Promise.all(unreadMessages.map(msg => 
        axios.post(`${API_URL}/mark_messages_read`, { message_id: msg.wamid })
      ));
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }, []);

  // Tratamento de upload de mídia
  const handleMediaUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const allowedTypes = ['image', 'video', 'audio', 'application'];

      if (allowedTypes.includes(fileType)) {
        setMediaFile(file);
        setMediaType(
          fileType === 'application'
            ? 'document'
            : fileType
        );
      } else {
        alert('Tipo de arquivo não suportado');
      }
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!selectedConversation) {
      alert('Selecione uma conversa primeiro');
      return;
    }

    const to = selectedConversation.fromNumber || selectedConversation.wamid;
    if (!to) {
      alert('Número de contato inválido ou ausente.');
      return;
    }

    if (!message.trim() && !mediaFile) {
      alert('Digite uma mensagem ou selecione um arquivo para enviar.');
      return;
    }

    try {
      const tempWamid = `temp_${Date.now()}`;
      let payload;
      let config = {
        headers: { 'Content-Type': 'application/json' }
      };

      if (mediaFile) {
        const formData = new FormData();
        formData.append('to', to);
        formData.append('media', mediaFile);
        formData.append('type', mediaType);

        // Garante que o caption seja enviado corretamente
        if (message.trim()) {
          formData.append('caption', message.trim());
          formData.append('text', message.trim()); // Mantém compatibilidade
        }

        config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        };
        payload = formData;
      } else {
        payload = {
          to: to,
          text: message.trim(),
          type: 'text'
        };
      }

      const response = await axios.post(`${API_URL}/send`, payload, config);

      // Atualiza as conversas com a nova mensagem
	const newMessage = {
	  from_number: 'meu_numero',
	  wamid: tempWamid,
	  type: mediaFile ? mediaType : 'text',
	  timestamp: new Date().toISOString(),
	  mediaUrl: mediaFile ? URL.createObjectURL(mediaFile) : undefined
	};

	// Só adiciona campos relacionados ao texto se houver mensagem
	if (message.trim()) {
	  newMessage.message = message.trim();
	  newMessage.caption = message.trim();
	  if (mediaFile) {
	    newMessage.media = {
	      caption: message.trim()
	    };
	  }
	}	

	// Atualização das conversas
	setConversations(prevConversations => {
	  const updatedConversations = prevConversations.map(conv => {
	    if (conv.wamid === selectedConversation.wamid ||
	        conv.fromNumber === selectedConversation.fromNumber) {
	      const updatedMessages = [...conv.messages];
	      // Remove qualquer mensagem temporária anterior com o mesmo wamid se existir
	      const existingIndex = updatedMessages.findIndex(m => m.wamid === tempWamid);
	      if (existingIndex !== -1) {
	        updatedMessages.splice(existingIndex, 1);
	      }
	      updatedMessages.push(newMessage);
	      
	      return {
	        ...conv,
	        messages: updatedMessages,
	        lastMessage: message.trim() || (mediaFile ? '' : message),
	        timestamp: new Date().toISOString()
	      };
	    }
	    return conv;
	  });

	  return updatedConversations.sort((a, b) =>
	    new Date(b.timestamp) - new Date(a.timestamp)
	  );
	});

	// Atualização das mensagens da conversa atual
	setMessages(prevMessages => {
	  const updatedMessages = [...prevMessages];
	  // Remove qualquer mensagem temporária anterior com o mesmo wamid se existir
	  const existingIndex = updatedMessages.findIndex(m => m.wamid === tempWamid);
	  if (existingIndex !== -1) {
	    updatedMessages.splice(existingIndex, 1);
	  }
	  updatedMessages.push(newMessage);
	  return updatedMessages;
	});

      // Limpa os campos após envio
      setMessage('');
      setMediaFile(null);
      setMediaType('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Atualiza com o ID real da mensagem quando disponível
      if (response.data?.messages?.[0]?.id) {
        const actualWamid = response.data.messages[0].id;
        
        // Atualiza o ID da mensagem mantendo o caption
        setConversations(prevConversations =>
          prevConversations.map(conv => {
            if (conv.wamid === selectedConversation.wamid ||
                conv.fromNumber === selectedConversation.fromNumber) {
              return {
                ...conv,
                messages: conv.messages.map(msg =>
                  msg.wamid === tempWamid ? {
                    ...msg,
                    wamid: actualWamid,
                    media_id: response.data.messages[0].media_id // Adiciona media_id se disponível
                  } : msg
                )
              };
            }
            return conv;
          })
        );

        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.wamid === tempWamid ? {
              ...msg,
              wamid: actualWamid,
              media_id: response.data.messages[0].media_id // Adiciona media_id se disponível
            } : msg
          )
        );
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Falha ao enviar mensagem. Por favor, tente novamente.');
    }
  };

  // Configurar WebSocket
  useEffect(() => {
    socketRef.current = io(WS_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    fetchConversations();

    socketRef.current.on('conversation_update', async (updatedContact) => {
      try {
        const normalizedContact = await normalizeContact(updatedContact);

        // Atualizar lista de conversas
        setConversations((prevConversations) => {
          const existingIndex = prevConversations.findIndex(
            (conv) => conv.wamid === normalizedContact.wamid ||
                      conv.fromNumber === normalizedContact.fromNumber
          );

          if (existingIndex !== -1) {
            const existingMessages = prevConversations[existingIndex].messages;
            const existingWamids = new Set(existingMessages.map(msg => msg.wamid));

            // Filtrar apenas novas mensagens
            const newMessages = normalizedContact.messages.filter(
              msg => !existingWamids.has(msg.wamid)
            );

            const mergedConversations = [...prevConversations];
            mergedConversations[existingIndex] = {
              ...prevConversations[existingIndex],
              messages: [...existingMessages, ...newMessages],
              lastMessage: newMessages.length > 0
                ? newMessages[newMessages.length - 1].message
                : prevConversations[existingIndex].lastMessage,
              timestamp: newMessages.length > 0
                ? newMessages[newMessages.length - 1].timestamp
                : prevConversations[existingIndex].timestamp
            };

            return mergedConversations.sort((a, b) =>
              new Date(b.timestamp) - new Date(a.timestamp)
            );
          }

          return [...prevConversations, normalizedContact].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
          );
        });

        // Atualizar conversa selecionada em tempo real
        setSelectedConversation((prevSelectedConversation) => {
          if (prevSelectedConversation &&
              (prevSelectedConversation.wamid === normalizedContact.wamid ||
               prevSelectedConversation.fromNumber === normalizedContact.fromNumber)) {
            const existingWamids = new Set(
              prevSelectedConversation.messages.map(msg => msg.wamid)
            );

            const newMessages = normalizedContact.messages.filter(
              msg => !existingWamids.has(msg.wamid)
            );

            const updatedSelectedConversation = {
              ...prevSelectedConversation,
              messages: [...prevSelectedConversation.messages, ...newMessages],
              lastMessage: newMessages.length > 0
                ? newMessages[newMessages.length - 1].message
                : prevSelectedConversation.lastMessage,
              timestamp: newMessages.length > 0
                ? newMessages[newMessages.length - 1].timestamp
                : prevSelectedConversation.timestamp
            };

            // Atualizar mensagens diretamente para conversa selecionada
            setMessages(updatedSelectedConversation.messages);

            return updatedSelectedConversation;
          }
          return prevSelectedConversation;
        });
      } catch (error) {
        console.error('Erro no processamento da atualização:', error);
      }
    });

    socketRef.current.on('connect', () => {
      console.log('Conectado ao servidor de WebSocket');
    });

    socketRef.current.on('disconnect', () => {
      console.log('Desconectado do servidor de WebSocket');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [fetchConversations]);

  // Renderização do componente
  return (
    <div className="interactive-page">
      <ConversationList
        onSelectConversation={handleSelectConversation}
        conversations={conversations}
      />
      <div className="main-content">
        {selectedConversation ? (
          <>
            <div className="messages">
              <h2>Mensagens Recebidas</h2>
              <ul>
                {Array.isArray(messages) && messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <li key={`${msg.wamid || msg.from_number}-${index}`}>
                      <strong>{msg.contact_name || msg.from_number}</strong>: {msg.type === 'text' ? msg.message : ''}
                      {msg.type === 'sticker' && msg.mediaUrl && (
                        <img
                          src={msg.mediaUrl}
                          alt="Sticker"
                          className="sticker"
                        />
                      )}
                      {msg.type === 'image' && msg.mediaUrl && (
                        <div className="media-container">
                          <img
                            src={msg.mediaUrl}
                            alt="Imagem"
                            className="image"
                          />
                          {msg.caption && <div className="media-caption">{msg.caption}</div>}
                        </div>
                      )}
                      {msg.type === 'video' && msg.mediaUrl && (
                        <div className="media-container">
                          <video controls>
                            <source src={msg.mediaUrl} type="video/mp4" />
                            Seu navegador não suporta a reprodução de vídeo.
                          </video>
                          {msg.caption && <div className="media-caption">{msg.caption}</div>}
                        </div>
                      )}
                      {msg.type === 'audio' && msg.mediaUrl && (
                        <audio controls>
                          <source src={msg.mediaUrl} type="audio/mpeg" />
                          Seu navegador não suporta a reprodução de áudio.
                        </audio>
                      )}
                      {msg.type === 'document' && msg.mediaUrl && (
                        <div className="media-container">
                          <a
                            href={msg.mediaUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Documento
                          </a>
                          {msg.caption && <div className="media-caption">{msg.caption}</div>}
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <p>Nenhuma mensagem encontrada nesta conversa.</p>
                )}
              </ul>
            </div>
            <form className="send-message-form" onSubmit={sendMessage}>
              <div className="message-input-container">
                <textarea
                  placeholder={mediaFile ? "Digite uma legenda para a mídia..." : "Digite sua mensagem"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="message-textarea"
                />
                <div className="media-upload-container">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleMediaUpload}
                    accept="image/*,video/*,audio/*,application/pdf,application/doc,application/docx"
                    className="file-input"
                  />
                  {mediaFile && (
                    <div className="media-preview">
                      <span>{mediaFile.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setMediaFile(null);
                          setMediaType('');
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        ✖
                      </button>
                    </div>
                  )}
                  <button type="submit" className="send-button">
                    {mediaFile ? `Enviar ${mediaType}` : 'Enviar'}
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <p>Selecione uma conversa para começar.</p>
        )}
      </div>
    </div>
  );
};

export default InteractiveComponent;
