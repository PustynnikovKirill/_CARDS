import {CardsPackType, PacksApi, ResponseSetNewPacks} from "../../api/packs-api";
import {AppRootStateType, AppThunk} from "./store";
import {PackType} from "../../features/table/PacksList/StickyHeadTable/PackTable";


type CardPacksType = {
    _id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string,
    user_name: string
}

type InitialStateType = {
    cardPacks: CardPacksType[],
    cardPacksTotalCount: number, // количество колод
    maxCardsCount: number,
    minCardsCount: number,
    page: number, // выбранная страница
    pageCount: number, //количество элементов на странице
    valueSearch?: string,
    myPacksId?: string,
    rangeSlider?: number[]
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
            user_name: ''
        },
    ],
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 4, //количество элементов на странице
    valueSearch: '',
    myPacksId: '',
    rangeSlider: [0, 100]
}

export type PacksActionsType = setPacksACType
    | createPacksACType
    | createCurrentPageACType
    | RowsPageACType
    | setSearchInputACType
    | setMyCardsACType
    | packRangeACType
    | resetFiltersACType

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
            return {...state, valueSearch: action.value}
        }
        case 'PACK/SET_MY_PACK': {
            return {...state, myPacksId: action.myPacksId}
        }
        case 'PACK/RANGE_SLIDER': {
            return {...state, rangeSlider: [...action.rangeSliderValue]}
        }
        case 'PACK/RESET_FILTERS': {
            return {...state, valueSearch: '', myPacksId: '', rangeSlider: []}
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
export const createCurrentPageAC = (currentPage: number) => ({type: 'PACK/SET_CURRENT_PAGE', currentPage} as const)

type RowsPageACType = ReturnType<typeof rowsPageAC>
export const rowsPageAC = (rowsPage: number) => ({type: 'PACK/ROWS_PAGE', rowsPage} as const)

type setSearchInputACType = ReturnType<typeof setSearchInputAC>
export const setSearchInputAC = (value: string) => ({type: 'PACK/SET_SEARCH_INPUT', value} as const)

type setMyCardsACType = ReturnType<typeof setMyCardsAC>
export const setMyCardsAC = (myPacksId: string | undefined) => {
    return {type: 'PACK/SET_MY_PACK', myPacksId} as const
}

type packRangeACType = ReturnType<typeof packRangeAC>
export const packRangeAC = (rangeSliderValue: number[]) => {
    return {type: 'PACK/RANGE_SLIDER', rangeSliderValue} as const
}

type resetFiltersACType = ReturnType<typeof resetFiltersAC>
export const resetFiltersAC = () => {
    return {type: 'PACK/RESET_FILTERS'} as const
}


export const getPacksTC = (currentPage?: number | undefined, pageCount?: number | undefined): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const {valueSearch, myPacksId, page, pageCount, rangeSlider} = getState().packs
        const min = rangeSlider && rangeSlider[0]
        const max = rangeSlider && rangeSlider[1]
        PacksApi.getPacks(page, pageCount, valueSearch, myPacksId, min, max)
            .then((res) => {
                dispatch(setPacksAC(res.data))
            })
            .catch(() => {

            })
    }

export const createPackTC = (cardsPack: CardsPackType, currentPage?: number | undefined, pageSize?: number | undefined): AppThunk =>
    (dispatch) => {
        PacksApi.newCardsPack(cardsPack)
            .then((res) => {
                dispatch(getPacksTC(currentPage, pageSize))
            })
            .catch(() => {

            })
    }

export const updatePackTC = (card: PackType, currentPage?: number | undefined, pageSize?: number | undefined): AppThunk => (dispatch) => {
    PacksApi.updatedCardsPack(card)
        .then((res) => {
            dispatch(getPacksTC(currentPage, pageSize))
        })
        .catch(() => {

        })
}

export const deletePackTC = (_id: string, currentPage?: number | undefined, pageSize?: number | undefined): AppThunk => (dispatch) => {
    PacksApi.deletedCardsPack(_id)
        .then((res) => {
            dispatch(getPacksTC(currentPage, pageSize))
        })
        .catch(() => {

        })
}