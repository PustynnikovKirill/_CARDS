import React from 'react';
import style from './Registration.module.scss'
import {Chip, Paper} from "@mui/material";
import {InputRegistration} from "../../components/InputRegistration/InputRegistration";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/redax/store";
import { Navigate } from 'react-router-dom';




export const Registration = () => {
    const isAuthRegister = useSelector<AppRootStateType,boolean>((state)=>state.auth.isAuthRegister)

    if (isAuthRegister) {
        return <Navigate to = {'/login'}/>
    }
    return (
        <div className={style.registrationBlock}>
            <Paper elevation={3}>
                <div className={style.form}>
                    <h1 className={style.title}>Sing Up</h1>
                    <InputRegistration/>
                    {/*<Chip label="Sing Up" color="primary" style={{width: '73%', marginTop: '10px'}}/>*/}

                </div>
            </Paper>
        </div>
    )
}