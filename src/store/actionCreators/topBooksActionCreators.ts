// Импортируем интерфейс IBook, который описывает структуру книги
import { IBook } from "../../types/booksTypes";

// Импортируем интерфейсы экшенов и перечисление типов экшенов для работы с топ-книгами
import {
	IFetchTopBooksDataAction, // Экшен для начала загрузки списка топ-книг
	IFetchTopBooksFinishedAction, // Экшен для завершения загрузки
	IFetchTopBooksSuccessAction, // Экшен для успешного получения списка книг
	ISetTopBooksPage, // Экшен для установки текущей страницы списка книг
	IFetchTopBooksError, // Экшен для обработки ошибки при получении топ-книг
	TopBooksActionTypes, // Перечисление типов экшенов
	IClearTopBooksAction, // Очистка списка топ-книг перед поиском
	IDeleteTopBooksAction, // Удаление книги из массива данных
} from "../../types/topBooksTypes";

// Экшен для начала загрузки списка топ-книг (например, показываем индикатор загрузки)
export const fetchTopBooksDataAction = (): IFetchTopBooksDataAction => {
	return {
		type: TopBooksActionTypes.FETCH_TOP_BOOKS_DATA, // Указываем тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
	};
};

// Экшен для успешного получения списка топ-книг
export const fetchTopBooksSuccessAction = (payload: {
	books: IBook[]; // В качестве параметра передаем массив объектов книг
	totalBooks: number;
}): IFetchTopBooksSuccessAction => {
	return {
		type: TopBooksActionTypes.FETCH_TOP_BOOKS_SUCCESS, // Указываем тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
		payload, // Теперь это объект с полями books и totalBooks
	};
};

// Экшен для завершения загрузки списка топ-книг (например, скрываем индикатор загрузки)
export const fetchTopBooksFinishedAction = (): IFetchTopBooksFinishedAction => {
	return {
		type: TopBooksActionTypes.FETCH_TOP_BOOKS_FINISHED, // Указываем тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
	};
};

// Экшен для установки текущей страницы списка топ-книг (например, для пагинации)
export const setTopBooksPageAction = (
	page: number // Передаем номер страницы
): ISetTopBooksPage => {
	return {
		type: TopBooksActionTypes.SET_TOP_BOOK_PAGE, // Указываем тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
		payload: page, // Сохраняем номер страницы в payload
	};
};

// Экшен для обработки ошибки при загрузке топ-книг
export const fetchTopBooksErrorAction = (
	message: string // Передаем текст ошибки
): IFetchTopBooksError => {
	return {
		type: TopBooksActionTypes.FETCH_TOP_BOOKS_ERROR, // Указываем тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
		payload: message, // Сохраняем текст ошибки в payload
	};
};

export const clearTopBooksAction = (): IClearTopBooksAction => {
	return {
		type: TopBooksActionTypes.CLEAR_TOP_BOOKS, // Указываем тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
	};
};

export const deleteTopBooksAction = (
	id: string // Передаем id книги
): IDeleteTopBooksAction => {
	return {
		type: TopBooksActionTypes.DELETE_TOP_BOOK, // Указываем тип экшена (помогает редьюсеру определить, какое действие нужно выполнить)
		payload: id, // Сохраняем id книги в payload
	};
};
