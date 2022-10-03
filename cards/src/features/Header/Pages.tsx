import {Routes, Route, Navigate} from "react-router-dom";
import {Login} from "../Login/Login";
import {Registration} from "../Registration/Registration";
import {Profile} from "../Profile/Profile";
import {PasswordRecovery} from "../PasswordRecovery/PasswordRecovery";
import {Error} from "../Error/Error";
import {Welcome} from "../Welcome/Welcome";


export const PATH = {
    WELCOME:'/welcome',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE:'/profile',
    ERROR:'/error',
    PASSWORD_RECOVERY: '/passwordRecovery',
    ENTERING_A_NEW_PASSWORD: '/enteringANewPassword',

}

function Pages() {
    return (
        <div>
            {/*Routes выбирает первый подходящий роут*/}
            <Routes>
                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу PRE_JUNIOR*/}
                <Route path={'/'} element={<Navigate to={PATH.WELCOME}/>}/>

                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route path={PATH.ERROR} element={<Error/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>

                <Route path={PATH.WELCOME} element={<Welcome/>}/>
            </Routes>
        </div>
    )
}

export default Pages
