import {CardsPackType, PacksApi, ResponseSetNewPacks} from "../../api/packs-api";
import { AppRootStateType, AppThunk} from "./store";
import {PackType} from "../../features/table/PacksList/StickyHeadTable/PackTable";


type CardPacksType = {
    _id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string,
}

type InitialStateType = {
    cardPacks: CardPacksType[],
    cardPacksTotalCount: number, // количество колод
    maxCardsCount: number,
    minCardsCount: number,
    page: number, // выбранная страница
    pageCount: number, //количество элементов на странице
    setSearch:string
}

const initialState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            name: '',
            cardsCount: 0,
            created: '',
            updated: '',
        },
    ],
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 4, //количество элементов на странице
    setSearch:''
}

export type PacksActionsType = setPacksACType
    | createPacksACType
    | createCurrentPageACType
    | RowsPageACType
    | setSearchInputACType

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACK/SET-PACK': {
            return {...state, ...action.data}
        }
        case 'PACK/CREATE-PACK': {
            return {...state, cardPacks: [...state.cardPacks]}
        }
        case 'PACK/SET_CURRENT_PAGE': {
            return {...state, page: action.currentPage}
        }
        case 'PACK/ROWS_PAGE': {
            return {...state, pageCount: action.rowsPage}
        }
        case 'PACK/SET_SEARCH_INPUT': {
            return {...state, setSearch: action.value}
        }
        default:
            return state;
    }
}


type setPacksACType = ReturnType<typeof setPacksAC>
export const setPacksAC = (data: ResponseSetNewPacks) => ({type: 'PACK/SET-PACK', data} as const)

type createPacksACType = ReturnType<typeof createPackAC>
export const createPackAC = () => ({type: 'PACK/CREATE-PACK'} as const)

type createCurrentPageACType = ReturnType<typeof createCurrentPageAC>
export const createCurrentPageAC = (currentPage:number) => ({type:'PACK/SET_CURRENT_PAGE',currentPage} as const)

type RowsPageACType = ReturnType<typeof rowsPageAC>
export const rowsPageAC = (rowsPage:number) => ({type:'PACK/ROWS_PAGE',rowsPage} as const)

type setSearchInputACType = ReturnType<typeof setSearchInputAC>
export const setSearchInputAC = (value:string) => ({type:'PACK/SET_SEARCH_INPUT',value} as const)



export const getPacksTC = (currentPage?:number|undefined, pageCount?:number|undefined):AppThunk =>
    (dispatch, getState:()=>AppRootStateType) => {
    const {setSearch} = getState().packs
    PacksApi.getPacks(currentPage,pageCount,setSearch)
        .then((res) => {
            dispatch(setPacksAC(res.data))
        })
        .catch(() => {

        })
}

export const createPackTC = (cardsPack:CardsPackType,currentPage?:number|undefined,pageSize?:number|undefined):AppThunk =>
    (dispatch) => {
    PacksApi.newCardsPack(cardsPack)
        .then((res) => {
            dispatch(getPacksTC(currentPage,pageSize))
        })
        .catch(() => {

        })
}

export const updatePackTC = (card: PackType,currentPage?:number|undefined,pageSize?:number|undefined):AppThunk => (dispatch) => {
    PacksApi.updatedCardsPack(card)
        .then((res) => {
            dispatch(getPacksTC(currentPage,pageSize))
        })
        .catch(() => {

        })
}

export const deletePackTC = (_id: string,currentPage?:number|undefined,pageSize?:number|undefined):AppThunk => (dispatch) => {
    PacksApi.deletedCardsPack(_id)
        .then((res) => {
            dispatch(getPacksTC(currentPage,pageSize))
        })
        .catch(() => {

        })
}