import React from 'react'
import {NavLink} from "react-router-dom";
import {PATH} from "./Pages";
import s from './Header.module.scss'
import {PacksList} from "../table/PacksList/PacksLists";

export const Header = () => {
    return (
        <div className={s.container}>
            <div className={s.links}>
                <div className={s.link}>
                    <NavLink className={({isActive}) => isActive ? s.active : ''}
                             to={PATH.PROFILE}>
                        Profile
                    </NavLink>
                </div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.LOGIN}>
                    Login
                </NavLink>
                </div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.REGISTRATION}>
                    Registration
                </NavLink></div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.PACKS_LISTS}>
                    PacksList
                </NavLink></div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.MY_PACK_TABLE}>
                    MyPackTable
                </NavLink></div>
                <div className={s.link}><NavLink className={({isActive}) => isActive ? s.active : ''}
                                                 to={PATH.FRIEND_PACK_TABLE}>
                    FriendPackTable
                </NavLink></div>
                <div className={s.link}>Hover me!</div>
            </div>
        </div>
    )
}