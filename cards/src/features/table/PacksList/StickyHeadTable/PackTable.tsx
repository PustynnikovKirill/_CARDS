import * as React from 'react';
import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../../app/redax/store";
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    createCurrentPageAC,
    deletePackTC,
    getPacksTC,
    rowsPageAC,
    updatePackTC
} from "../../../../app/redax/packs-reducer";
import {cardChangeMyOrFriend, getCardsTC} from "../../../../app/redax/cards-reducer";
import {useNavigate} from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import {IconButton} from "@mui/material";

interface Column {
    id: 'name' | 'cards' | 'LastUpdated' | 'createdBy' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'cards', label: 'Cards', minWidth: 100},
    {
        id: 'LastUpdated',
        label: 'Last Updated',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'createdBy',
        label: 'Created by',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

export const PackTable: React.FC = (props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const isLogin = useSelector<AppRootStateType>((state) => state.auth.isLogin)
    const userId = useSelector<AppRootStateType>((state) => state.auth.data._id)


    const handleChangePage = (event: unknown, newPage: number) => {
        newPage = newPage + 1
        dispatch(createCurrentPageAC(newPage))
        dispatch(getPacksTC(newPage, pageCount))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(rowsPageAC(+event.target.value))
        dispatch(getPacksTC(page, +event.target.value))
    };

    const createData = (data: any) => {
        return new Date(data).toLocaleDateString();
    }

    const deletePackHandler = (_id: string) => {
        dispatch(deletePackTC(_id))
    }

    const onClickToCardsHandler = (idPack: string, user_id: string | undefined) => {
        if (user_id === userId) {
            dispatch(cardChangeMyOrFriend(true))
        } else {
            dispatch(cardChangeMyOrFriend(false))
        }
        dispatch(getCardsTC({cardsPack_id: idPack}))
        navigate('/myPackTable')
    }

    useEffect(() => {
        if (isLogin) {
            dispatch(getPacksTC(page, pageCount))
        }
    }, [])

    return (
        <>
            {cardPacks.length
                ? <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cardPacks?.map((card) => {
                                    const updatePackHandler = () => {
                                        dispatch(updatePackTC({_id: card._id, name: 'UpdatePack'}))
                                    }
                                    return <TableRow hover role="checkbox" tabIndex={-1} key={card._id}>
                                        <TableCell onClick={() => onClickToCardsHandler(card._id, card.user_id)}>
                                            {card.name}
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            {card.cardsCount}
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            {createData(card.updated)}
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            {card.user_name}
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            {
                                                card.user_id === userId
                                                    ? <><IconButton disabled = {card.cardsCount === 0}>
                                                        <SchoolIcon/>
                                                    </IconButton>
                                                        <IconButton disabled = {card.cardsCount === 0}>
                                                            <BorderColorIcon onClick={updatePackHandler}/>
                                                        </IconButton>
                                                        <IconButton disabled = {card.cardsCount === 0}>
                                                            <DeleteIcon
                                                                onClick={() => deletePackHandler(card._id)}/>
                                                        </IconButton>
                                                       </>
                                                    :
                                                    <IconButton disabled = {card.cardsCount === 0}>
                                                        <SchoolIcon
                                                        />
                                                    </IconButton>

                                            }
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[2, 4]}
                        component="div"
                        count={cardPacksTotalCount}
                        rowsPerPage={pageCount}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                : <div>Колоды с данным именем не найденно, измените параметры поиска</div>
            }
        </>

    );
}

export type  CardPacksType = PackType[]

export type PackType = {
    _id: string,
    user_id?: string,
    name?: string,
    cardsCount?: number,
    created?: string,
    updated?: string,
    user_name?: string
}