
interface IChat {
    first_name: string,
    id: number,
    type: string,
    username?: string
}

interface IFrom {
    first_name?: string,
    last_name?: string,
    id: number,
    is_bot: boolean,
    is_premium: boolean,
    language_code?: string,
    username?: string
}

interface IEntity {
    length: number,
    offset: number,
    type: string
}

interface IMessage {
    message_id: number
    text: string
    date: number,
    entities: IEntity[],
    from: IFrom

}

interface ICallbackQuery {
    data: string
    from: IFrom
    id: string,
    message: IMessage
}

export interface ITelegramUpdate {
    message?: IMessage
    update_id: number
    callback_query?: ICallbackQuery
}