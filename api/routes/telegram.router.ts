import express, { Request } from 'express';
import {ITelegramUpdate} from "../interfaces/ITelegramUpdate";
import {ask} from "../services/gpt.service";
import {createPost} from "../services/zen.service";

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
        ask(title).then(text => {
            createPost(title, text, isLocalhost)
        })
    }

    res.json({ok: true});

})

export default telegramRouter
