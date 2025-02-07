import axios from "axios";
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

//Настроенный экземпляр axios
const apiClient = axios.create({
	baseURL: BASE_FETCH_URL,
	headers: {
		"X-API-KEY": import.meta.env.VITE_API_KEY, // API-ключ из переменной окружения
	},
});

//Получение списка топовых книг
const fetchTopBooks = (page = 1) => {
	return async (dispatch: Dispatch<TopBookActions>) => {
		try {
			dispatch(fetchTopBooksDataAction());

			const response = await apiClient.get(BASE_TOP_BOOKS_URL, {
				params: {
					startIndex: (page - 1) * 10, // Смещение для пагинации
					maxResults: 30,
				},
			});

			dispatch(fetchTopBooksSuccessAction(response.data.items || []));
		} catch (error) {
			console.log("Error fetching top books:", error);
			dispatch(fetchTopBooksErrorAction(FETCH_ERROR_MESSAGE));
		} finally {
			dispatch(fetchTopBooksFinishedAction());
		}
	};
};

//Получение данных о конкретной книге
const fetchBook = (id: string) => {
	return async (dispatch: Dispatch<BookActions>) => {
		try {
			dispatch(fetchBookDataAction());

			const response = await apiClient.get(`/${id}`);

			dispatch(fetchBookSuccessAction(response.data));
		} catch (error) {
			console.log("Error fetching book:", error);
			dispatch(fetchBookErrorAction(FETCH_ERROR_MESSAGE));
		} finally {
			dispatch(fetchBookDataFinishedAction());
		}
	};
};

//Поиск книг по ключевому слову
const searchBooks = (keyword = "", page = 1) => {
	return async (dispatch: Dispatch<SearchBookActions>) => {
		try {
			dispatch(searchBookAction());

			const response = await apiClient.get("", {
				params: {
					q: keyword,
					startIndex: (page - 1) * 10, // Смещение для пагинации
					maxResults: 30,
				},
			});

			const searchResults = response.data.items || [];

			dispatch(searchBookSuccessAction(searchResults));
			dispatch(
				setSearchPagesCountAction(Math.ceil(response.data.totalItems / 10))
			);
			dispatch(setSearchKeywordAction(keyword));
		} catch (error) {
			dispatch(searchBookErrorAction(FETCH_ERROR_MESSAGE));
			console.log("Error searching books:", error);
		} finally {
			dispatch(searchBookFinishedAction());
		}
	};
};

export { fetchTopBooks, fetchBook, searchBooks };
