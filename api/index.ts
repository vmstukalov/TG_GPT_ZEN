import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import telegramRouter from "./routes/telegram.router";
import zenRouter from "./routes/zen.router";
import gptRouter from "./routes/gpt.router";

import logger from 'morgan'

const app = express()
const port = 9001

app.use(logger('dev'))
app.use(express.json())

app.use("/telegram", telegramRouter)
app.use("/zen", zenRouter)
app.use("/gpt", gptRouter)

app.set('json spaces', 2)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
