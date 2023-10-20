import express, { Request } from 'express';

const telegramRouter = express.Router()

telegramRouter.post("/webhook/:secret", (req, res) => {
    const secret = req.params.secret;

    if (secret !== process.env.WEBHOOK) {
        res.json({ok: false})
        return
    }



    res.json({ok: true});

})

export default telegramRouter
