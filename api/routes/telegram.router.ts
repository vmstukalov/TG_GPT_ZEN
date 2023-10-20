import express, {Request, text} from 'express';
import {ITelegramUpdate} from "../interfaces/ITelegramUpdate";
import {ask} from "../services/gpt.service";
import {createPost} from "../services/zen.service";
import {sendTelegramMessage} from "../services/telegram.service";

const telegramRouter = express.Router()

telegramRouter.post("/webhook/:secret", async (req: Request<{ITelegramUpdate, secret: string}>, res) => {

    const secret = req.params.secret;
    const isLocalhost = req.headers.host.includes("localhost")

    if (secret !== process.env.WEBHOOK) {
        res.status(403).json({ok: false, message: "Wrong Secret"})
        return
    }

    const telegramUpdate: ITelegramUpdate = req.body;

    if (telegramUpdate.message) {
        const title = telegramUpdate.message.text
        console.log({request: title});
        ask(title).then(async text => {
            createPost(title, text, isLocalhost);
            sendTelegramMessage(telegramUpdate.message.from.id, `Текст <b>${title}</b> придуман. Длина ${text.toString().length}. Публикация займет несколько минут.`)
        }).catch(e => {

        })
    }

    res.json({ok: true});

})

export default telegramRouter
