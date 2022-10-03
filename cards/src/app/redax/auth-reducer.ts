type InitialStateType = {
    isLogin: boolean

}
const initialState:InitialStateType = {
    isLogin: true
}

export type AuthActionsType = setLoginType

export const authReducer = (state= initialState,action:AuthActionsType) => {
    switch (action.type) {
        case 'SET_LOGIN':{
            return {...state, error: action.isLogin}
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
