import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

import WhatsApp from 'whatsapp';

// Your test sender phone number
const wa = new WhatsApp(process.env.WA_PHONE_NUMBER_ID);

// Enter the recipient phone number
const recipient_number = '5544984146379';

async function send_message() {
    try {
        const sent_text_message = wa.messages.text({ "body": "Hello world" }, recipient_number);

        await sent_text_message.then((res) => {
            console.log(res.rawResponse());
        });
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

send_message();
