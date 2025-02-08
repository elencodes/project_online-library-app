import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../store/reducers";
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
import { BASE_FETCH_URL, FETCH_ERROR_MESSAGE } from "./constants";

const API_KEY = import.meta.env.VITE_API_KEY;

//Настроенный экземпляр axios
const apiClient = axios.create({
	baseURL: BASE_FETCH_URL,
});

//Получение списка топовых книг
const fetchTopBooks = (page = 1) => {
	return async (
		dispatch: Dispatch<TopBookActions>,
		getState: () => RootState
	) => {
		try {
			dispatch(fetchTopBooksDataAction());

			const response = await apiClient.get("", {
				params: {
					q: "top+100+books", // Обязательно добавляем поисковый запрос
					startIndex: (page - 1) * 10, // Смещение для пагинации
					maxResults: 30,
					key: API_KEY, // Передаем API-ключ как параметр
				},
			});

			// Получаем сохраненное totalBooks (текущее значение totalBooks из состояния Redux))
			const prevTotalBooks = getState().topBooks.totalBooks;

			dispatch(
				fetchTopBooksSuccessAction({
					books: response.data.items || [],
					totalBooks: prevTotalBooks || response.data.totalItems || 0,
				})
			);
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

			const response = await apiClient.get(`/${id}`, {
				params: { key: API_KEY }, // Добавляем API-ключ в параметры
			});

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
					q: keyword, // Передаем ключевое слов
					startIndex: (page - 1) * 10, // Смещение для пагинации
					maxResults: 30,
					key: API_KEY, // Добавляем API-ключ
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
