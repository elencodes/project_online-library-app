// Импортируем интерфейсы экшенов и типы данных, связанных с книгой
import {
	IFetchBookData, // Экшен для начала загрузки книги
	IFetchBookDataFinishedAction, // Экшен для завершения загрузки книги
	IFetchBookErrorAction, // Экшен при ошибке загрузки книги
	IFetchBookSuccessAction, // Экшен при успешном получении данных книги
	IBook, // Интерфейс для структуры объекта книги
	IResetBookState, // Экшен для сброса состояния книги
	BookActionTypes, // Перечисление типов экшенов
} from "../../types/booksTypes";

// Экшен для успешного получения данных книги
export const fetchBookSuccessAction = (
	bookData: IBook // В качестве параметра передаем объект книги
): IFetchBookSuccessAction => {
	return {
		type: BookActionTypes.FETCH_BOOK_SUCCESS, // Тип экшена
		payload: bookData, // Передаем объект книги в payload
	};
};

// Экшен для начала загрузки данных книги (например, показываем спиннер)
export const fetchBookDataAction = (): IFetchBookData => {
	return {
		type: BookActionTypes.FETCH_BOOK_DATA, // Тип экшена
	};
};

// Экшен для завершения процесса загрузки книги (например, скрываем спиннер)
export const fetchBookDataFinishedAction = (): IFetchBookDataFinishedAction => {
	return {
		type: BookActionTypes.FETCH_BOOK_DATA_FINISHED, // Тип экшена
	};
};

// Экшен для обработки ошибки при загрузке книги
export const fetchBookErrorAction = (
	message: string // В качестве параметра передаем сообщение об ошибке
): IFetchBookErrorAction => {
	return {
		type: BookActionTypes.FETCH_BOOK_ERROR, // Тип экшена
		payload: message, // Передаем текст ошибки в payload
	};
};

// Экшен для сброса состояния книги (например, при выходе из страницы книги)
export const resetBookStateAction = (): IResetBookState => {
	return {
		type: BookActionTypes.RESET_BOOK_STATE, // Тип экшена
	};
};
