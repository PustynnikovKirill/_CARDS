import * as React from 'react';
import {Chip} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./MyPack.module.scss";
import {MyCardsTable} from "./MyPackTable/MyCardsTable";
import {SearchInputMyPack} from "./serchInputMyPack/searchInputMyPack";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../app/redax/store";
import {Navigate, useNavigate} from "react-router-dom";
import {createCardsTC, getCardsTC, setSearchCards} from "../../../app/redax/cards-reducer";
import {useEffect} from "react";


export const MyPacks = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLogin = useSelector<AppRootStateType>((state) => state.auth.isLogin)
    const cardsPack_id = useSelector<AppRootStateType, string>(state => state.cards.currentCardsPack_id)
    const flagCard = useSelector<AppRootStateType, boolean>(state => state.cards.flagCard)
    const searchValueCard = useAppSelector(state=>state.cards.searchValueCard)

    useEffect(() => {
        getCardsTC({cardsPack_id})
    }, [searchValueCard])

    const setValueHandler = (valueSearch:string)=>{
        dispatch(setSearchCards(valueSearch))
    }

    const addNewCardHandler = () => {
        dispatch(createCardsTC({cardsPack_id}))
    }
    const backToPacksListHandler = () => {
        navigate('/packsLists')
    }

    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <div className={style.table}>
                <div className={style.paper}>
                    <div className={style.buttonBack}><Chip icon={<ArrowBackIcon style={{fontSize: 'medium'}}/>}
                                                            label="Back to packs list" component="a" href="#basic-chip"
                                                            clickable onClick={backToPacksListHandler}/></div>

                    {flagCard
                        ? <div className={style.title}>
                            <h1 className={style.h1}>My Pack</h1><MoreVertIcon style={{marginBottom: '-12px'}}/>
                            <div className={style.button}><Chip style={{backgroundColor: '#1976d2', color: '#fff'}}
                                                                size={'medium'}
                                                                label="Add new card" component="a" href="#basic-chip"
                                                                clickable
                                                                onClick={addNewCardHandler}/>
                            </div>
                        </div>
                        : <div className={style.title}>
                            <h1 className={style.h1}>Friend's Pack</h1><MoreVertIcon style={{marginBottom: '-12px'}}/>
                            <div className={style.button}><Chip style={{backgroundColor: '#1976d2', color: '#fff'}}
                                                                size={'medium'} icon={<ArrowBackIcon
                                style={{fontSize: 'medium', color: '#fff'}}/>}
                                                                label="Learn to pack" component="a" href="#basic-chip"
                                                                clickable/>
                            </div>

                        </div>
                    }
                    <div className={style.params}>
                        <h5 className={style.search}>Search</h5>
                        <SearchInputMyPack setSearchValue={setValueHandler}/>
                    </div>
                    <div className={style.myPack}>
                        <MyCardsTable/>
                    </div>
                </div>
            </div>
        </div>
    );
}
