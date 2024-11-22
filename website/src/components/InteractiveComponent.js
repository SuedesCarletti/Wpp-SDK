import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ConversationList from './ConversationList';
import '../css/custom.css';

const API_URL = 'https://wppapp.glitch.me';
const WS_URL = 'ws://wppapp.glitch.me';

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

const fetchMessagesWithMedia = async (messages) => {
  if (!messages || messages.length === 0) {
    console.log('Nenhuma mensagem para processar mídia.');
    return [];
  }

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
  const [number, setNumber] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const selectedConversationRef = useRef(selectedConversation);
  const socket = useRef(null);

  const handleConversationClick = useCallback((conversation) => {
    console.log('Conversa selecionada:', conversation);
    const updatedMessages = conversation.messages?.length ? conversation.messages : [];
    setSelectedConversation(conversation);
    setMessages(updatedMessages);
    setNumber(conversation.phone || ''); // Verifica se o número está sendo atribuído corretamente
    localStorage.setItem('selectedConversation', JSON.stringify(conversation));
  }, []);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Escape') {
      setSelectedConversation(null);
      setMessages([]);
      setNumber('');
      localStorage.removeItem('selectedConversation');
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!number) {
      alert('Por favor, selecione uma conversa válida antes de enviar uma mensagem.');
      return;
    }
    if (message.trim()) {
      try {
        const response = await axios.post(`${API_URL}/send`, { number, message });
        console.log(`Mensagem enviada para ${number}: ${message}`);
        setMessages((prevMessages) => [...prevMessages, { from_number: 'Você', message, type: 'text' }]);
        setMessage('');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    } else {
      alert('Por favor, insira uma mensagem para enviar.');
    }
  };

  useEffect(() => {
    const fetchInitialConversations = async () => {
      try {
        const response = await axios.get(`${API_URL}/conversations`);
        console.log('Conversas carregadas da API:', response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          const conversationsWithMedia = await Promise.all(
            response.data.map(async (conversation) => {
              const updatedMessages = await fetchMessagesWithMedia(conversation.messages || []);
              return { ...conversation, messages: updatedMessages };
            })
          );
          setConversations(conversationsWithMedia);
        } else {
          console.log('Nenhuma conversa encontrada.');
          setConversations([]);
        }
      } catch (error) {
        console.error('Erro ao buscar conversas:', error);
      }
    };

    fetchInitialConversations();
  }, []);

useEffect(() => {
  if (!socket.current) {
    socket.current = io(WS_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.current.on('connect', () => console.log('Conectado ao WebSocket'));

    // Escute o evento correto 'conversation_update' que o servidor está emitindo
    socket.current.on('conversation_update', async (updatedConversation) => {
      // Verifica e padroniza o formato da conversa recebida
      console.log('Conversa atualizada recebida do WebSocket:', updatedConversation);

      // Padroniza a estrutura das mensagens recebidas
      const updatedMessages = await fetchMessagesWithMedia(updatedConversation.messages || []);
      const updatedConv = { ...updatedConversation, messages: updatedMessages };

      // Atualiza as conversas no estado
      setConversations((prevConversations) => {
        const existingConvIndex = prevConversations.findIndex(
          (conv) => conv.contact_wamid === updatedConv.contact_wamid
        );

        if (existingConvIndex !== -1) {
          // Se a conversa já existe, atualize as mensagens
          const updatedConvs = [...prevConversations];
          updatedConvs[existingConvIndex] = updatedConv;
          return updatedConvs;
        } else {
          // Se a conversa não existe, adicione a nova conversa
          return [...prevConversations, updatedConv];
        }
      });
    });
  }

  // Limpeza ao desmontar o componente
  return () => {
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
    }
  };
}, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="interactive-page">
      <ConversationList
        onSelectConversation={handleConversationClick}
        conversations={conversations}
      />
      <div className="main-content">
        {selectedConversation ? (
          <>
            <div className="messages">
              <h2>Mensagens Recebidas</h2>
              <ul>
                {messages && messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <li key={`${msg.contact_wamid || msg.from_number}-${index}`}>
                      <strong>{msg.from_number}</strong>: {msg.message}
                      {msg.type === 'sticker' && msg.mediaUrl && <img src={msg.mediaUrl} alt="Sticker" className="sticker" />}
                      {msg.type === 'image' && msg.mediaUrl && <img src={msg.mediaUrl} alt="Imagem" className="image" />}
                      {msg.type === 'video' && msg.mediaUrl && <video controls src={msg.mediaUrl}></video>}
                      {msg.type === 'audio' && msg.mediaUrl && <audio controls src={msg.mediaUrl}></audio>}
                      {msg.type === 'document' && msg.mediaUrl && (
                        <a href={msg.mediaUrl} download target="_blank" rel="noopener noreferrer">Documento</a>
                      )}
                      {['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type) && !msg.mediaUrl && (
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
              <textarea
                placeholder="Digite sua mensagem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Enviar</button>
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
