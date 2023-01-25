import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {PacksActionsType, packsReducer} from "./packs-reducer";
import {CardsActionsType, cardsReducer} from "./cards-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards:cardsReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

type AppActionType = PacksActionsType | ProfileActionsType | AuthActionsType | CardsActionsType | AppActionsType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export const useAppDispatch =()=>useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
// @ts-ignore
window.store = store;