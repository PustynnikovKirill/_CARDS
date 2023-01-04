import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../../app/redax/store";
import HalfRating from "../serchInputMyPack/Rating";
import {
    changeCardTC,
    deleteCardTC,
    getCardsTC,
    pageCardsAC,
    pageCountChangeAC
} from "../../../../app/redax/cards-reducer";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";


interface Column {
    // id: 'name' | 'code' | 'population' | 'size' | 'density';
    id: 'question' | 'answer' | 'lastUpdated' | 'crade' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'question', label: 'Question', minWidth: 170},
    {id: 'answer', label: 'Answer', minWidth: 100},
    {
        id: 'lastUpdated',
        label: 'Last Updated',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'crade',
        label: 'Crade',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'Action',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

// interface Data {
//     question: string;
//     answer: string;
//     lastUpdated: number;
//     crade: any;
//     actions: any;
// }

// function createData(
//     question: string,
//     answer: string,
//     lastUpdated: number,
//     crade: string,
//     actions: any,
// ): Data {
//     return {question, answer, lastUpdated, crade, actions};
// }


export const MyCardsTable = () => {

    const dispatch = useAppDispatch()
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const page = useSelector<AppRootStateType, number | undefined>(state => state.cards.page)
    const pageCount = useSelector<AppRootStateType, number | undefined>(state => state.cards.pageCount)
    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const cardsPack_id = useSelector<AppRootStateType, string>(state => state.cards.currentCardsPack_id)


    const handleChangePage = (event: unknown, newPage: number) => {
        newPage = newPage + 1
        dispatch(pageCardsAC(newPage))
        dispatch(getCardsTC({cardsPack_id, page: newPage, pageCount}))
        // setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(pageCountChangeAC(+event.target.value))
        dispatch(getCardsTC({cardsPack_id, pageCount: +event.target.value}))
    };

    const changeFormat = (format: string) => {
        return (new Date(format).toLocaleString())
    }

    const updateChangeHandler = (_id:string, cardsPack_id:string) => {
        dispatch(changeCardTC({_id,cardsPack_id,question:"newName"}))
    }

    const deleteCardHandler = (_id:string,cardsPack_id:string) => {
        dispatch(deleteCardTC(_id,cardsPack_id))
    }

// useEffect(() => {
//     dispatch(getCardsTC())
// }, [])


    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
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
                        {cards
                            .map((cards) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={cards._id}>
                                        <TableCell onClick={()=>updateChangeHandler(cards._id,cards.cardsPack_id)}>
                                            {cards.question}
                                        </TableCell>
                                        <TableCell>
                                            {cards.answer}
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            {changeFormat(cards.updated)}
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            <HalfRating/>
                                        </TableCell>
                                        <TableCell align={'right'}>
                                            <BorderColorIcon/><DeleteIcon onClick={()=>deleteCardHandler(cards._id,cards.cardsPack_id)}/>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2, 4]}
                component="div"
                count={cardsTotalCount}
                rowsPerPage={pageCount ? pageCount : 0}
                page={page ? page - 1 : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export type CardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    shots: number,
    user_id: string,
    created: string,
    updated: string,
    _id: string,
}

