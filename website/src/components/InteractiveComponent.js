import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConversationList from './ConversationList';

function InteractiveComponent() {
  const [message, setMessage] = useState('');
  const [number, setNumber] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeWamid, setActiveWamid] = useState(null);

  useEffect(() => {
    if (activeWamid) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`https://whatsapapp.glitch.me/messages/${activeWamid}`); // URL para buscar mensagens de uma conversa específica
          setMessages(response.data);
        } catch (error) {
          console.error('Erro ao buscar mensagens:', error);
        }
      };

      fetchMessages();
    }
  }, [activeWamid]);

  const sendMessage = async () => {
    try {
      const response = await axios.post('https://whatsapapp.glitch.me/send', { // URL do backend no Glitch
        to: number,
        message: message,
      });
      console.log('Mensagem enviada:', response.data);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div className="interactive-page">
      <ConversationList setActiveWamid={setActiveWamid} />
      <div className="interactive-component">
        <input
          type="text"
          placeholder="Número do destinatário"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <textarea
          placeholder="Digite sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar</button>
        <h2>Mensagens Recebidas</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.from_number}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InteractiveComponent;
