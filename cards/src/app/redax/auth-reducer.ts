import {AuthApi, LoginResponseType, LogoutType, ResponseErrorType} from "../../api/auth-api";
import {AxiosError} from "axios";
import {setAppErrorTC, setAppInitializedTC, setAppStatusAC, setPasswordRecoveryAC} from "./app-reducer";
import {setProfileAC} from "./profile-reducer";
import {AppThunk} from "./store";

type InitialStateType = {
    isLogin: boolean,
    data: LoginResponseType,
    isAuthRegister: boolean,
    isInitialized: boolean
}

const initialState: InitialStateType = {
    isLogin: false,
    data: {
        _id: '',
        email: '',
        name: 'name',
        avatar: '',
        publicCardPacksCount: 0, // количество колод
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
        error: ''
    },
    isAuthRegister: false,
    isInitialized: false
}


export type AuthActionsType = setLoginType | RegistrationType | LoginType | setIsInitializedType

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET_LOGIN': {
            return {...state, isLogin: action.isLogin}
        }
        case 'REGISTRATION/REGISTRATION': {
            return {...state, isAuthRegister: action.isAuthRegister}
        }
        case 'LOGIN/LOGIN': {
            return {...state, data: action.data}
        }
        case 'INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}

type setLoginType = ReturnType<typeof setLoginAC>
export const setLoginAC = (isLogin: boolean) => {
    return {
        type: 'LOGIN/SET_LOGIN',
        isLogin
    } as const
}

type RegistrationType = ReturnType<typeof RegistrationAC>
export const RegistrationAC = (isAuthRegister: boolean) => {
    return {
        type: 'REGISTRATION/REGISTRATION',
        isAuthRegister
    } as const
}
export type LoginType = ReturnType<typeof LoginAC>
export const LoginAC = (data: LoginResponseType) => {
    return {
        type: 'LOGIN/LOGIN',
        data
    } as const
}

type setIsInitializedType = ReturnType<typeof setisInitializedAC>
export const setisInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'INITIALIZED',
        isInitialized
    } as const
}


export const RegistrationTC = (email: string, password: string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return AuthApi.registration(email, password)
        .then(res => {
            dispatch(RegistrationAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError) => {
            const error = e.response
                ? (e.response.data as (ResponseErrorType)).error
                : e.message
            dispatch(setAppErrorTC(error))
            dispatch(setAppInitializedTC(true))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const LoginTC = (email: string, password: string, rememberMe: boolean):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthApi.login(email, password, rememberMe)
        .then(res => {
            dispatch(LoginAC(res.data))
            dispatch(setLoginAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            const error = err.response
                ? (err.response.data as (ResponseErrorType)).error
                : err.message
                dispatch(setAppErrorTC(error))
            dispatch(setAppInitializedTC(true))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const isLoginTC = ():AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthApi.authMe()
        .then(res => {
            dispatch(LoginAC(res.data))
            dispatch(setProfileAC(res.data))
            dispatch(setLoginAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            const error = err.response
                ? (err.response.data as (ResponseErrorType)).error
                : err.message
            dispatch(setAppErrorTC(error))
        })
        .finally(() => {
            dispatch(setisInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const logoutTC = ():AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthApi.logout()
        .then(res => {
            dispatch(setLoginAC(false))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorTC('failed to logout'))
            dispatch(setAppInitializedTC(true))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const recoveryPasswordTC = (email:string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthApi.recoveryPassword(email)
        .then(res => {
            dispatch(setPasswordRecoveryAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            const error = err.response
                ? (err.response.data as (ResponseErrorType)).error
                : err.message
            dispatch(setAppErrorTC(error))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppInitializedTC(true))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}