import React from 'react'
import {NavLink} from "react-router-dom";
import {PATH} from "./Pages";
import s from './Header.module.scss'

export const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.links}>
                <div className={s.link}>
                    <NavLink className={({isActive}) => isActive ? s.active : ''}
                             to={PATH.PROFILE}>
                        Profile
                    </NavLink></div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.LOGIN}>
                    Login
                </NavLink></div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.REGISTRATION}>
                    Registration
                </NavLink></div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.PASSWORD_RECOVERY}>
                    Password recovery+
                </NavLink></div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.ENTERING_A_NEW_PASSWORD}>
                    Entering a new password
                </NavLink></div>
                <div className={s.link}>Hover me!</div>
            </div>
        </div>
    )
}