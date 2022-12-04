import React, {ChangeEvent, useState} from 'react';
import s from "./EditableSpan.module.scss"
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField/TextField';
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/redax/store";
import {changeTitleTC} from "../../app/redax/profile-reducer";


export const EditableSpan = React.memo(function () {
    const dispatch = useAppDispatch()
    const nickName = useSelector<AppRootStateType,string>(state=>state.profile.name)
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
    }
    const activateViewMode = () => {
        setEditMode(false);
        dispatch(changeTitleTC(title,''))


    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <div className={s.edi}><TextField id="standard-basic" label="Nickname" variant="standard" value={title} onChange={changeTitle}
                          autoFocus onBlur={activateViewMode}/>
            <Button style={{marginBlockEnd: '0px'}} variant="outlined" onClick={activateViewMode}>SAVE</Button></div>
        : <div className={s.rename}>
            <span onDoubleClick={activateEditMode}>{nickName}</span>
            <CreateIcon onClick={activateEditMode} className={s.pens}/>
        </div>
});