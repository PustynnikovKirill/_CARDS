import React from 'react';
import style from './Registration.module.scss'
import {Chip, Paper} from "@mui/material";
import {InputAdornments} from "../../components/InputAdornments/InputAdornments";


export const Registration = () => {
    return (
        <div className={style.registrationBlock}>
            <Paper elevation={3}>
                <div className={style.form}>
                    <h1 className={style.title}>Sing Up</h1>
                    <InputAdornments/>
                    <Chip label="Sing Up" color="primary" style={{width:'73%', marginTop:'10px'}}/>
                    <h5 className={style.already}>Already have an account?</h5>
                    <a className={style.sing}>Sing in</a>
                </div>
            </Paper>
        </div>
    )
}