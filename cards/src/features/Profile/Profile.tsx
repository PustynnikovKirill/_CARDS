import React, {useCallback, useState} from 'react';
import s from './Profile.module.scss';
import {useSelector} from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import {Chip, CircularProgress, Paper} from "@mui/material";
import {changeTitleTC} from "../../app/redax/profile-reducer";
import {AppRootStateType, useAppDispatch} from "../../app/redax/store";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import { Navigate } from 'react-router-dom';
import {PATH} from "../Header/Pages";
import {logoutTC} from "../../app/redax/auth-reducer";
import {RequestStatusType} from "../../app/redax/app-reducer";
import {Error} from "../../components/Error/Error";



export const Profile = () => {

    const dispatch = useAppDispatch()

    // const {_id, name,email, avatar} = useSelector(state => state.auth)

    const nickName = useSelector<AppRootStateType,string>(state=>state.auth.data.name)
    const email = useSelector<AppRootStateType,string>(state=>state.auth.data.email)
    const isLogin = useSelector<AppRootStateType,boolean>(state=>state.auth.isLogin)
    const status = useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)

    const avatar = useSelector<AppRootStateType,string>(state => state.profile.avatar)

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const onTitleChangeHandler = useCallback((name: string) => {
        dispatch(changeTitleTC(name,avatar))
    },[]);

    const onClickBackHandler = () => {
        return <Navigate to={PATH.WELCOME}/>
    }
    if(!isLogin){
        return <Navigate to={'/login'}/>
    }
    return (

        <div className={s.profile}>
            <div className={s.commonTypes}>
                <div className={s.back}><Chip icon={<ArrowBackIcon style={{fontSize:'medium'}}/>} label="Back to packs list" component="a" href="#basic-chip" clickable onClick={onClickBackHandler}/></div>
                <div className={s.common}>
                    <Paper elevation={3}>
                        <div className={s.personalInform}>
                            <h1 className={s.title}> Personal information</h1>
                            <div>
                                <img className={s.photo}
                                     src={'https://n1s1.hsmedia.ru/ea/89/46/ea8946a843950473910d0e34ce918e0e/722x722_0xac120002_20273780001540484397.jpg'}/>
                            </div>
                            <div className={s.name}><EditableSpan value={nickName} onChange={onTitleChangeHandler}/></div>
                            <div className={s.email}>{email}</div>
                            <div className={s.logout}>
                                <Chip icon={<LogoutIcon style={{fontSize:'medium'}}/>} label="Log out" component="a" href="#basic-chip" clickable onClick={logoutHandler}/>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
};
