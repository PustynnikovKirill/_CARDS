import {AxiosResponse} from "axios";
import {instance} from "./auth-api";
import {PackType} from "../features/table/PacksList/StickyHeadTable/PackTable";


export const PacksApi = {
    getPacks(currentPage:number|undefined,pageCount:number|undefined, valueSearch:string|undefined,myPacksId:string|undefined, min?:number,max?:number) {
        return instance.get<GetNewPacksType, AxiosResponse<ResponseSetNewPacks>>(`/cards/pack`, {
            params: {
                packName: valueSearch, // не обязательно
                min, // не обязательно
                max, // не обязательно
                // sortPacks: valueSearch, // не обязательно
                page: currentPage, // не обязательно
                pageCount, // не обязательно
                user_id:myPacksId,// чьи колоды не обязательно, или придут все
                // block: true // не обязательно
// если вас кто-то забанил. То с помощью
// данного параметра можно увидеть свои колоды
// и поправить их или удалить или обжаловать 🙃
            }
        })
    },
    newCardsPack(cardsPack: CardsPackType) {
        return instance.post<RecoveryPacksType>('/cards/pack',
            {
                cardsPack: cardsPack
            }
        )
    },
    deletedCardsPack(_id: string) {
        return instance.delete(`/cards/pack?id=${_id}`)
    },
    updatedCardsPack(cardsPack: PackType) {
        return instance.put<UpdatedCardsPackType>('/cards/pack', {
            cardsPack: cardsPack
        })
    },

}


export type GetNewPacksType = {
    packName?: string, // не обязательно
    min?: number, // не обязательно
    max?: number, // не обязательно
    sortPacks?: number, // не обязательно
    page?: number, // не обязательно
    pageCount?: number, // не обязательно
    userId?: number, // чьи колоды не обязательно, или придут все
    block?: boolean // не обязательно
// если вас кто то забанил. То с помощью
// данного параметра можно увидеть свои колоды
// и поправить их или удалить или обжаловать 🙃
}
export type ResponseSetNewPacks = {
    cardPacks: [
        {
            _id: string,
            user_id: string,
            name: string,
            cardsCount: number,
            created: string,
            updated: string,
            user_name:string
        },
    ]
    cardPacksTotalCount: number, // количество колод
    maxCardsCount: number,
    minCardsCount: number,
    page: number,// выбранная страница
    pageCount: number, // количество элементов на странице
}

type RecoveryPacksType = {
    name?: string,// если не отправить будет таким
    deckCover?: string, // не обязателен
    private?: false, // если не отправить будет такой
}

type UpdatedCardsPackType = {
    _id: string,
    name?: string,
}

export type CardsPackType = {
    name: string,
    deckCover?: string,
    private?: boolean,
}
