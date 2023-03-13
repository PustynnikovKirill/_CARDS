import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Button, Checkbox, TextField} from "@mui/material";
import style from "./AddModale.module.scss"
import CloseIcon from '@mui/icons-material/Close';
import {AppRootStateType, useAppDispatch} from "../../../app/redax/store";
import {addModalAC, createPackTC, updatePackTC} from "../../../app/redax/packs-reducer";
import {useSelector} from "react-redux";


export const AddModal = () => {
    const dispatch = useAppDispatch()
    const currentName = useSelector<AppRootStateType, string>(state => state.packs.currentNameId.currentName)
    const changeModal = useSelector<AppRootStateType, boolean>(state => state.packs.changeModal)
    const currentPackId = useSelector<AppRootStateType, string>(state => state.packs.currentNameId.packId)


    let [valueModal, setValueModal] = useState(currentName)
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
    const saveTitleHandler = () => {
        if (changeModal) {
            dispatch(updatePackTC({_id: currentPackId, name: valueModal}))
        } else {
            dispatch(createPackTC({name: valueModal, private: privatePack}))
        }

        dispatch(addModalAC(false))

        // navigate ('/packsLists')
    }
    const changePrivateHandler = () => {
        setPrivatePack(!privatePack)
    }

    return (
        <BasicModal>
            <div className={style.addModal}>
                <div className={style.header}>
                    {changeModal ? <h3>Change pack</h3> : <h3>Add new pack</h3>}
                    <div className={style.closeButton}><CloseIcon onClick={closeModalHandler}/></div>
                </div>
                <div className={style.textField}>
                    <TextField id="standard-basic" label="Name pack" variant="standard"
                               value={valueModal}
                               onChange={onChangeModalHandler}
                               onKeyPress={(event) => {
                                   if (event.key === 'Enter') {
                                       saveTitleHandler()
                                   }
                               }}
                    />
                </div>
                <div className={style.checkbox}>
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
    );
};

