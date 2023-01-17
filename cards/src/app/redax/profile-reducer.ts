import { Dispatch } from "redux"
import {AuthApi} from "../../api/auth-api";
import {setAppErrorAC, setAppInitializedAC} from "./app-reducer";
import {AppThunk} from "./store";

type InitialStateType = typeof initialState


const initialState = {
    avatar: '',
    created:'',
    email: '',
    isAdmin: false,
    name: 'name',
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
        case 'PROFILE/PROFILE':{
            return {...state, ...action.data}
        }
        default:
            return state;
    }
}

type ActionsType = ReturnType<typeof setProfileAC>
export const setProfileAC = (data:UpdateType) => ({type:'PROFILE/PROFILE',data} as const)


export const changeTitleTC = (name: string, avatar: string):AppThunk => (dispatch)=>{
    AuthApi.updateUserInfo({name, avatar: ''})
        .then((res)=>{
            if (res.data.updatedUser.name.length > 0) {
                dispatch(setProfileAC(res.data.updatedUser))
            }
        })
        .catch(()=>{
            dispatch(setAppErrorAC('invalid name'))
            dispatch(setAppInitializedAC(true))
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