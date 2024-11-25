import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ConversationList from './ConversationList';
import '../css/custom.css';

const API_URL = 'https://wppapp.glitch.me';
const WS_URL = 'ws://wppapp.glitch.me';

// Função para buscar URL de mídia
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

// Função para buscar mensagens com mídia
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
  const socket = useRef(null);

  // Função de clique na conversa
  const handleConversationClick = useCallback((conversation) => {
    console.log('Conversa selecionada:', conversation);
    const updatedMessages = conversation.messages?.length ? conversation.messages : [];
    setSelectedConversation(conversation);
    setMessages(updatedMessages);
    setNumber(conversation.phone || ''); // Verifica se o número está sendo atribuído corretamente
    localStorage.setItem('selectedConversation', JSON.stringify(conversation));
  }, []);

  // Função para manipular o pressionamento de tecla (Escape)
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

  // Hook de efeito para carregar as conversas iniciais
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
    // Inicialize o WebSocket uma vez
    socket.current = io(WS_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.current.on('connect', () => console.log('Conectado ao WebSocket'));

    socket.current.on('conversation_update', async (updatedConversation) => {
      console.log('Conversa atualizada recebida do WebSocket:', updatedConversation);

      const updatedMessages = await fetchMessagesWithMedia(updatedConversation.messages || []);

      // Define o nome do contato a partir de updatedConversation ou mantém o anterior
      const contactName =
        updatedConversation.contact_name ||
        conversations.find((conv) => conv.from_number === updatedConversation.from_number)?.contact_name ||
        "Desconhecido";

      const updatedConv = {
        ...updatedConversation,
        messages: updatedMessages,
        contact_name: contactName, // Certifique-se de definir o nome do contato
      };

      setConversations((prevConversations) => {
        const existingConvIndex = prevConversations.findIndex(
          (conv) => conv.from_number === updatedConv.from_number // Compara pelo número do contato
        );

        if (existingConvIndex !== -1) {
          // Atualiza a conversa existente
          const updatedConvs = [...prevConversations];
          const existingConv = updatedConvs[existingConvIndex];

          updatedConvs[existingConvIndex] = {
            ...existingConv,
            ...updatedConv,
            contact_name: contactName, // Atualiza o nome do contato caso seja diferente
          };

          return updatedConvs;
        } else {
          // Adiciona uma nova conversa com o nome do contato
          return [...prevConversations, updatedConv];
        }
      });

      // Atualiza a lista de mensagens exibidas somente se for a conversa atualmente selecionada
      if (
        selectedConversation &&
        updatedConversation.from_number === selectedConversation.from_number
      ) {
        setMessages(updatedMessages);
      }
    });

    socket.current.on('disconnect', (reason) => {
      console.warn(`WebSocket desconectado: ${reason}`);
      if (reason !== 'io client disconnect') {
        socket.current.connect();
      }
    });
  }

  return () => {
    if (socket.current) {
      socket.current.disconnect();
      socket.current = null;
    }
  };
}, []); // Mantém o WebSocket conectado continuamente

useEffect(() => {
  // Sincroniza mensagens exibidas com a conversa selecionada
  if (selectedConversation) {
    setMessages(selectedConversation.messages || []);
  }
}, [selectedConversation]);

// Gerenciar manualmente a seleção da conversa
const handleSelectConversation = (conversation) => {
  setSelectedConversation(conversation);
};

  // Hook para adicionar o evento de "Escape"
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
                      <strong>{msg.contact_name || msg.from_number}</strong>: {msg.message}
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
