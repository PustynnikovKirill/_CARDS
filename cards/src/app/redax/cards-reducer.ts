import {AppDispatch} from "./store";
import {CardsApi, CreateCardsType, getCardsParamsType, ResponseSetNewCards} from "../../api/cards-api";


const initialState = {
    cards: [
        {
            answer: '',
            question: '',
            cardsPack_id: '',
            grade: 0,
            shots: 0,
            user_id: '',
            created: '',
            updated: '',
            _id: '',
        },
    ],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
    currentCardsPack_id: ''
}

export type CardsActionsType = setCardsACType | pageCardsACType | pageCountChangeACType | currentCardsPackACTypeType

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS': {
            return {...state, ...action.data}
        }
        case 'CARDS/PAGE-CARDS': {
            return {...state, page: action.page}
        }
        case 'CARDS/PAGE_COUNT_CHANGE-CARDS': {
            return {...state, pageCount: action.pageCount}
        }
        case 'CARDS/CURRENT_CARDS_PACK_ID': {
            return {...state, currentCardsPack_id: action.currentCardsPack_id}
        }
        default:
            return state;
    }
}

type setCardsACType = ReturnType<typeof setCardsAC>
export const setCardsAC = (data: ResponseSetNewCards) => ({type: 'CARDS/SET-CARDS', data} as const)

type pageCardsACType = ReturnType<typeof pageCardsAC>
export const pageCardsAC = (page: number | undefined) => ({type: 'CARDS/PAGE-CARDS', page} as const)

type pageCountChangeACType = ReturnType<typeof pageCountChangeAC>
export const pageCountChangeAC = (pageCount: number | undefined) => ({
    type: 'CARDS/PAGE_COUNT_CHANGE-CARDS',
    pageCount
} as const)

type currentCardsPackACTypeType = ReturnType<typeof currentCardsPackACType>
export const currentCardsPackACType = (currentCardsPack_id: string) => ({
    type: 'CARDS/CURRENT_CARDS_PACK_ID',
    currentCardsPack_id
} as const)


export const getCardsTC = (data: getCardsParamsType) => (dispatch: AppDispatch) => {
    CardsApi.getCards(data)
        .then((res) => {
            dispatch(setCardsAC(res.data))
            dispatch(currentCardsPackACType(data.cardsPack_id))
        })
        .catch(() => {

        })
}

export const createCardsTC = (card: CreateCardsType) => (dispatch: AppDispatch) => {
    CardsApi.newCard(card)
        .then((res) => {
            dispatch(getCardsTC(card))

        })
        .catch(() => {

        })
}

type CardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    shots: number,
    user_id: string,
    created: string,
    updated: string,
    _id: string,

}

type InitialStateType = {
    cards: CardType[],
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number | undefined,
    pageCount: number | undefined,
    packUserId: string,
    currentCardsPack_id: string
}