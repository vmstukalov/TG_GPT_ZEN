import express, { Request } from 'express';
import {ITelegramUpdate} from "../interfaces/ITelegramUpdate";
import {ask} from "../services/gpt.service";

const telegramRouter = express.Router()

telegramRouter.post("/webhook/:secret", async (req: Request<{ITelegramUpdate, secret: string}>, res) => {

    const secret = req.params.secret;

    if (secret !== process.env.WEBHOOK) {
        res.status(403).json({ok: false, message: "Wrong Secret"})
        return
    }

    const telegramUpdate: ITelegramUpdate = req.body;

    if (telegramUpdate.message) {
        const title = telegramUpdate.message.text
        ask(title)
    }

    res.json({ok: true});

})

export default telegramRouter
