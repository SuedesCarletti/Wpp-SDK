import dotenv from 'dotenv';
dotenv.config();

console.log('WA_PHONE_NUMBER_ID:', process.env.WA_PHONE_NUMBER_ID);
console.log('CLOUD_API_ACCESS_TOKEN:', process.env.CLOUD_API_ACCESS_TOKEN);
console.log('CLOUD_API_VERSION:', process.env.CLOUD_API_VERSION);

import WhatsApp from 'whatsapp';

// Your test sender phone number
const wa = new WhatsApp(process.env.WA_PHONE_NUMBER_ID);

// Enter the recipient phone number
const recipient_number = '5544984146379';

async function send_message() {
    try {
        const sent_text_message = await wa.messages.text({ "body": "Hello world" }, recipient_number);
        console.log(sent_text_message.rawResponse());
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

send_message();
