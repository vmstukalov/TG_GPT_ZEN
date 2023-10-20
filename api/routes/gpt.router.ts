import express from 'express';
import {ask} from "../services/gpt.service";
import {createPost} from "../services/zen.service";

const gptRouter = express.Router()

gptRouter.get("/start", async (req, res) => {

    const request = "Что такое чат gpt";

    const response = await ask(request)

    await createPost(request, response);

    res.json({ok: true, response})
})

export default gptRouter;
