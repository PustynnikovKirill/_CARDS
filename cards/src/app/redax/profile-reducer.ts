import { Dispatch } from "redux"
import {AuthApi} from "../../api/auth-api";

type InitialStateType = typeof initialState


const initialState = {
    avatar: '',
    created:'',
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    token:'',
    tokenDeathTime: 0,
    updated: '',
    verified: false,
    __v: 0,
    _id: '',
}
export type ProfileActionsType = ActionsType

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE':{
            return {...state, name: action.data.name}
        }
        default:
            return state;
    }
}

type ActionsType = ReturnType<typeof setProfileAC>
export const setProfileAC = (data:UpdateType) => ({type:'PROFILE',data} as const)

export const changeTitleTC = (name: string, avatar: string) => (dispatch:Dispatch<ActionsType>)=>{
    AuthApi.updateUserInfo({name, avatar: ''})
        .then((res)=>{
            dispatch(setProfileAC(res.data.updatedUser))
        })
}
export type UpdateType = {
    avatar: string,
    created:string,
    email: string,
    isAdmin: boolean,
    name: string
    publicCardPacksCount: number,
    rememberMe: boolean,
    token:string,
    tokenDeathTime: number,
    updated: string,
    verified: boolean,
    __v: number,
    _id: string,
}