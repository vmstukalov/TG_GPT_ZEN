import express, { Request } from 'express';
import {createCookies, createPost} from "../services/zen.service";

const zenRouter = express.Router()

zenRouter.get("/start", async (req, res) => {

    await createCookies();

    res.json({ok: true})
})

zenRouter.get("/post", async (req, res) => {

    await createPost("Что это", "Это текст");

    res.json({ok: true})
})

export default zenRouter
