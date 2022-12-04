import React from 'react';
import {
    Button,
} from "@mui/material";
import style from './BackToLogin.module.scss'
import {useNavigate} from "react-router-dom";


export const BackToLogin = () => {
    const navigate = useNavigate();
    const backToLoginHandler = () => {
        return navigate('/login')
    }
    return (
        <div className={style.inputs}>
            <h5 className={style.already}> We've sent an Email with instructions to example@mail.com</h5>

            <Button onClick={backToLoginHandler} style={{
                borderRadius: '18px',
                marginTop: "10px",
                marginBottom: "20px",
                width: "255px",
                height: "36px",
                textTransform: "none",
                background: "#366EFF",
                fontSize: "16px",
                fontWeight: "500",
                color: "#fff"
            }}
            >
                Back to Login
            </Button>

        </div>
    );
}