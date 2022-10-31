import React, {ChangeEvent, useState} from 'react';
import s from "./EditableSpan.module.scss"
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField/TextField';
import {Button} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log('EditableSpan called');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <div className={s.edi}><TextField id="standard-basic" label="Nickname" variant="standard" value={title} onChange={changeTitle}
                          autoFocus onBlur={activateViewMode}/>
            <Button style={{marginBlockEnd: '0px'}} variant="outlined" onClick={activateViewMode}>SAVE</Button></div>
        : <div className={s.rename}>
            <span onDoubleClick={activateEditMode}>{props.value}</span>
            <CreateIcon onClick={activateEditMode} className={s.pens} style={{}}/>
        </div>
});