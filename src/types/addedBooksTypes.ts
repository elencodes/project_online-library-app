export interface IAddedBook {
	id: string;
	cover: string | null;
	title: string;
	author: string[];
	genre: string[];
	description: string;
	originalFile?: File | null;
}

export interface IAddedBookState {
	addedBooks: IAddedBook[];
}

export enum AddedBooksActionTypes {
	ADD_BOOK = "ADD_BOOK",
	LOAD_BOOKS = "LOAD_BOOKS",
	REMOVE_BOOK = "REMOVE_BOOK",
}

// Добавление книги
export interface IAddBookAction {
	type: AddedBooksActionTypes.ADD_BOOK;
	payload: IAddedBook;
}

// Удаление книги
export interface IRemoveBookAction {
	type: AddedBooksActionTypes.REMOVE_BOOK;
	payload: string; // ID книги
}

// Загрузка книг из IndexedDB
export interface ILoadBooksAction {
	type: AddedBooksActionTypes.LOAD_BOOKS;
	payload: IAddedBook[];
}

export type AddedBooksActions =
	| IAddBookAction
	| IRemoveBookAction
	| ILoadBooksAction;
