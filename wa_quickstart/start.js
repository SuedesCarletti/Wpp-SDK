import dotenv from 'dotenv';
dotenv.config();

import WhatsApp from 'whatsapp';

const wa = new WhatsApp({
    id: process.env.WA_PHONE_NUMBER_ID,
    token: process.env.CLOUD_API_ACCESS_TOKEN,
    version: process.env.CLOUD_API_VERSION
});

async function send_message() {
    try {
        const sent_text_message = await wa.messages.text({
            to: '5544984146379',
            body: 'Hello world'
        });
        console.log(sent_text_message.rawResponse());
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

send_message();
