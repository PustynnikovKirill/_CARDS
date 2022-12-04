import React from 'react';
import style from './CheckEmail.module.scss'
import {Paper} from "@mui/material";
import {BackToLogin} from "./BackToLogin/BackToLogin";





export const CheckEmail = () => {

    return (
        <div className={style.registrationBlock}>
            <Paper elevation={3}>
                <div className={style.form}>
                    <h1 className={style.title}>Check Email</h1>
                    <BackToLogin/>
                    {/*<Chip label="Sing Up" color="primary" style={{width: '73%', marginTop: '10px'}}/>*/}

                </div>
            </Paper>
        </div>
    )
}