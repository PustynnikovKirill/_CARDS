import React from 'react';
import style from './PasswordRecovery.module.scss'
import {Paper} from "@mui/material";
import {ForgotPasswordInput} from "../../components/ForgotPassword/ForgotPasswordInput/ForgotPasswordInput";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/redax/store";
import {Navigate} from "react-router-dom";




export const PasswordRecovery = () => {
    const passwordRecovery = useSelector<AppRootStateType,boolean>(state=>state.app.passwordRecovery)
    if (passwordRecovery){
        return <Navigate to={'/checkEmail'}/>
    }
    return (
        <div className={style.registrationBlock}>
            <Paper elevation={3}>
                <div className={style.form}>
                    <h1 className={style.title}>Forgot your password?</h1>
                    <ForgotPasswordInput/>
                    {/*<Chip label="Sing Up" color="primary" style={{width: '73%', marginTop: '10px'}}/>*/}

                </div>
            </Paper>
        </div>
    )
}