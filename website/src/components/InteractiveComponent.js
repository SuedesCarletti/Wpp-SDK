import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';  // Importando o Socket.IO client
import ConversationList from './ConversationList';
import '../css/custom.css'; // Importando o CSS

const API_URL = 'https://whatsapapp.glitch.me';
const WS_URL = 'ws://whatsapapp.glitch.me/socket.io/?EIO=4&transport=websocket'

const fetchMediaUrl = async (mediaId) => {
  try {
    console.log(`Fetching media data for ID: ${mediaId}`);
    const mediaUrl = `${API_URL}/proxy_media/${mediaId}`;
    console.log('Generated media URL:', mediaUrl);  // Log da URL gerada
    return mediaUrl;
  } catch (error) {
    console.error('Erro ao obter a mídia:', error);
    return '';
  }
};

const fetchMessages = async (conversation) => {
  const updatedMessages = await Promise.all(conversation.messages.map(async (msg) => {
    if (['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type)) {
      const mediaMetadata = msg.message;
      const match = mediaMetadata.match(/'id': '(\d+)'/);
      if (match) {
        const mediaId = match[1];
        const mediaUrl = await fetchMediaUrl(mediaId);
        return {
          ...msg,
          mediaUrl
        };
      }
    }
    return msg;
  }));
  return updatedMessages;
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
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
    }
  };

  useEffect(() => {
    fetchConversations();

    socket.current = io(WS_URL, {
      transports: ['websocket'],  // Força o transporte WebSocket
      reconnectionAttempts: 5,    // Número de tentativas de reconexão
      timeout: 10000              // Tempo limite em milissegundos
    });

    socket.current.on('connect', () => {
      console.log('Conectado ao WebSocket');
    });

    socket.current.on('disconnect', () => {
      console.log('Desconectado do WebSocket');
    });

    socket.current.on('message', async (data) => {
      const newMessage = JSON.parse(data);
      if (selectedConversation && newMessage.from_number === selectedConversation.name) {
        const updatedMessages = await fetchMessages(selectedConversation);
        setMessages(updatedMessages);
      } else {
        fetchConversations();  // Atualiza a lista de conversas
      }
    });

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [selectedConversation]);

  const handleConversationClick = async (conversation) => {
    setSelectedConversation(conversation);
    setNumber(conversation.name);
    const updatedMessages = await fetchMessages(conversation);
    setMessages(updatedMessages);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const newMessage = {
        from_number: "meu_numero",
        message: message,
        type: "text"
      };
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
      <ConversationList onSelectConversation={handleConversationClick} conversations={conversations} />
      <div className="main-content">
        <div className="messages">
          <h2>Mensagens Recebidas</h2>
          <ul>
            {selectedConversation ? messages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.from_number}:</strong>
                {msg.type === "text" && msg.message}
                {['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type) && !msg.mediaUrl && (
                  <span>Carregando mídia...</span>
                )}
                {msg.type === "sticker" && msg.mediaUrl && (
                  <div>
                    <img src={msg.mediaUrl} alt="Sticker" className="message-image" />
                  </div>
                )}
                {msg.type === "image" && msg.mediaUrl && (
                  <div>
                    <img src={msg.mediaUrl} alt="Imagem" className="message-image" />
                  </div>
                )}
                {msg.type === "video" && msg.mediaUrl && (
                  <div>
                    <video controls src={msg.mediaUrl}></video>
                  </div>
                )}
                {msg.type === "audio" && msg.mediaUrl && (
                  <div>
                    <audio controls src={msg.mediaUrl}></audio>
                  </div>
                )}
                {msg.type === "document" && msg.mediaUrl && (
                  <div>
                    <a href={msg.mediaUrl} download={msg.mediaUrl} target="_blank" rel="noopener noreferrer">Documento</a>
                  </div>
                )}
              </li>
            )) : (
              <p>Selecione uma conversa para ver as mensagens.</p>
            )}
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
