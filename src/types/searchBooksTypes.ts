import { IBook } from "./booksTypes";

export interface ISearchBookState {
	keyword: string;
	searchResults: IBook[];
	totalSearchBooks: number;
	isSearching: boolean;
	isSearchResultsLoading: boolean;
	searchResultsCurrentPage: number;
	searchResultsPagesCount: number;
	searchBookError: string | null;
}

export enum SearchBookActionTypes {
	SEARCH_BOOK = "SEARCH_BOOK",
	SEARCH_BOOK_SUCCESS = "SEARCH_BOOK_SUCCESS",
	SEARCH_BOOK_FINISHED = "SEARCH_BOOK_FINISHED",
	SEARCH_BOOK_ERROR = "SEARCH_BOOK_ERROR",
	SET_SEARCH_BOOK_PAGE = "SET_SEARCH_BOOK_PAGE",
	SET_SEARCH_KEYWORD = "SET_SEARCH_KEYWORD",
	SET_SEARCH_PAGES_COUNT = "SET_SEARCH_PAGES_COUNT",
	CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS",
	DELETE_BOOK_FROM_SEARCH = "DELETE_BOOK_FROM_SEARCH",
}

export interface ISearchBookSuccessAction {
	type: SearchBookActionTypes.SEARCH_BOOK_SUCCESS;
	payload: {
		books: IBook[]; // Найденные книги
		totalBooks: number; // Общее количество найденных книг
	};
}

export interface ISearchBookError {
	type: SearchBookActionTypes.SEARCH_BOOK_ERROR;
	payload: string;
}

export interface ISearchBookAction {
	type: SearchBookActionTypes.SEARCH_BOOK;
}

export interface ISearchBookFinishedAction {
	type: SearchBookActionTypes.SEARCH_BOOK_FINISHED;
}

export interface ISetSearchBookPage {
	type: SearchBookActionTypes.SET_SEARCH_BOOK_PAGE;
	payload: number;
}

export interface ISetSearchKeyword {
	type: SearchBookActionTypes.SET_SEARCH_KEYWORD;
	payload: string;
}

export interface ISetSearchPagesCount {
	type: SearchBookActionTypes.SET_SEARCH_PAGES_COUNT;
	payload: number;
}

export interface IClearSearchResultsAction {
	type: SearchBookActionTypes.CLEAR_SEARCH_RESULTS;
	payload: { totalBooks: number };
}
export interface IDeleteBookFromSearchAction {
	type: SearchBookActionTypes.DELETE_BOOK_FROM_SEARCH;
	payload: string;
}

export type SearchBookActions =
	| ISearchBookAction
	| ISearchBookFinishedAction
	| ISetSearchBookPage
	| ISetSearchKeyword
	| ISetSearchPagesCount
	| ISearchBookError
	| ISearchBookSuccessAction
	| IClearSearchResultsAction
	| IDeleteBookFromSearchAction;
