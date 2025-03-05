import {
	AddedBooksActionTypes,
	IAddedBookState,
	AddedBooksActions,
} from "../../types/addedBooksTypes";

const initialState: IAddedBookState = {
	addedBooks: [],
};

export const addedBooksReducer = (
	state = initialState,
	action: AddedBooksActions
): IAddedBookState => {
	switch (action.type) {
		case AddedBooksActionTypes.ADD_BOOK:
			return {
				...state,
				addedBooks: [...state.addedBooks, action.payload],
			};

		case AddedBooksActionTypes.REMOVE_BOOK: {
			return {
				...state,
				addedBooks: state.addedBooks.filter(
					(book) => book.id !== action.payload
				),
			};
		}

		default:
			return state;
	}
};
