import {AuthApi, LoginResponseType, LogoutType} from "../../api/auth-api";
import {AppDispatch} from "./store";
import {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

type InitialStateType = {
    isLogin: boolean,
    data:LoginResponseType,
    isAuthRegister:boolean,
    isInitialized:boolean

}


const initialState:InitialStateType = {
    isLogin: false,
    data: {
        _id: '',
        email: '',
        name: 'name',
        avatar: '',
        publicCardPacksCount: 0, // количество колод
        created:new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
        error: ''
    },
    isAuthRegister: false,
    isInitialized:false
}

export type AuthActionsType = setLoginType|RegistrationType|LoginType|setIsInitializedType

export const authReducer = (state= initialState,action:AuthActionsType):InitialStateType => {
    switch (action.type) {
        case 'SET_LOGIN':{
            return {...state, isLogin:action.isLogin}
        }
        case 'REGISTRATION': {
            return {...state, isAuthRegister:action.isAuthRegister}
        }
        case 'LOGIN': {
            return {...state, data:action.data}
        }
        case 'INITIALIZED': {
            return {...state, isInitialized:action.isInitialized}
        }
        default:
            return state
    }
}

type setLoginType = ReturnType<typeof setLoginAC>
export const setLoginAC = (isLogin:boolean) => {
    return {
        type:'SET_LOGIN',
        isLogin
    }as const
}

type RegistrationType = ReturnType<typeof RegistrationAC>
export const RegistrationAC = (isAuthRegister:boolean) => {
    return {
        type:'REGISTRATION',
        isAuthRegister
     } as const
}
type LoginType = ReturnType<typeof LoginAC>
export const LoginAC = (data:LoginResponseType) => {
    return {
        type:'LOGIN',
        data
    } as const
}

type setIsInitializedType = ReturnType<typeof setisInitializedAC>
export const setisInitializedAC = (isInitialized:boolean) => {
    return {
        type:'INITIALIZED',
        isInitialized
    } as const
}


export const RegistrationTC = (email:string, password:string) =>(dispatch:AppDispatch)=>{
    return AuthApi.registration(email,password)
        .then(res=>{
           dispatch(RegistrationAC(true))
        })
        .catch((err:AxiosError)=>{

        })
}

export const LoginTC = (email: string,password:string,rememberMe:boolean) =>(dispatch:AppDispatch)=>{
    dispatch(setAppStatusAC('loading'))
     AuthApi.login(email,password,rememberMe)
        .then(res=>{
            dispatch(LoginAC(res.data))
            dispatch(setLoginAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err:AxiosError)=>{

        })
        .finally(()=>{
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const isLoginTC = () =>(dispatch:AppDispatch)=>{
    dispatch(setAppStatusAC('loading'))
    AuthApi.authMe()
        .then(res=>{
            dispatch(setLoginAC(true))
            dispatch(setisInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err:AxiosError)=>{
            dispatch(setAppErrorAC('error'))
        })
        .finally(()=>{
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const logoutTC = () =>(dispatch:AppDispatch)=>{
    dispatch(setAppStatusAC('loading'))
    AuthApi.logout()
        .then(res=>{
            dispatch(setLoginAC(false))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err:AxiosError)=>{
            dispatch(setAppStatusAC('succeeded'))
        })
}