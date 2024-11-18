import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ConversationList from './ConversationList';
import '../css/custom.css';

const API_URL = 'https://wppapp.glitch.me';
const WS_URL = 'ws://wppapp.glitch.me';

// Função para obter URL de mídia com base no ID
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

// Função para adicionar mídia às mensagens
const fetchMessagesWithMedia = async (messages) => {
  if (!messages || messages.length === 0) {
    console.log('Nenhuma mensagem para processar mídia.');
    return [];
  }

  return await Promise.all(
    messages.map(async (msg) => {
      if (['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type)) {
        const match = msg.message && msg.message.match(/'id': '(\w+)'/);
        if (match) {
          const mediaId = match[1];
          const mediaUrl = await fetchMediaUrl(mediaId);
          return { ...msg, mediaUrl };
        }
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

  // Função para selecionar uma conversa
  const handleConversationClick = useCallback((conversation) => {
    console.log('Conversa selecionada:', conversation);
    const updatedMessages = conversation.messages?.length ? conversation.messages : [];
    setSelectedConversation(conversation);
    setMessages(updatedMessages);
    setNumber(conversation.phone || '');
    localStorage.setItem('selectedConversation', JSON.stringify(conversation));
  }, []);

  // Função para limpar seleção de conversa ao pressionar ESC
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Escape') {
      setSelectedConversation(null);
      setMessages([]);
      setNumber('');
      localStorage.removeItem('selectedConversation');
    }
  }, []);

  // Função para enviar mensagem
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

// Fetch inicial de conversas com mídia
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
}, []); // Este useEffect deve estar fechado corretamente.

useEffect(() => {
  socket.current = io(WS_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    timeout: 10000,
  });

  socket.current.on('connect', () => {
    console.log('Conectado ao WebSocket');
  });

  socket.current.on('message', async (newMessage) => {
    console.log('Mensagem recebida do WebSocket:', newMessage);

    try {
      const parsedMessage = typeof newMessage === 'string' ? JSON.parse(newMessage) : newMessage;
      const { from_number, message, type } = parsedMessage;

      // Atualizar a conversa existente ou criar uma nova
      setConversations((prevConversations) => {
        const existingConversationIndex = prevConversations.findIndex((conv) => conv.phone === from_number);

        if (existingConversationIndex !== -1) {
          // Se a conversa existir, adicionar a mensagem a ela
          const updatedMessages = [
            ...prevConversations[existingConversationIndex].messages,
            parsedMessage,
          ];

          // Atualizar a conversa no estado
          const updatedConversations = [...prevConversations];
          updatedConversations[existingConversationIndex] = {
            ...updatedConversations[existingConversationIndex],
            messages: updatedMessages,
          };

          // Garantir que, se a conversa selecionada for a que recebeu a mensagem, ela seja destacada
          if (selectedConversation && selectedConversation.phone === from_number) {
            return updatedConversations; // Mantém a conversa selecionada intacta
          } else {
            return updatedConversations; // Atualiza o restante das conversas
          }
        } else {
          // Se não existir, criar uma nova conversa
          const newConversation = {
            id: `conv-${from_number}`,
            name: `Conversa com ${from_number}`,
            phone: from_number,
            messages: [parsedMessage],
          };
          return [...prevConversations, newConversation];
        }
      });
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
    }
  });

  return () => {
    if (socket.current) {
      socket.current.disconnect();
    }
  };
}, [selectedConversation]); // Adiciona selectedConversation como dependência para que o componente reaja à seleção

  // Atualiza a referência de conversa selecionada
  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
    if (!selectedConversation) {
      setNumber('');
    }
  }, [selectedConversation]);

  // Adiciona evento de tecla ESC para limpar seleção
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
                    <li key={msg.wamid || `${msg.from_number}-${index}`}>
                      <strong>{msg.from_number}</strong>: {msg.message}
                      {['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type) && !msg.mediaUrl && <span>Carregando mídia...</span>}
                      {msg.type === 'sticker' && msg.mediaUrl && <img src={msg.mediaUrl} alt="Sticker" className="sticker" />}
                      {msg.type === 'image' && msg.mediaUrl && <img src={msg.mediaUrl} alt="Imagem" className="image" />}
                      {msg.type === 'video' && msg.mediaUrl && <video controls src={msg.mediaUrl}></video>}
                      {msg.type === 'audio' && msg.mediaUrl && <audio controls src={msg.mediaUrl}></audio>}
                      {msg.type === 'document' && msg.mediaUrl && (
                        <a href={msg.mediaUrl} download={msg.mediaUrl} target="_blank" rel="noopener noreferrer">Documento</a>
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
          <p>Selecione uma conversa para ver as mensagens.</p>
        )}
      </div>
    </div>
  );
};

export default InteractiveComponent;
