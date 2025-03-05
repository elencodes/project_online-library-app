import { IBook } from "./booksTypes";

export interface IAddedBookState {
	addedBooks: IBook[];
}

export enum AddedBooksActionTypes {
	ADD_BOOK = "ADD_BOOK",
	REMOVE_BOOK = "REMOVE_BOOK",
}

export interface IAddBookAction {
	type: AddedBooksActionTypes.ADD_BOOK;
	payload: IBook;
}

export interface IRemoveBookAction {
	type: AddedBooksActionTypes.REMOVE_BOOK;
	payload: string;
}

export type AddedBooksActions = IAddBookAction | IRemoveBookAction;
