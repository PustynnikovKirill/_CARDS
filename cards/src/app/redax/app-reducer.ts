export type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}
export const initialState:InitialStateType = {
    error: null,
    status: 'idle',
    isInitialized: false
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType = setAppErrorACType | setAppStatusACType | setAppInitializedACType

export const appReducer = (state= initialState,action:AppActionsType) => {
    switch (action.type) {
        case 'SET_APP_ERROR':{
            return {...state, error: action.error}
        }
        case 'SET_APP_STATUS':{
            return {...state, status: action.status}
        }
        case 'SET_APP_INITIALIZED':{
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}

type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error:string | null) => {
    return {
        type:'SET_APP_ERROR',
        error
    }as const
}
type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status:RequestStatusType) => {
    return {
        type:'SET_APP_STATUS',
        status
    }as const
}
type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export const setAppInitializedAC = (isInitialized:boolean) => {
    return {
        type:'SET_APP_INITIALIZED',
        isInitialized
    }as const
}