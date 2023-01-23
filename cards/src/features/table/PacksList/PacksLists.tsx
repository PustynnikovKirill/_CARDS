import * as React from 'react';
import style from './PacksLists.module.scss'
import {Button, ButtonGroup, Chip} from "@mui/material";
import {RangeSlider} from "./RangeSlider/RangeSlider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {SearchInput} from "./serchInput/searchInput";
import {useAppDispatch, useAppSelector} from "../../../app/redax/store";
import {createPackTC, getPacksTC, setMyCardsAC, setSearchInputAC} from "../../../app/redax/packs-reducer";
import {PackTable} from "./StickyHeadTable/PackTable";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export const PacksList = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useAppDispatch()
    const valueSearch = useAppSelector(state => state.packs.valueSearch)
    const userId = useAppSelector(state => state.auth.data._id)
    const myPacksId = useAppSelector(state => state.packs.myPacksId)

    const name = searchParams.get('name')

    useEffect(() => {
        if (name === 'my') {
            dispatch(setMyCardsAC(userId))
        } else {
            dispatch(setMyCardsAC(''))
        }
    }, [])

    useEffect(() => {
        dispatch(getPacksTC())
    }, [valueSearch, myPacksId])

    const addNewPackHandler = () => {
        dispatch(createPackTC({name: 'newName', deckCover: '', private: false}))
    }
    const setSearchInput = (value: string) => {
        dispatch(setSearchInputAC(value))
    }


    const myButtonHandler = () => {
        setSearchParams({name: 'my'})
        dispatch(setMyCardsAC(userId))
    }
    const allButtonHandler = () => {
        setSearchParams({name: 'all'})
        dispatch(setMyCardsAC(''))
    }

    if (searchParams.get.name === 'my') {
        dispatch(setMyCardsAC(userId))
    }
    // const handleClick = () => {
    //     searchParams.set('foo', 'bar');
    //     setSearchParams(searchParams)
    // }

    return (
        <div>
            <div className={style.table}>
                <div className={style.paper}>
                    <div className={style.button}><Chip style={{backgroundColor: '#1976d2', color: '#fff'}}
                                                        size={'medium'}
                                                        label="Add new pack" component="a" href="#basic-chip"
                                                        clickable onClick={addNewPackHandler}/>
                    </div>
                    <div className={style.params}>
                        <div>
                            <h5>Search</h5>
                            <SearchInput setSearchInput={setSearchInput}/>
                        </div>
                        <div>
                            <h5>Show packs cards</h5>
                            <ButtonGroup
                                disableElevation
                                variant="contained"
                                aria-label="Disabled elevation buttons"
                            >
                                <Button size={'medium'} onClick={myButtonHandler}>My</Button>
                                <Button onClick={allButtonHandler}>All</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <h5>Number of cards</h5>
                            <RangeSlider/>
                        </div>
                        <div className={style.filter}>
                            <FilterAltIcon style={{color: '#1976d2'}} fontSize={'large'}/>
                        </div>
                    </div>
                    <div className={style.headTable}>
                        <PackTable/>
                    </div>
                </div>
            </div>
        </div>
    );
}
