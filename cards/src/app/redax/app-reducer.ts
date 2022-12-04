import {AppDispatch} from "./store";
import {AuthApi, ResponseErrorType} from "../../api/auth-api";
import {useNavigate} from "react-router-dom";


export type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitializedError: boolean
    passwordRecovery: boolean
    isNewPassword: boolean
}

export const initialState: InitialStateType = {
    error: null,
    status: 'idle',
    isInitializedError: false,
    passwordRecovery: false,
    isNewPassword: false

}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType = setAppErrorACType
    | setAppStatusACType
    | setAppInitializedACType
    | setPasswordRecoveryACType
    | isNewPasswordACType

export const appReducer = (state = initialState, action: AppActionsType) => {

    switch (action.type) {
        case 'APP/SET_APP_ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET_APP_STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET_APP_INITIALIZED': {
            return {...state, isInitializedError: action.isInitializedError}
        }
        case 'APP/PASSWORD_RECOVERY': {
            return {...state, passwordRecovery: action.passwordRecovery}
        }
        case 'APP/IS_NEW_PASSWORD': {
            return {...state, isNewPassword: action.isNewPassword}
        }
        default:
            return state
    }
}

export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET_APP_ERROR',
        error
    } as const
}
type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET_APP_STATUS',
        status
    } as const
}

type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export const setAppInitializedAC = (isInitializedError: boolean) => {
    return {
        type: 'APP/SET_APP_INITIALIZED',
        isInitializedError
    } as const
}
type setPasswordRecoveryACType = ReturnType<typeof setPasswordRecoveryAC>
export const setPasswordRecoveryAC = (passwordRecovery: boolean) => {
    return {
        type: 'APP/PASSWORD_RECOVERY',
        passwordRecovery
    } as const
}
type isNewPasswordACType = ReturnType<typeof isNewPasswordAC>
export const isNewPasswordAC = (isNewPassword: boolean) => {
    return {
        type: 'APP/IS_NEW_PASSWORD',
        isNewPassword
    } as const
}


export const setAppErrorTC = (error: string) => (dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error))
}

export const setAppInitializedTC = (isInitializedError: boolean) => (dispatch: AppDispatch) => {
    dispatch(setAppInitializedAC(isInitializedError))
}

export const setNewPasswordTC = (password: string, token: string | undefined) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthApi.setNewPass(password, token)
        .then((res) => {
            dispatch(isNewPasswordAC(true))
        })
        .catch((err) => {
            const error = err.response
                ? (err.response.data as (ResponseErrorType)).error
                : err.message
            dispatch(setAppErrorTC(error))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}
