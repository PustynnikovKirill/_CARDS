import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {profileReducer} from "./profile-reducer";
import {useDispatch} from "react-redux";
import {packsReducer} from "./packs-reducer";
import {cardsReducer} from "./cards-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards:cardsReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export  type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = ()=> useDispatch<AppDispatch>()
// @ts-ignore
window.store = store;