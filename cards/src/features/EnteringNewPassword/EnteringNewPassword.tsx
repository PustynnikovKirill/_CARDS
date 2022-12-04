import React from 'react';
import style from './EnteringNewPassword.module.scss'
import {Paper} from "@mui/material";
import {Navigate, useParams} from 'react-router-dom';
import {InputNewPassword} from "./newPassword/InputNewPassword";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/redax/store";




export const EnteringNewPassword = () => {
    const isAuthRegister = useSelector<AppRootStateType,boolean>((state)=>state.auth.isAuthRegister)
    const isNewPassword = useSelector<AppRootStateType,boolean>((state)=>state.app.isNewPassword)

    const {token} = useParams()

    if (isAuthRegister) {
        return <Navigate to = {'/login'}/>
    }
    if (isNewPassword) {
        return <Navigate to = {'/login'}/>
    }
    return (
        <div className={style.registrationBlock}>
            <Paper elevation={3}>
                <div className={style.form}>
                    <h1 className={style.title}>Create new password</h1>
                    <InputNewPassword token={token}/>
                </div>
            </Paper>
        </div>
    )
}