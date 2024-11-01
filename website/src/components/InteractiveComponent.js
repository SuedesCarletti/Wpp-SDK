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
    return mediaUrl;
  } catch (error) {
    console.error('Erro ao obter a mídia:', error);
    return '';
  }
};

const fetchMessagesWithMedia = async (messages) => {
  return await Promise.all(
    messages.map(async (msg) => {
      if (['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type)) {
        const mediaMetadata = msg.message;
        const match = mediaMetadata.match(/'id': '(\d+)'/);
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
  const socket = useRef(null);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`${API_URL}/conversations`);
      setConversations(response.data);
      console.log('Conversas atualizadas:', response.data);
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
    }
  };

  useEffect(() => {
    socket.current = io(WS_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.current.on('connect', () => {
      console.log('Conectado ao WebSocket');
    });

    socket.current.on('disconnect', (reason) => {
      console.log(`Desconectado do WebSocket: ${reason}`);
    });

    socket.current.on('message', async (data) => {
      const newMessage = typeof data === 'string' ? JSON.parse(data) : data;
      console.log('Nova mensagem recebida:', newMessage);

      // Adiciona mais detalhes ao log
      console.log('Conversa selecionada no momento:', selectedConversation);
      console.log('Número da mensagem recebida:', newMessage.from_number);

      if (selectedConversation && newMessage.from_number === selectedConversation.name && selectedConversation.messages.some(msg => msg.contact_wamid === newMessage.from_number)) {
        console.log('Mensagem pertence ao chat selecionado');
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.log('Mensagem não pertence ao chat selecionado');
        await fetchConversations();
      }
    });

    fetchConversations();

    return () => {
      if (socket.current) socket.current.disconnect();
      console.log('Cleanup: Socket desconectado');
    };
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      const fetchSelectedMessages = async () => {
        const updatedMessages = await fetchMessagesWithMedia(selectedConversation.messages);
        setMessages(updatedMessages);
        console.log('Mensagens carregadas para a conversa selecionada:', updatedMessages);
      };
      fetchSelectedMessages();
    }
  }, [selectedConversation]);

  const handleConversationClick = async (conversation) => {
    console.log('Conversa selecionada:', conversation);
    setSelectedConversation(conversation);
    setNumber(conversation.name);
    const updatedMessages = await fetchMessagesWithMedia(conversation.messages);
    setMessages(updatedMessages);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const newMessage = {
        from_number: 'meu_numero',
        message: message,
        type: 'text',
      };
      console.log('Enviando mensagem:', newMessage);
      socket.current.emit('message', JSON.stringify(newMessage));
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setSelectedConversation((prevConversation) => ({
        ...prevConversation,
        messages: [...prevConversation.messages, newMessage],
      }));
      setMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div className="interactive-page">
      <ConversationList
        onSelectConversation={handleConversationClick}
        conversations={conversations}
      />
      <div className="main-content">
        <div className="messages">
          <h2>Mensagens Recebidas</h2>
          <ul>
            {selectedConversation &&
              messages.map((msg) => (
                <li key={msg.wamid}>
                  <strong>{msg.from_number}</strong>
                  {msg.type === 'text' && msg.message}
                  {['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type) &&
                    !msg.mediaUrl && <span>Carregando mídia...</span>}
                  {msg.type === 'sticker' && msg.mediaUrl && (
                    <div>
                      <img src={msg.mediaUrl} alt="Sticker" className="message-image" />
                    </div>
                  )}
                  {msg.type === 'image' && msg.mediaUrl && (
                    <div>
                      <img src={msg.mediaUrl} alt="Imagem" className="message-image" />
                    </div>
                  )}
                  {msg.type === 'video' && msg.mediaUrl && (
                    <div>
                      <video controls src={msg.mediaUrl}></video>
                    </div>
                  )}
                  {msg.type === 'audio' && msg.mediaUrl && (
                    <div>
                      <audio controls src={msg.mediaUrl}></audio>
                    </div>
                  )}
                  {msg.type === 'document' && msg.mediaUrl && (
                    <div>
                      <a
                        href={msg.mediaUrl}
                        download={msg.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Documento
                      </a>
                    </div>
                  )}
                </li>
              ))}
            {!selectedConversation && <p>Selecione uma conversa para ver as mensagens.</p>}
          </ul>
        </div>
        {selectedConversation && (
          <form className="send-message-form" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Número do destinatário"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              readOnly
            />
            <textarea
              placeholder="Digite sua mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InteractiveComponent;
