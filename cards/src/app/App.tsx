import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../features/Header/Header";
import Pages from "../features/Header/Pages";
import {AppRootStateType, useAppDispatch} from "./redax/store";
import {isLoginTC} from "./redax/auth-reducer";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./redax/app-reducer";
import {Error} from "../components/Error/Error";

function App() {
    const isInitialized = useSelector<AppRootStateType,boolean>(state=>state.auth.isInitialized)
    const isLogin = useSelector<AppRootStateType,boolean>(state=>state.auth.isLogin)
    const status = useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(isLoginTC())
    },[])
    // if (!isInitialized) {
    //     return <div> Загрузка.... </div>
    // }
    return (
        <div>

                <Header/>
            {status === 'loading' ? <Error/> :
                <Pages/>
            }
        </div>
    );
}

export default App;
