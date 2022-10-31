import axios, {AxiosResponse} from "axios";


export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})


export const AuthApi = {
    setNewPass(password: string, token: string) {
        return instance.post("/auth/set-new-password", {password: password, resetPasswordToken: token})
    },
    registration(email: string, password: string) {
        return instance.post<RegistrationParamsType,AxiosResponse<RegistrationResponseType>>("/auth/register", {email,password})
    },
    recoveryPassword(email: string) {
        return instance.post(
            "/auth/forgot",
            {
                email, // кому восстанавливать пароль
                from: "test-front-admin <ai73a@yandex.by>",
                // можно указать разработчика фронта)
                message: `<div style="background-color: #f7f7f7; padding: 15px">
                    Follow 
                    <a href='http://localhost:3000/#/set-new-password/$token$'>
                    this link</a> to recover your password
                    </div>` // хтмп-письмо, вместо $token$ бэк вставит токен

            }
        )
    },

    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginType,AxiosResponse<LoginResponseType>>('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete<{ info: LogoutType }>('/auth/me', {})
    },
    authMe() {
        return instance.post('/auth/me', {})
    },
    updateUserInfo(data: UpdateUserInfo) {
        return instance.put<UpdateUserInfo,AxiosResponse<ResponseUpdateUserInfoType>>('/auth/me', data)
    }
}

type ResponseUpdateUserInfoType = {
    token: string,
    tokenDeathTime: number,
    updatedUser:{
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
}


export type RegistrationParamsType = {
    email: string,
    password: string
}
export type RegistrationResponseType = {
    addedUser: any,
    error?: string
}

export type UpdateUserInfo = {
    name: string
    avatar: string
}
export type LoginType = {
    email?: string,
    password?: string,
    rememberMe?: string
}
export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}

export type AddedUserType = {
    addedUser:{},
    error?: string
}
export type LogoutType = {
    info: string,
    error: string
}