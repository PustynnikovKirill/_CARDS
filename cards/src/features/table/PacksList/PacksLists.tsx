import * as React from 'react';
import style from './PacksLists.module.scss'
import {Button, ButtonGroup, Chip} from "@mui/material";
import {RangeSlider} from "./RangeSlider/RangeSlider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {SearchInput} from "./serchInput/searchInput";
import {AppRootStateType, useAppDispatch} from "../../../app/redax/store";
import {createPackTC, getPacksTC, setSearchInputAC} from "../../../app/redax/packs-reducer";
import {PackTable} from "./StickyHeadTable/PackTable";
import {useEffect} from "react";
import {useSelector} from "react-redux";


export const PacksList = () => {

    const dispatch = useAppDispatch()
    const setSearch = useSelector<AppRootStateType, string>(state => state.packs.setSearch)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [setSearch])


    const addNewPackHandler = () => {
        dispatch(createPackTC({name: 'newName', deckCover: '', private: false}))
    }

    const setSearchInput = (value: string) => {
        dispatch(setSearchInputAC(value))
    }

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
                                <Button size={'medium'}>One</Button>
                                <Button>Two</Button>
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
