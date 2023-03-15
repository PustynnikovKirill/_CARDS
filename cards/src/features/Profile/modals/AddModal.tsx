import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "./BasicModal";
import {Button, Checkbox, TextField} from "@mui/material";
import style from "./AddModale.module.scss"
import CloseIcon from '@mui/icons-material/Close';
import {AppRootStateType, useAppDispatch} from "../../../app/redax/store";
import {addModalAC, createPackTC, updatePackTC, ValueModalType} from "../../../app/redax/packs-reducer";
import {useSelector} from "react-redux";

const headers = {
    changeModal: 'Change pack',
    addModal: 'Add new pack',
    deleteModal: 'Delete Modal'
}

export const AddModal = () => {
    const statusModal = useSelector<AppRootStateType, ValueModalType>(state => state.packs.statusModal)

    return (
        <BasicModal>
            {statusModal === 'deleteModal' ? <DeleteModal/>:<AddPack/>}
        </BasicModal>
    );
};

export const AddPack = () => {
    const dispatch = useAppDispatch()
    const currentName = useSelector<AppRootStateType, string>(state => state.packs.currentNameId.currentName)
    const statusModal = useSelector<AppRootStateType, ValueModalType>(state => state.packs.statusModal)
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
        if (statusModal === 'changeModal') {
            dispatch(updatePackTC({_id: currentPackId, name: valueModal}))
        } else if (statusModal === 'addModal') {
            dispatch(createPackTC({name: valueModal, private: privatePack}))
        }

        dispatch(addModalAC(false))

        // navigate ('/packsLists')
    }
    const changePrivateHandler = () => {
        setPrivatePack(!privatePack)
    }
    return (
        <div className={style.addModal}>
            <div className={style.header}>
                {/*{statusModal === 'changeModal' ? <h3>Change pack</h3> : <h3>Add new pack</h3>}*/}
                <h3>{headers[statusModal]}</h3>

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
    )
}

const DeleteModal = () => {
    const dispatch = useAppDispatch()
    const currentName = useSelector<AppRootStateType, string>(state => state.packs.currentNameId.currentName)
    const statusModal = useSelector<AppRootStateType, ValueModalType>(state => state.packs.statusModal)
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
        if (statusModal === 'changeModal') {
            dispatch(updatePackTC({_id: currentPackId, name: valueModal}))
        } else if (statusModal === 'addModal') {
            dispatch(createPackTC({name: valueModal, private: privatePack}))
        }

        dispatch(addModalAC(false))

        // navigate ('/packsLists')
    }
    const changePrivateHandler = () => {
        setPrivatePack(!privatePack)
    }
    return (
        <div className={style.addModal}>
            <div className={style.header}>
                {/*{statusModal === 'changeModal' ? <h3>Change pack</h3> : <h3>Add new pack</h3>}*/}
                <h3>{headers[statusModal]}</h3>

                <div className={style.closeButton}><CloseIcon onClick={closeModalHandler}/></div>
            </div>
            <div className={style.textField}>
                <h4>Do you really want to remove Pack Name? All cards will be deleted.</h4>
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
                    className={style.deleteButton}
                    variant="outlined" size='small'>
                    Delete
                </Button>
            </div>
        </div>
    )
}