import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { bookReducer } from "./reducers/booksReducer";

export const store = createStore(bookReducer, applyMiddleware(thunk)); //инициализация Redux store
