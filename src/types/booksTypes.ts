export interface IBook {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		categories: string[];
		description: string;
		imageLinks: {
			thumbnail: string;
		};
	};
}

export interface IBookState {
	book: IBook;
	isLoading: boolean;
	bookError: null | string;
}

export enum BookActionTypes {
	FETCH_BOOK_DATA = "FETCH_BOOK_DATA",
	FETCH_BOOK_SUCCESS = "FETCH_BOOK_SUCCESS",
	FETCH_BOOK_DATA_FINISHED = "FETCH_BOOK_DATA_FINISHED",
	FETCH_BOOK_ERROR = "FETCH_BOOK_ERROR",
	RESET_BOOK_STATE = "RESET_BOOK_STATE",
}

export interface IFetchBookSuccessAction {
	type: BookActionTypes.FETCH_BOOK_SUCCESS;
	payload: IBook;
}

export interface IFetchBookDataFinishedAction {
	type: BookActionTypes.FETCH_BOOK_DATA_FINISHED;
}

export interface IFetchBookErrorAction {
	type: BookActionTypes.FETCH_BOOK_ERROR;
	payload: string;
}

export interface IResetBookState {
	type: BookActionTypes.RESET_BOOK_STATE;
}

export interface IFetchBookData {
	type: BookActionTypes.FETCH_BOOK_DATA;
}

export type BookActions =
	| IFetchBookSuccessAction
	| IFetchBookErrorAction
	| IResetBookState
	| IFetchBookDataFinishedAction
	| IFetchBookData;
