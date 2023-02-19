import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Button, Checkbox, TextField} from "@mui/material";
import style from "./AddModale.module.scss"
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch} from "../../../app/redax/store";
import {addModalAC, createPackTC} from "../../../app/redax/packs-reducer";
import {useNavigate} from "react-router-dom";

export const AddModal = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    let [valueModal, setValueModal] = useState('')
    let [privatePack, setPrivatePack] = useState(false)

    const buttonHandler = () => {
        dispatch(addModalAC(false))
    }

    const closeModalHandler = () => {
        dispatch(addModalAC(false))
    }
    const onChangeModalHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueModal(event.currentTarget.value)
    }
    const saveTitleHandler =()=> {
        dispatch(createPackTC({name:valueModal,private: privatePack}))
        navigate ('/packsLists')
    }
    const changePrivateHandler = () => {
        setPrivatePack(true)
    }

    const onKeyPressHandler = ()=> {
        
    }

    return (
        <BasicModal>
            <div className={style.addModal}>
                <div className={style.header}>
                    <h3>Add new pack</h3>
                    <CloseIcon onClick={closeModalHandler}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Name pack" variant="standard"
                               value={valueModal}
                               onChange={onChangeModalHandler}
                               onKeyPress={onKeyPressHandler}
                    />
                </div>
                <div>
                    <Checkbox
                        checked={privatePack}
                        onChange={changePrivateHandler}
                        inputProps={{'aria-label': 'controlled'}}
                    /> Private pack
                </div>
                <div className={style.genericButton}>
                    <Button
                        onClick={buttonHandler}
                        className={style.button}
                        variant="outlined" size='small'>
                        Cancel
                    </Button>
                    <Button
                        onClick={saveTitleHandler}
                        className={style.button}
                        variant="outlined" size='small'>
                        Save
                    </Button>
                </div>
            </div>
        </BasicModal>
        // <BasicModal>
        //         <h1>AddModal title</h1>
        //         <button>add modal</button>
        // </BasicModal>
    );
};

