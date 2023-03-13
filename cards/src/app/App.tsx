import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../features/Header/Header";
import {Pages} from "../features/Header/Pages";
import {AppRootStateType, useAppDispatch} from "./redax/store";
import {isLoginTC} from "./redax/auth-reducer";
import {useSelector} from "react-redux";
import {RequestStatusType, setAppStatusAC} from "./redax/app-reducer";
import {Error} from "../components/Error/Error";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {AddModal} from "../features/Profile/modals/AddModal";

function App() {
    const isInitialized = useSelector<AppRootStateType,boolean>(state=>state.auth.isInitialized)
    const status = useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)
    const isInitializedError = useSelector<AppRootStateType,boolean>(state=>state.app.isInitializedError)
    const dispatch = useAppDispatch()
    const modal = useSelector<AppRootStateType,boolean>(state=>state.packs.modal)


    useEffect(()=>{

        dispatch(isLoginTC())
    },[])
    if (!isInitialized) {
       dispatch(setAppStatusAC('loading'))
    }
    return (
        <div>
                <Header/>
            {status === 'loading' ? <Error/> :
                <Pages/>
            }
            {isInitializedError && <ErrorSnackbar/>}
            {modal && <AddModal/>}

        </div>
    );
}

export default App;
