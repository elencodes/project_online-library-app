import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

export const store = createStore({}, applyMiddleware(thunk)); //инициализация Redux store
