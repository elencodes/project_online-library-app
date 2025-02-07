import { Dispatch } from "redux";
import {
	searchBookAction,
	searchBookErrorAction,
	searchBookFinishedAction,
	searchBookSuccessAction,
	setSearchKeywordAction,
	setSearchPagesCountAction,
} from "../store/actionCreators/searchBooksActionCreators";

import {
	fetchBookDataAction,
	fetchBookDataFinishedAction,
	fetchBookErrorAction,
	fetchBookSuccessAction,
} from "../store/actionCreators/singleBookActionCreators";

import {
	fetchTopBooksDataAction,
	fetchTopBooksErrorAction,
	fetchTopBooksFinishedAction,
	fetchTopBooksSuccessAction,
} from "../store/actionCreators/topBooksActionCreators";

import { BookActions } from "../types/booksTypes";
import { SearchBookActions } from "../types/searchBooksTypes";
import { TopBookActions } from "../types/topBooksTypes";
import {
	BASE_FETCH_URL,
	BASE_TOP_BOOKS_URL,
	FETCH_ERROR_MESSAGE,
} from "./constants";

const options = {
	headers: { "X-API-KEY": "*" },
};

const checkResponse = (response: Response) => {
	return response.ok
		? response.json()
		: Promise.reject("Error from the frontend");
};

const fetchTopBooks = (page = 1) => {
	return async (dispatch: Dispatch<TopBookActions>) => {
		try {
			dispatch(fetchTopBooksDataAction());
			const response = await fetch(`${BASE_TOP_BOOKS_URL}${page}`, options);
			const topBooksData = await checkResponse(response);
			dispatch(fetchTopBooksSuccessAction(topBooksData.books));
		} catch (error) {
			console.log("Error fetching top books:", error);
			setTimeout(
				() => dispatch(fetchTopBooksErrorAction(FETCH_ERROR_MESSAGE)),
				400
			);
		} finally {
			setTimeout(() => dispatch(fetchTopBooksFinishedAction()), 500);
		}
	};
};

const fetchBook = (id: string) => {
	return async (dispatch: Dispatch<BookActions>) => {
		try {
			dispatch(fetchBookDataAction());
			const response = await fetch(`${BASE_FETCH_URL}/${id}`, options);
			const bookData = await checkResponse(response);
			dispatch(fetchBookSuccessAction(bookData.data));
		} catch (error) {
			console.log("Error fetching book:", error);
			setTimeout(
				() => dispatch(fetchBookErrorAction(FETCH_ERROR_MESSAGE)),
				400
			);
		} finally {
			setTimeout(() => dispatch(fetchBookDataFinishedAction()), 500);
		}
	};
};

const searchBooks = (keyword?: string, page = 1) => {
	return async (dispatch: Dispatch<SearchBookActions>) => {
		try {
			dispatch(searchBookAction());
			const response = await fetch(
				`${BASE_FETCH_URL}?q=${keyword}$page=${page}`,
				options
			);
			const searchResultsData = await checkResponse(response);
			dispatch(searchBookSuccessAction(searchResultsData.books));
			dispatch(setSearchPagesCountAction(searchResultsData.pagesCount));
			dispatch(setSearchKeywordAction(searchResultsData.keyword));
		} catch (error) {
			setTimeout(
				() => dispatch(searchBookErrorAction(FETCH_ERROR_MESSAGE)),
				400
			);
			console.log("Error searching books:", error);
		} finally {
			setTimeout(() => dispatch(searchBookFinishedAction()), 500);
		}
	};
};

export { fetchTopBooks, fetchBook, searchBooks };
