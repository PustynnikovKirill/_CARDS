import {AppDispatch} from "./store";
import {CardsApi, CreateCardsType, getCardsParamsType, ResponseSetNewCards} from "../../api/cards-api";


type InitialStateType = typeof initialState

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
    page: 0,
    pageCount: 4,
    packUserId: '',
}


export type CardsActionsType = setCardsACType | pageCardsACType | pageCountChangeACType

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS': {
            return {...state, ...action.data}
        }
        case 'CARDS/PAGE-CARDS': {
            return {...state, page:action.page }
        }
        case 'CARDS/PAGE_COUNT_CHANGE-CARDS': {
            return {...state, pageCount:action.pageCount }
        }
        default:
            return state;
    }
}

type setCardsACType = ReturnType<typeof setCardsAC>
export const setCardsAC = (data:ResponseSetNewCards) => ({type: 'CARDS/SET-CARDS',data} as const)

type pageCardsACType = ReturnType<typeof pageCardsAC>
export const pageCardsAC = (page:number) => ({type: 'CARDS/PAGE-CARDS',page} as const)

type pageCountChangeACType = ReturnType<typeof pageCountChangeAC>
export const pageCountChangeAC = (pageCount:number) => ({type: 'CARDS/PAGE_COUNT_CHANGE-CARDS',pageCount} as const)




export const getCardsTC = (data:getCardsParamsType) => (dispatch:AppDispatch) => {
    CardsApi.getCards(data)
        .then((res) => {
            dispatch(setCardsAC(res.data))
        })
        .catch(() => {

        })
}

export const createCardsTC = (card:CreateCardsType) => (dispatch:AppDispatch) => {
    CardsApi.newCard(card)
        .then((res) => {
            dispatch(getCardsTC(card))

        })
        .catch(() => {

        })

}
