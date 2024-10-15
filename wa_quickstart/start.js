import dotenv from 'dotenv';
dotenv.config();

console.log('WA_PHONE_NUMBER_ID:', process.env.WA_PHONE_NUMBER_ID);
console.log('CLOUD_API_ACCESS_TOKEN:', process.env.CLOUD_API_ACCESS_TOKEN);
console.log('CLOUD_API_VERSION:', process.env.CLOUD_API_VERSION);

import WhatsApp from 'whatsapp';

const wa = new WhatsApp({
  id: process.env.WA_PHONE_NUMBER_ID,
  token: process.env.CLOUD_API_ACCESS_TOKEN,
  version: process.env.CLOUD_API_VERSION
});

const recipient_number = '5544984146379';

async function send_message() {
    try {
        console.log('Enviando mensagem...');
        const sent_text_message = await wa.messages.template({
            to: recipient_number,
            template: {
                name: 'hello_world',
                language: {
                    code: 'en_US'
                }
            }
        });
        console.log('Mensagem enviada:', sent_text_message.rawResponse());
    } catch (e) {
        console.log('Erro ao enviar mensagem:', JSON.stringify(e));
    }
}

send_message();
