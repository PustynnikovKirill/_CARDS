import React from 'react';
import {BasicModal} from "./BasicModal";
import {Button, Checkbox, TextField} from "@mui/material";
import style from "./AddModale.module.scss"
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch} from "../../../app/redax/store";
import {addModalAC} from "../../../app/redax/packs-reducer";

export const AddModal = () => {
    const dispatch = useAppDispatch()

    const buttonHandler =()=>{
        dispatch(addModalAC(false))
    }


    return (
        <BasicModal>
            <div className={style.addModal}>
                <div className={style.header}>
                    <h3>Add new pack</h3>
                    <CloseIcon/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Name pack" variant="standard"/>
                </div>
                <div>
                    <Checkbox
                        // checked={checked}
                        // onChange={handleChange}
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

