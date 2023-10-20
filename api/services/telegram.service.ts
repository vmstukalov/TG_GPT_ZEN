import axios from "axios";

export async function sendTelegramMessage(chatId, html) {
    const token = process.env.TG_API_KEY
    const url = "https://api.telegram.org/bot" + token + "/sendMessage"

    const data = {
        text: html.replace(/\\n/g, "\n"),
        chat_id: chatId,
        disable_web_page_preview: true,
        parse_mode: 'html',
    }

    await axios.post(url, data, {
        headers: {"Content-type": "application/json"}
    })
}
