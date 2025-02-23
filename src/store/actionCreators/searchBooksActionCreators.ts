import { fetchTopBooks } from "../../utils/api";
import { AppDispatch } from "../store";

// Импортируем интерфейс IBook, который описывает структуру книги
import { IBook } from "../../types/booksTypes";

// Импортируем интерфейсы экшенов и перечисление типов экшенов для поиска книг
import {
	ISearchBookAction, // Экшен для начала поиска книг
	ISearchBookError, // Экшен для ошибки при поиске книг
	ISearchBookFinishedAction, // Экшен для завершения процесса поиска
	ISearchBookSuccessAction, // Экшен для успешного поиска книг
	ISetSearchKeyword, // Экшен для установки ключевого слова поиска
	ISetSearchBookPage, // Экшен для установки текущей страницы поиска
	ISetSearchPagesCount, // Экшен для установки количества страниц поиска
	SearchBookActionTypes,
	IDeleteBookFromSearchAction, // Перечисление всех типов экшенов для поиска книг
} from "../../types/searchBooksTypes";

// Экшен для начала поиска книг
export const searchBookAction = (): ISearchBookAction => {
	return {
		type: SearchBookActionTypes.SEARCH_BOOK, // Указываем тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
	};
};

// Экшен для успешного получения списка книг после запроса
export const searchBookSuccessAction = (
	books: IBook[], // В качестве параметра передаем массив объектов типа IBook (найденные книги)
	totalBooks: number
): ISearchBookSuccessAction => {
	return {
		type: SearchBookActionTypes.SEARCH_BOOK_SUCCESS, // Тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
		payload: { books, totalBooks }, // Передаем массив книг в поле payload
	};
};

// Экшен для завершения процесса поиска (например, скрытие спиннера загрузки)
export const searchBookFinishedAction = (): ISearchBookFinishedAction => {
	return {
		type: SearchBookActionTypes.SEARCH_BOOK_FINISHED, // Тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
	};
};

// Экшен для установки количества страниц результатов поиска
export const setSearchPagesCountAction = (
	page: number // В качестве параметра передаем число (количество страниц)
): ISetSearchPagesCount => {
	return {
		type: SearchBookActionTypes.SET_SEARCH_PAGES_COUNT, // Тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
		payload: page, // Передаем число страниц в payload
	};
};

// Экшен для установки текущей страницы поиска
export const setSearchPageAction = (page: number): ISetSearchBookPage => {
	return {
		type: SearchBookActionTypes.SET_SEARCH_BOOK_PAGE, // Тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
		payload: page, // Передаем текущую страницу в payload
	};
};

// Экшен для установки ключевого слова поиска
export const setSearchKeywordAction = (keyword: string): ISetSearchKeyword => {
	return {
		type: SearchBookActionTypes.SET_SEARCH_KEYWORD, // Тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
		payload: keyword, // Передаем ключевое слово в payload
	};
};

// Экшен для обработки ошибки при поиске книг
export const searchBookErrorAction = (message: string): ISearchBookError => {
	return {
		type: SearchBookActionTypes.SEARCH_BOOK_ERROR, // Тип экшена
		payload: message, // Передаем сообщение об ошибке в payload
	};
};

export const clearSearchResultsAction = () => {
	return async (dispatch: AppDispatch) => {
		// Очищаем результаты поиска
		dispatch({
			type: SearchBookActionTypes.CLEAR_SEARCH_RESULTS,
			payload: { totalBooks: 0 },
		});

		// Загружаем топ-книги после очистки поиска
		await dispatch(fetchTopBooks());
	};
};

// Экшен для удаления книги
export const deleteBookFromSearchAction = (
	id: string
): IDeleteBookFromSearchAction => {
	return {
		type: SearchBookActionTypes.DELETE_BOOK_FROM_SEARCH, // Тип экшена
		payload: id, // Передаем id книги в payload
	};
};
