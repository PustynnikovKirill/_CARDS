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

function App() {
    const isInitialized = useSelector<AppRootStateType,boolean>(state=>state.auth.isInitialized)
    const status = useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)
    const isInitializedError = useSelector<AppRootStateType,boolean>(state=>state.app.isInitializedError)
    const dispatch = useAppDispatch()

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

        </div>
    );
}

export default App;
