import {Routes, Route, Navigate} from "react-router-dom";
import {Login} from "../Login/Login";
import {Registration} from "../Registration/Registration";
import {Profile} from "../Profile/Profile";
import {PasswordRecovery} from "../PasswordRecovery/PasswordRecovery";
import {Error} from "../Error/Error";
import {Welcome} from "../Welcome/Welcome";
import React from "react";
import {CheckEmail} from "../PasswordRecovery/CheckEmail/CheckiEmail";
import {EnteringNewPassword} from "../EnteringNewPassword/EnteringNewPassword";
import {PacksList} from "../table/PacksList/PacksLists";
import {FriendPacksTable} from "../table/friendPack/friendPacksTable";
import {MyPacks} from "../table/Pack/MyPack";



export const PATH = {
    WELCOME:'/welcome',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE:'/profile',
    ERROR:'/error',
    ANY:'*',
    PASSWORD_RECOVERY: '/passwordRecovery',
    ENTERING_A_NEW_PASSWORD: '/set-new-password/:token',
    CARDS: '/_CARDS',
    CHECK_EMAIL:'/checkEmail',
    PACKS_LISTS:'/packsLists',
    MY_PACK_TABLE:'/myPackTable',
    FRIEND_PACK_TABLE:'/friendPackTable'
}

export const Pages=()=> {

    return (
        <div>
            {/*Routes выбирает первый подходящий роут*/}
            <Routes>
                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу PRE_JUNIOR*/}
                <Route path={'/'} element={<Login/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.CARDS} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element = {<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route path={PATH.ERROR} element={<Error/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.ANY} element={<Error/>}/>
                <Route path={PATH.WELCOME} element={<Welcome/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={PATH.ENTERING_A_NEW_PASSWORD} element={<EnteringNewPassword/>}/>
                <Route path={PATH.PACKS_LISTS} element={<PacksList/>}/>
                <Route path={PATH.MY_PACK_TABLE} element={<MyPacks/>}/>
                <Route path={PATH.FRIEND_PACK_TABLE} element={<FriendPacksTable/>}/>
            </Routes>
        </div>
    )
}

