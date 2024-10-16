import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [number, setNumber] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send', {
        to: number,
        message: message,
      });
      console.log('Mensagem enviada:', response.data);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WhatsApp Web Clone</h1>
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
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.from_number}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
