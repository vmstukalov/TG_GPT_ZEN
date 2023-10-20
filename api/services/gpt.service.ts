import OpenAI from "openai";



export async function ask(request: string) {
    const openai = new OpenAI({
        apiKey: process.env.CHAT_GPT_API_KEY
    });
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: request }],
        model: "gpt-3.5-turbo",
        max_tokens: 3000
    });

    let result = completion.choices[0].message.content
    let finish_reason = completion.choices[0].finish_reason

    console.log({completion})

    if (finish_reason === 'length') {
        //обработка кнопки "Continue"
    }

    return result;
}
