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
import {getCardsTC, pageCardsAC, pageCountChangeAC} from "../../../../app/redax/cards-reducer";


interface Column {
    // id: 'name' | 'code' | 'population' | 'size' | 'density';
    id: 'guestion' | 'answer' | 'lastUpdated' | 'crade' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'guestion', label: 'Question', minWidth: 170},
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
        label: '',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    guestion: string;
    answer: string;
    lastUpdated: number;
    crade: any;
    actions: any;
}

function createData(
    guestion: string,
    answer: string,
    lastUpdated: number,
    crade: string,
    actions: any,
): Data {
    return {guestion, answer, lastUpdated, crade, actions};
}


export const MyCardsTable = () => {
    const dispatch = useAppDispatch()

    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const newPage = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const page = useSelector<AppRootStateType, number | undefined>(state => state.cards.page)
    const pageCount = useSelector<AppRootStateType, number | undefined>(state => state.cards.pageCount)
    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId)


    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(4);

    // const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number|undefined) => {
    //     dispatch(pageCardsAC(page))
    //     dispatch(getCardsTC({page,pageCount}))

    // dispatch(createCurrentPageAC(newPage))
    //
    // dispatch(getPacksTC(newPage,+event.target.value))
    // setPage(newPage);
// };

// const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(pageCountChangeAC(+event.target.value))
//     dispatch(getCardsTC({pageCount}))
// };


    const changeFormat = (format: string) => {
        return (new Date(format).toLocaleString())
    }
//
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
                                        <TableCell>
                                            {cards.question}
                                        </TableCell>
                                        <TableCell>
                                            {cards.answer}
                                        </TableCell>
                                        <TableCell>
                                            {changeFormat(cards.updated)}
                                        </TableCell>
                                        <TableCell>
                                            <HalfRating/>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        {/*<TableRow hover role="checkbox" tabIndex={-1} key={row.guestion}>*/}
                        {/*    {columns.map((column) => {*/}
                        {/*        const value = row[column.id];*/}
                        {/*        return (*/}
                        {/*            <TableCell key={column.id} align={column.align}>*/}
                        {/*                {column.format && typeof value === 'number'*/}
                        {/*                    ? column.format(value)*/}
                        {/*                    : value}*/}
                        {/*                {column.id ==='actions' && <div>*/}
                        {/*                    <SchoolIcon/><BorderColorIcon/><DeleteIcon/>*/}
                        {/*                </div>}*/}
                        {/*                {column.id === 'crade' && <div style={{width:'100%'}}><HalfRating/></div>}*/}
                        {/*            </TableCell>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*</TableRow>*/}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*<TablePagination*/}
            {/*    rowsPerPageOptions={[2, 4]}*/}
            {/*    component="div"*/}
            {/*    count={cards.length}*/}
            {/*    rowsPerPage={pageCount}*/}
            {/*    page={page}*/}
            {/*    onPageChange={handleChangePage}*/}
            {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
            {/*/>*/}
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

