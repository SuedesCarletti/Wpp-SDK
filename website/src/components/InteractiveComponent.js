import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ConversationList from './ConversationList';
import '../css/custom.css';
import produce from 'immer';

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

const handleConversationClick = useCallback((conversation) => {
  // Remover logs de depuração
  const fullConversation = conversations.find(conv => 
    conv.contact_wamid === conversation.contact_wamid || 
    conv.contact_wamid === conversation.wamid ||
    conv.from_number === conversation.from_number ||
    conv.name === conversation.name
  );

  if (fullConversation) {
    setSelectedConversation(fullConversation);
    setMessages(fullConversation.messages || []);
    setNumber(fullConversation.from_number || '');
    localStorage.setItem('selectedConversation', JSON.stringify(fullConversation));
  }
}, [conversations]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Escape') {
      setSelectedConversation(null);
      setMessages([]);
      setNumber('');
      localStorage.removeItem('selectedConversation');
    }
  }, []);

// Adicionar event listener para tecla Escape
useEffect(() => {
  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      clearSelectedConversation();
    }
  };

  document.addEventListener('keydown', handleEscapeKey);
  return () => {
    document.removeEventListener('keydown', handleEscapeKey);
  };
}, []);

// Adicionar método para limpar seleção
const clearSelectedConversation = () => {
  setSelectedConversation(null);
  setMessages([]);
  setNumber('');
  localStorage.removeItem('selectedConversation');
};

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
              const enhancedConversation = {
                ...conversation,
                contact_wamid: conversation.contact_wamid || conversation.wamid,
                from_number: conversation.from_number || conversation.phone,
                name: conversation.name || conversation.contact_name || 'Contato Desconhecido'
              };

              const updatedMessages = await fetchMessagesWithMedia(enhancedConversation.messages || []);
              return {
                ...enhancedConversation,
                messages: updatedMessages
              };
            })
          );

          const sortedConversations = conversationsWithMedia.sort((a, b) => {
            const dateA = new Date(a.lastMessageTimestamp || 0);
            const dateB = new Date(b.lastMessageTimestamp || 0);
            return dateB - dateA;
          });

          setConversations(sortedConversations);

          const savedConversation = localStorage.getItem('selectedConversation');
          if (savedConversation) {
            const parsedConversation = JSON.parse(savedConversation);
            const foundConversation = sortedConversations.find(
              conv => conv.contact_wamid === parsedConversation.contact_wamid
            );

            if (foundConversation) {
              handleConversationClick(foundConversation);
            }
          }

        } else {
          console.log('Nenhuma conversa encontrada.');
          setConversations([]);
        }
      } catch (error) {
        console.error('Erro ao buscar conversas:', error);
      }
    };

    fetchInitialConversations();
  }, [handleConversationClick]);

  useEffect(() => {
    if (!socket.current) {
      console.log('Inicializando o WebSocket...');

      socket.current = io(WS_URL, {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      socket.current.on('connect', () => {
        console.log('Conectado ao WebSocket');
      });

      socket.current.on('disconnect', (reason) => {
        console.warn('WebSocket desconectado:', reason);
      });

      socket.current.on('conversation_update', async (updatedConversation) => {
        console.log('Conversa atualizada recebida:', updatedConversation);

        const updatedMessages = await fetchMessagesWithMedia(updatedConversation.messages);

        const updatedConv = {
          ...updatedConversation,
          messages: updatedMessages,
          contact_name: updatedConversation.contact_name || 'Desconhecido',
        };

        setConversations((prevConversations) =>
          produce(prevConversations, (draft) => {
            const existingConvIndex = draft.findIndex(
              (conv) => conv.contact_wamid === updatedConv.contact_wamid
            );

            if (existingConvIndex !== -1) {
              const existingConv = draft[existingConvIndex];

              const newMessages = updatedConv.messages.filter((newMsg) =>
                !existingConv.messages.some((oldMsg) => oldMsg.wamid === newMsg.wamid)
              );

              existingConv.messages = [
                ...new Map(
                  [...existingConv.messages, ...newMessages].map((msg) => [msg.wamid, msg])
                ).values(),
              ];
              existingConv.lastMessage =
                newMessages[newMessages.length - 1]?.message || existingConv.lastMessage;
            } else {
              draft.push({
                ...updatedConv,
                contact_name: updatedConv.contact_name || updatedConv.from_number,
                messages: updatedConv.messages.map((msg) => (msg.contact_name ? msg : { ...msg, contact_name: msg.from_number })),
              });
            }
          })
        );

        if (selectedConversation && selectedConversation.contact_wamid === updatedConv.contact_wamid) {
          setMessages((prevMessages) => [
            ...new Map(
              [...prevMessages, ...updatedMessages].map((msg) => [msg.wamid, msg])
            ).values(),
          ]);
        }
      });
    }
  }, [selectedConversation]);

  const renderMessages = () => {
    if (!messages || messages.length === 0) {
      return <p>Nenhuma mensagem encontrada nesta conversa.</p>;
    }

    return (
      <ul>
        {messages.map((msg, index) => (
          <li key={`${msg.wamid || msg.from_number}-${index}`}>
            <strong>{msg.contact_name || msg.from_number}</strong>: {msg.message || msg.lastMessage}
            {msg.type && ['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type) && (
              <>
                {msg.type === 'sticker' && msg.mediaUrl && <img src={msg.mediaUrl} alt="Sticker" className="sticker" />}
                {msg.type === 'image' && msg.mediaUrl && <img src={msg.mediaUrl} alt="Imagem" className="image" />}
                {msg.type === 'video' && msg.mediaUrl && <video controls src={msg.mediaUrl}></video>}
                {msg.type === 'audio' && msg.mediaUrl && <audio controls src={msg.mediaUrl}></audio>}
                {msg.type === 'document' && msg.mediaUrl && (
                  <a href={msg.mediaUrl} download target="_blank" rel="noopener noreferrer">Documento</a>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="interactive-page">
      <ConversationList
        onSelectConversation={handleConversationClick}
        conversations={conversations}
        selectedConversation={selectedConversation}
      />
      <div className="main-content">
        {selectedConversation ? (
          <>
            <div className="messages">
              <h2>Mensagens de {selectedConversation.name || 'Contato'}</h2>
              {renderMessages()}
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
