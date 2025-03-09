import {
	IAddedBook,
	AddedBooksActionTypes,
	IAddBookAction,
	IRemoveBookAction,
} from "../../types/addedBooksTypes";

export const addBookAction = (book: IAddedBook): IAddBookAction => {
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
