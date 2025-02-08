import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers";

//инициализация Redux store
export const store = createStore(
	rootReducer,
	undefined,
	applyMiddleware(thunk)
);

//Определяем тип для dispatch
export type AppDispatch = typeof store.dispatch;
