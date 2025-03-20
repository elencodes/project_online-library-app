import {
	IAddedBook,
	AddedBooksActionTypes,
	IAddBookAction,
	IRemoveBookAction,
	ILoadBooksAction,
} from "../../types/addedBooksTypes";
import { Dispatch } from "redux";
import {
	saveBookToIndexedDB,
	getBooksFromIndexedDB,
	deleteBookFromIndexedDB,
} from "../../utils/indexedDBService";

// Асинхронное добавление книги с сохранением в IndexedDB
export const addBookAction =
	(book: IAddedBook) => async (dispatch: Dispatch<IAddBookAction>) => {
		try {
			await saveBookToIndexedDB(book); // Сохраняем книгу в IndexedDB

			dispatch({
				type: AddedBooksActionTypes.ADD_BOOK,
				payload: book,
			});
		} catch (error) {
			console.error("Ошибка сохранения книги в IndexedDB:", error);
		}
	};

// Асинхронная загрузка книг из IndexedDB при старте приложения
export const loadBooksAction =
	() => async (dispatch: Dispatch<ILoadBooksAction>) => {
		try {
			const books = await getBooksFromIndexedDB(); // Получаем книги из IndexedDB

			dispatch({
				type: AddedBooksActionTypes.LOAD_BOOKS,
				payload: books,
			});
		} catch (error) {
			console.error("Ошибка загрузки книг из IndexedDB:", error);
		}
	};

// Асинхронное удаление книги из IndexedDB и Redux
export const removeBookAction =
	(id: string) => async (dispatch: Dispatch<IRemoveBookAction>) => {
		try {
			await deleteBookFromIndexedDB(id); // Удаляем книгу из IndexedDB

			dispatch({
				type: AddedBooksActionTypes.REMOVE_BOOK,
				payload: id,
			});
		} catch (error) {
			console.error("Ошибка удаления книги из IndexedDB:", error);
		}
	};
