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
          const match = msg.message && msg.message.match(/'id': '(\w+)'/);
          if (match) {
            const mediaId = match[1];
            const mediaUrl = await fetchMediaUrl(mediaId);
            return { ...msg, mediaUrl };
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

  // Enviar mensagem/mídia
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

    const isMediaUpload = mediaFile !== null;
    const content = isMediaUpload ? mediaFile : message;

    if (!isMediaUpload && !message.trim()) {
      alert('Digite uma mensagem antes de enviar.');
      return;
    }

    try {
      const tempWamid = `temp_${Date.now()}`;

      const formData = new FormData();
      formData.append('to', to);
      formData.append('type', isMediaUpload ? mediaType : 'text');
      
      if (isMediaUpload) {
        formData.append('media', mediaFile);
      } else {
        formData.append('message', message);
      }

      // Atualizar conversas com mensagem temporária
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map(conv => {
          if (conv.wamid === selectedConversation.wamid ||
              conv.fromNumber === selectedConversation.fromNumber) {
            const newMessage = {
              from_number: 'meu_numero',
              message: isMediaUpload ? `Enviando ${mediaType}` : message,
              wamid: tempWamid,
              type: isMediaUpload ? mediaType : 'text',
              timestamp: new Date().toISOString()
            };

            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage.message,
              timestamp: new Date().toISOString()
            };
          }
          return conv;
        });

        return updatedConversations.sort((a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
        );
      });

      // Atualizar mensagens selecionadas
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          from_number: 'meu_numero',
          message: isMediaUpload ? `Enviando ${mediaType}` : message,
          wamid: tempWamid,
          type: isMediaUpload ? mediaType : 'text',
          timestamp: new Date().toISOString()
        }
      ]);

      // Enviar via API
      const response = await axios.post(`${API_URL}/send`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Substituir mensagem temporária pela confirmada
      if (response.data && response.data.messages && response.data.messages[0].id) {
        const actualWamid = response.data.messages[0].id;

        setConversations((prevConversations) =>
          prevConversations.map(conv => {
            if (conv.wamid === selectedConversation.wamid ||
                conv.fromNumber === selectedConversation.fromNumber) {
              return {
                ...conv,
                messages: conv.messages.map(msg =>
                  msg.wamid === tempWamid
                    ? {...msg, wamid: actualWamid}
                    : msg
                )
              };
            }
            return conv;
          })
        );

        setMessages((prevMessages) =>
          prevMessages.map(msg =>
            msg.wamid === tempWamid
              ? {...msg, wamid: actualWamid}
              : msg
          )
        );
      }

      // Limpar estados de envio
      setMessage('');
      setMediaFile(null);
      setMediaType('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
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

  // Selecionar conversa
  const handleSelectConversation = useCallback((conversation) => {
    setSelectedConversation(conversation);
    setMessages(conversation.messages || []);
    localStorage.setItem('selectedConversation', JSON.stringify(conversation));
  }, []);

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
                      <strong>{msg.contact_name || msg.from_number}</strong>: {msg.message}
                      {msg.type === 'sticker' && (msg.proxy_media || msg.mediaUrl) && (
                        <img
                          src={msg.proxy_media || msg.mediaUrl}
                          alt="Sticker"
                          className="sticker"
                        />
                      )}
                      {msg.type === 'image' && (msg.proxy_media || msg.mediaUrl) && (
                        <img
                          src={msg.proxy_media || msg.mediaUrl}
                          alt="Imagem"
                          className="image"
                        />
                      )}
                      {msg.type === 'video' && (msg.proxy_media || msg.mediaUrl) && (
                        <video controls>
                          <source src={msg.proxy_media || msg.mediaUrl} type="video/mp4" />
                          Seu navegador não suporta a reprodução de vídeo.
                        </video>
                      )}
                      {msg.type === 'audio' && (msg.proxy_media || msg.mediaUrl) && (
                        <audio controls>
                          <source src={msg.proxy_media || msg.mediaUrl} type="audio/mpeg" />
                          Seu navegador não suporta a reprodução de áudio.
                        </audio>
                      )}
                      {msg.type === 'document' && (msg.proxy_media || msg.mediaUrl) && (
                        <a
                          href={msg.proxy_media || msg.mediaUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Documento
                        </a>
                      )}
					  {['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type) &&
                        !(msg.proxy_media || msg.mediaUrl) && (
                          <span>Carregando mídia...</span>
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
                  placeholder="Digite sua mensagem"
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

