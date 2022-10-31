import React from 'react';
import {CircularProgress} from "@mui/material";
import s from './Error.module.scss'

export const Error = () => {


    return (
        <div className={s.preloader}>
            <div>
                <CircularProgress/>
            </div>
        </div>
    );
};
