import React from 'react';
import './App.css';
import {Header} from "../features/Header/Header";
import {HashRouter} from "react-router-dom";
import Pages from "../features/Header/Pages";

function App() {
    return (
        <div>
            <HashRouter>
                <Header/>
                <Pages/>
            </HashRouter>
        </div>
    );
}

export default App;
