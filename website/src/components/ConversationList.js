// src/components/ConversationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConversationList({ setActiveWamid }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('https://whatsapapp.glitch.me/conversations'); // Endpoint que retorna a lista de conversas
        setConversations(response.data);
      } catch (error) {
        console.error('Erro ao buscar conversas:', error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="conversation-list">
      <h2>Conversas</h2>
      <ul>
        {conversations.map((conv, index) => (
          <li key={index} onClick={() => setActiveWamid(conv.wamid)}>
            <strong>{conv.name}</strong> {/* ou outro identificador da conversa */}
            <p>{conv.lastMessage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;
