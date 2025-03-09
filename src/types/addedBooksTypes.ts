export interface IAddedBook {
	id: string;
	cover: File | null;
	title: string;
	author: string[];
	genre: string[];
	description: string;
}

export interface IAddedBookState {
	addedBooks: IAddedBook[];
}

export enum AddedBooksActionTypes {
	ADD_BOOK = "ADD_BOOK",
	REMOVE_BOOK = "REMOVE_BOOK",
}

export interface IAddBookAction {
	type: AddedBooksActionTypes.ADD_BOOK;
	payload: IAddedBook;
}

export interface IRemoveBookAction {
	type: AddedBooksActionTypes.REMOVE_BOOK;
	payload: string;
}

export type AddedBooksActions = IAddBookAction | IRemoveBookAction;
