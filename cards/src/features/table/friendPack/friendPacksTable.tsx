import * as React from 'react';
import {Chip} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./friendPacksTable.module.scss";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {SearchInputFriendPack} from "./serchInputFriendPack/searchInputFriendPack";
import {FriendPack} from "./friendPackTable/FriendPack";


export const FriendPacksTable = () => {

    return (
        <div>
            <div className={style.table}>
                <div className={style.paper}>
                    <div className={style.buttonBack}><Chip icon={<ArrowBackIcon style={{fontSize:'medium'}}/>} label="Back to packs list" component="a" href="#basic-chip" clickable /></div>
                    <div className={style.title}>
                        <h1 className={style.h1}>Friend's Pack</h1><MoreVertIcon style={{marginBottom:'-12px'}}/>
                        <div className={style.button}><Chip style={{backgroundColor: '#1976d2', color: '#fff'}}
                                                            size={'medium'} icon={<ArrowBackIcon
                            style={{fontSize: 'medium', color: '#fff'}}/>}
                                                            label="Learn to pack" component="a" href="#basic-chip"
                                                            clickable/>
                        </div>

                    </div>

                    <div className={style.params}>
                        <h5 className={style.search}>Search</h5>
                        <SearchInputFriendPack/>
                    </div>
                    <div className={style.myPack}>
                        <FriendPack/>
                    </div>

                </div>
            </div>
        </div>
    );
}
