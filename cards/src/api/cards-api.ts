import {instance} from "./auth-api";
import {AxiosResponse} from "axios";


export const CardsApi = {
    getCards(data: getCardsParamsType) {
        return instance.get<getCardsParamsType, AxiosResponse<ResponseSetNewCards>>(`/cards/card`, {
            params: data
        })
    },
    newCard(card: CreateCardsType) {
        return instance.post('/cards/card', {card})
    },
    deleteCard(_id: string,cardsPack_id:string) {
        return instance.delete(`cards/card?id=${_id}&cardsPack_id=${cardsPack_id}`)
    },
    updatedCard(card: ChangeCardsType) {
        return instance.put('/cards/card', {card})
    }
}

export type ResponseSetNewCards = {
    cards: [
        {
            answer: string,
            question: string,
            cardsPack_id: string,
            grade: number,
            shots: number,
            user_id: string,
            created: string,
            updated: string,
            _id: string,
        },
    ]
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string,
}

export type getCardsParamsType = {
    cardAnswer?: string, // не обязательно
    cardQuestion?: string, // не обязательно
    cardsPack_id: string,
    min?: number, // не обязательно
    max?: number, // не обязательно
    sortCards?: number, // не обязательно
    page?: number | undefined, // не обязательно
    pageCount?: number | undefined, // не обязател
}

export type CreateCardsType = {
    cardsPack_id: string,
    question?: string, // если не отправить будет таким
    answer?: string, // если не отправить будет таким
    grade?: number, // 0..5, не обязателен
    shots?: number, // не обязателен
    answerImg?: string, // не обязателен
    questionImg?: string,// не обязателен
    questionVideo?: string, // не обязателен
    answerVideo?: string, // не обязателен
}

export type ChangeCardsType = {
    _id: string,
    question?: string, // не обязательно
    cardsPack_id: string
}