import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const recipient_numbers = ['5544984146379', '5543984554965']; // Substitua com outros números se necessário
const messageData = (number) => ({
  messaging_product: 'whatsapp',
  to: number,
  type: 'template',
  template: {
    name: 'aviso_entrega',
    language: { code: 'pt_BR' },
    components: [
      {
        type: 'header',
        parameters: [
          {
            type: 'image',
            image: {
              link: 'https://www.dropbox.com/scl/fi/hry7c2y0gqamem3728tv4/Notifica-o-Entrega.png?rlkey=qo0v6sttqj0rf3ov5cydxevth&st=tll8o8ag&raw=1'
            }
          }
        ]
      }
    ]
  }
});

async function send_messages() {
  try {
    console.log('Enviando mensagens...');
    for (const number of recipient_numbers) {
      console.log(`Enviando mensagem para: ${number}`);
      const response = await axios.post(
        `https://graph.facebook.com/v20.0/${process.env.WA_PHONE_NUMBER_ID}/messages`,
        messageData(number),
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUD_API_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`Mensagem enviada para ${number}:`, response.data);
    }
  } catch (e) {
    if (e.response) {
      console.error('Erro ao enviar mensagem:', JSON.stringify(e.response.data, null, 2));
    } else {
      console.error('Erro ao enviar mensagem:', e.message);
    }
  }
}

send_messages();
