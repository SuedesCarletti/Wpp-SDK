import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList';

const API_URL = 'https://whatsapapp.glitch.me';

const fetchMediaUrl = async (mediaId) => {
  try {
    const response = await axios.get(`${API_URL}/media/${mediaId}`);
    if (response.data.url) {
      const mediaResponse = await axios.get(response.data.url, {
        headers: {
          Authorization: `Bearer EAAcgS5sRJjgBO0411WBqvRjNQyMa7C8sfq4t6iiJ7cAQlWdjlFTdet4xhONS4X5GARw1xOwjifTTnvDwrvtIMLTJq3SXM64fDL5ByDTpDkZBkdc1rz1aw6Q9abKQprpjAAZBaDm9xMSHIBkLdye3ZC1YkC6FrccOAvBciOgTksOvGNzL5tiVWFPA3zl82ZCH8AZDZD`,
        },
        responseType: 'blob',
      });
      const blob = new Blob([mediaResponse.data]);
      return URL.createObjectURL(blob);
    }
    return '';
  } catch (error) {
    console.error('Erro ao obter a mídia:', error);
    return '';
  }
};

function InteractiveComponent() {
  const [message, setMessage] = useState('');
  const [number, setNumber] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

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
  }, []);

  const handleConversationClick = async (conversation) => {
    setSelectedConversation(conversation);
    setNumber(conversation.name);
    const updatedMessages = await Promise.all(conversation.messages.map(async (msg) => {
      if (['sticker', 'image', 'video', 'audio', 'document'].includes(msg.type)) {
        const mediaUrl = await fetchMediaUrl(msg.message);
        return {
          ...msg,
          mediaUrl
        };
      }
      return msg;
    }));
    setMessages(updatedMessages);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/send`, {
        to: number,
        message: message,
        type: 'text'
      });
      const newMessage = {
        from_number: "meu_numero",
        message: message,
        type: "text"
      };
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
            {selectedConversation ? selectedConversation.messages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.from_number}:</strong>
                {msg.type === "text" && msg.message}
                {msg.type === "sticker" && <img src={msg.mediaUrl} alt="Sticker" />}
                {msg.type === "image" && <img src={msg.mediaUrl} alt="Imagem" />}
                {msg.type === "video" && <video controls src={msg.mediaUrl}></video>}
                {msg.type === "audio" && <audio controls src={msg.mediaUrl}></audio>}
                {msg.type === "document" && <a href={msg.mediaUrl} download target="_blank" rel="noopener noreferrer">Documento</a>}
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
}

export default InteractiveComponent;
