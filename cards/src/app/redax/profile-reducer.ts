import { Dispatch } from "redux"
import {AuthApi, UpdateUserInfo} from "../../api/auth-api";





type InitialStateType = typeof initialState

const initialState = {
    name: 'name',
    avatar: ''
}
export type ProfileActionsType = ActionsType

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE':{
            return {...state,name: action.data.name}
        }
        default:
            return state;
    }
}

type ActionsType = ReturnType<typeof setProfileAC>
export const setProfileAC = (data:UpdateUserInfo) => ({type:'PROFILE',data} as const)


export const logoutTC = () => (dispatch:Dispatch<ActionsType>)=> {
    AuthApi.logout()
        .then((res)=>{
            //dispatch(setIsLoggedINAC(false))
        })
}

export const changeTitleTC = (name: string, avatar: string) => (dispatch:Dispatch<ActionsType>)=> {
    AuthApi.updateUserInfo({name, avatar: ''})
        .then((res)=>{
            dispatch(setProfileAC(res.data))
        })
}
