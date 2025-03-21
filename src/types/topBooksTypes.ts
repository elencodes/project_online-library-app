import { IBook } from "./booksTypes";

export interface ITopBookState {
	topBooks: IBook[];
	totalBooks: number;
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
	CLEAR_TOP_BOOKS = "CLEAR_TOP_BOOKS",
	DELETE_TOP_BOOK = "DELETE_TOP_BOOK",
}

export interface IFetchTopBooksDataAction {
	type: TopBooksActionTypes.FETCH_TOP_BOOKS_DATA;
}

export interface IFetchTopBooksSuccessAction {
	type: TopBooksActionTypes.FETCH_TOP_BOOKS_SUCCESS;
	payload: {
		books: IBook[]; // Массив книг
		totalBooks: number; // Общее количество книг
	};
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

export interface IClearTopBooksAction {
	type: TopBooksActionTypes.CLEAR_TOP_BOOKS;
}
export interface IDeleteTopBooksAction {
	type: TopBooksActionTypes.DELETE_TOP_BOOK;
	payload: string;
}

export type TopBookActions =
	| IFetchTopBooksDataAction
	| IFetchTopBooksSuccessAction
	| ISetTopBooksPage
	| IFetchTopBooksError
	| IFetchTopBooksFinishedAction
	| IClearTopBooksAction
	| IDeleteTopBooksAction;
