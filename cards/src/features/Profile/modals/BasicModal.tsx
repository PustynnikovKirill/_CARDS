import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC, ReactNode} from "react";
import {useAppSelector} from "../../../app/redax/store";
// import style from "./BasicModal.module.scss"


const style = {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type PropsType = {
    children:ReactNode   // не видим обернут в тег или нет
    // children:JSX.Element, -для того чтобы мы видели что используется с одним тегом
}

export const BasicModal:FC<PropsType> = ({children}) => {
    const modal = useAppSelector(state => state.packs.modal)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div >
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                    {/*<Typography id="modal-modal-title" variant="h6" component="h2">*/}
                    {/*    Text in a modal*/}
                    {/*</Typography>*/}
                    {/*<Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}
                    {/*    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
                    {/*</Typography>*/}
                </Box>
            </Modal>
        </div>
    );
}
