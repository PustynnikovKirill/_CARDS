type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}
const initialState:InitialStateType = {
    error: null,
    status: 'idle',
    isInitialized: false
}
type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsType = setAppErrorACType

export const appReducer = (state= initialState,action:AppActionsType) => {
    switch (action.type) {
        case 'SET_APP_ERROR':{
            return {...state, error: action.error}
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