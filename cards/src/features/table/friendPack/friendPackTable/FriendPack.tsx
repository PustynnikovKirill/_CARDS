import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../../app/redax/store";
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import HalfRating from "../serchInputFriendPack/Rating";


interface Column {
    // id: 'name' | 'code' | 'population' | 'size' | 'density';
    id: 'guestion' | 'answer' | 'lastUpdated' | 'crade';
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
];

interface Data {
    guestion: string;
    answer: string;
    lastUpdated: number;
    crade: any;
}

function createData(
    guestion: string,
    answer: string,
    lastUpdated: number,
    crade: string,
): Data {
    return {guestion, answer, lastUpdated, crade};
}

const rows = [
    createData('India', '', 0, ''),
    createData('Malta', '', 0, ''),

];

export const FriendPack = () => {
    const dispatch = useAppDispatch()
    const name = useSelector<AppRootStateType>((state) => state.packs.cardPacks.map(el => el.name))


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {

    }, [])

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
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.guestion}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                    {column.id === 'crade' &&
                                                        <div style={{width: '100%'}}><HalfRating/></div>}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}