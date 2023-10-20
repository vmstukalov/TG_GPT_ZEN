import express, { Request } from 'express';
import {createCookies, createPost} from "../services/zen.service";

const zenRouter = express.Router()

zenRouter.get("/start", async (req, res) => {

    if (!req.headers.host.includes("localhost")) {
        res.json({ok: false, message: "createCookies() возможно запустить только на localhost"})
    }

    await createCookies();

    res.json({ok: true})
})

/*
* С локалхоста можно проверить как создается пост
* */
zenRouter.get("/post", async (req, res) => {

    const isLocalhost = req.headers.host.includes("localhost");

    console.log(req.headers.host)

    await createPost("Что это", "Это текст", isLocalhost);

    res.json({ok: true})
})

export default zenRouter
