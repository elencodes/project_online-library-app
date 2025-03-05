import { IBook } from "../../types/booksTypes";
import {
	AddedBooksActionTypes,
	IAddBookAction,
	IRemoveBookAction,
} from "../../types/addedBooksTypes";

export const addBookAction = (book: IBook): IAddBookAction => {
	return {
		type: AddedBooksActionTypes.ADD_BOOK,
		payload: book,
	};
};

export const removeBookAction = (id: string): IRemoveBookAction => {
	return {
		type: AddedBooksActionTypes.REMOVE_BOOK,
		payload: id,
	};
};
