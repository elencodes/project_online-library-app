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
	SearchBookActionTypes, // Перечисление всех типов экшенов для поиска книг
} from "../../types/searchBooksTypes";

// Экшен для начала поиска книг
export const searchBookAction = (): ISearchBookAction => {
	return {
		type: SearchBookActionTypes.SEARCH_BOOK, // Указываем тип экшена
	};
};

// Экшен для успешного получения списка книг после запроса
export const searchBookSuccessAction = (
	books: IBook[] // В качестве параметра передаем массив объектов типа IBook (найденные книги)
): ISearchBookSuccessAction => {
	return {
		type: SearchBookActionTypes.SEARCH_BOOK_SUCCESS, // Тип экшена
		payload: books, // Передаем массив книг в поле payload
	};
};

// Экшен для завершения процесса поиска (например, скрытие спиннера загрузки)
export const searchBookFinishedAction = (): ISearchBookFinishedAction => {
	return {
		type: SearchBookActionTypes.SEARCH_BOOK_FINISHED, // Тип экшена
	};
};

// Экшен для установки количества страниц результатов поиска
export const setSearchPagesCountAction = (
	page: number // В качестве параметра передаем число (количество страниц)
): ISetSearchPagesCount => {
	return {
		type: SearchBookActionTypes.SET_SEARCH_PAGES_COUNT, // Тип экшена
		payload: page, // Передаем число страниц в payload
	};
};

// Экшен для установки текущей страницы поиска
export const setSearchPageAction = (page: number): ISetSearchBookPage => {
	return {
		type: SearchBookActionTypes.SET_SEARCH_BOOK_PAGE, // Тип экшена
		payload: page, // Передаем текущую страницу в payload
	};
};

// Экшен для установки ключевого слова поиска
export const setSearchKeywordAction = (keyword: string): ISetSearchKeyword => {
	return {
		type: SearchBookActionTypes.SET_SEARCH_KEYWORD, // Тип экшена
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
