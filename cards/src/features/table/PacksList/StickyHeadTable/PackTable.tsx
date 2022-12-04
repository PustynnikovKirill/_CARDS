import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../../app/redax/store";
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
import {getCardsTC} from "../../../../app/redax/cards-reducer";
import {useNavigate} from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import {useEffect} from "react";

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
    const cardPacks = useSelector<AppRootStateType, CardPacksType>(state => state.packs.cardPacks)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const isLogin = useSelector<AppRootStateType>((state) => state.auth.isLogin)


    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

    // let pages = []
    // for (let i = 1; i <= pageCount; i++) {
    //     pages.push(i)
    // }

    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(createCurrentPageAC(newPage))
        dispatch(getPacksTC(newPage, pageCount))

    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(rowsPageAC(+event.target.value))
        dispatch(getPacksTC(page, +event.target.value))


        // setPage(0);
        // setRowsPerPage(+event.target.value);


    };


    // const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    //     // dispatch(createCurrentPageAC(page))
    //     dispatch(getPacksTC(page+1, pageCount))
    // }
    //
    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     dispatch(rowsPageAC(+event.target.value))
    //     dispatch(getPacksTC(page, +event.target.value))
    // };


    const createData = (data: any) => {
        return new Date(data).toLocaleDateString();
    }

    const deletePackHandler = (_id: string) => {
        dispatch(deletePackTC(_id))
    }

    const onClickToCardsHandler = (idPack: string) => {
        dispatch(getCardsTC({cardsPack_id: idPack}))
        navigate('/myPackTable')
    }

    useEffect(() => {
        if (isLogin) {
            dispatch(getPacksTC(page, pageCount))
        }
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
                        {cardPacks.map((card) => {
                            const updatePackHandler = () => {
                                dispatch(updatePackTC({_id: card._id, name: 'UpdatePack'}))
                            }
                            return <TableRow hover role="checkbox" tabIndex={-1} key={card._id}>
                                <TableCell onClick={() => onClickToCardsHandler(card._id)}>
                                    {card.name}
                                </TableCell>
                                <TableCell>
                                    {card.cardsCount}
                                </TableCell>
                                <TableCell>
                                    {createData(card.updated)}

                                </TableCell>
                                <TableCell>
                                    {card.user_id}
                                </TableCell>
                                <TableCell>
                                    <SchoolIcon/><BorderColorIcon onClick={updatePackHandler}/><DeleteIcon
                                    onClick={() => deletePackHandler(card._id)}/>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2, 4]}
                component="div"
                count={pagesCount}
                // count={cardPacks.length}
                rowsPerPage={pageCount}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // rowsPerPageOptions={[2, 4]}
                // component="div"
                // count={pagesCount}
                // rowsPerPage={pageCount}
                // page={page}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
//
export type  CardPacksType = PackType[]

export type PackType = {
    _id: string,
    user_id?: string,
    name?: string,
    cardsCount?: number,
    created?: string,
    updated?: string,
}

// export default function StickyHeadTable() {
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//
//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };
//
//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };
//
//     return (
//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//             <TableContainer sx={{ maxHeight: 440 }}>
//                 <Table stickyHeader aria-label="sticky table">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align={column.align}
//                                     style={{ minWidth: column.minWidth }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows
//                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             .map((row) => {
//                                 return (
//                                     <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                                         {columns.map((column) => {
//                                             const value = row[column.id];
//                                             return (
//                                                 <TableCell key={column.id} align={column.align}>
//                                                     {column.format && typeof value === 'number'
//                                                         ? column.format(value)
//                                                         : value}
//                                                 </TableCell>
//                                             );
//                                         })}
//                                     </TableRow>
//                                 );
//                             })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[10, 25, 100]}
//                 component="div"
//                 count={rows.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// }