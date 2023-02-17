import React from 'react';
import style from './Login.module.scss'
import {Chip, Paper} from "@mui/material";
import {InputLoginData} from "../../components/InputLoginData/InputLoginData";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/redax/store";
import {Navigate} from "react-router-dom";




export const Login = () => {

    const isLogin = useSelector<AppRootStateType,boolean>(state=>state.auth.isLogin)
    if(isLogin){
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={style.registrationBlock}>
            <Paper elevation={3}>
                <div className={style.form}>
                    <h1 className={style.title}>Sing In</h1>
                    <InputLoginData/>
                    {/*<Chip label="Sing Up" color="primary" style={{width: '73%', marginTop: '10px'}}/>*/}
                </div>
            </Paper>
        </div>
    )
}