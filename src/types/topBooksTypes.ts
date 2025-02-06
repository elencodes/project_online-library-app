import { IBook } from "./booksTypes";

export interface ITopBookState {
	topBooks: IBook[];
	isTopBooksLoading: boolean;
	currentPage: number;
	pagesCount: number;
	fetchTopBooksError: null | string;
}

export enum TopBooksActionTypes {
	FETCH_TOP_BOOKS_DATA = "FETCH_TOP_BOOKS_DATA",
	FETCH_TOP_BOOKS_SUCCESS = "FETCH_TOP_BOOKS_SUCCESS",
	FETCH_TOP_BOOKS_FINISHED = "FETCH_TOP_BOOKS_FINISHED",
	FETCH_TOP_BOOKS_ERROR = "FETCH_TOP_BOOKS_ERROR",
	SET_TOP_BOOK_PAGE = "SET_TOP_BOOK_PAGE",
}

export interface IFetchTopBooksDataAction {
	type: TopBooksActionTypes.FETCH_TOP_BOOKS_DATA;
}

export interface IFetchTopBooksSuccessAction {
	type: TopBooksActionTypes.FETCH_TOP_BOOKS_SUCCESS;
	payload: IBook[];
}

export interface IFetchTopBooksFinishedAction {
	type: TopBooksActionTypes.FETCH_TOP_BOOKS_FINISHED;
}

export interface IFetchTopBooksError {
	type: TopBooksActionTypes.FETCH_TOP_BOOKS_ERROR;
	payload: string;
}

export interface ISetTopBooksPage {
	type: TopBooksActionTypes.SET_TOP_BOOK_PAGE;
	payload: number;
}

export type TopBookActions =
	| IFetchTopBooksDataAction
	| IFetchTopBooksSuccessAction
	| ISetTopBooksPage
	| IFetchTopBooksError
	| IFetchTopBooksFinishedAction;
