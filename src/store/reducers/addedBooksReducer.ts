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
		case AddedBooksActionTypes.ADD_BOOK: {
			console.log(
				"Reducer received ADD_BOOK action with payload:",
				action.payload
			);
			console.log("State before return:", state);
			const newState = {
				...state,
				addedBooks: [...state.addedBooks, action.payload],
			};

			console.log("State after return:", newState);
			return newState;
		}
		case AddedBooksActionTypes.LOAD_BOOKS:
			return {
				...state,
				addedBooks: action.payload, // Загружаем книги при старте
			};
		case AddedBooksActionTypes.REMOVE_BOOK:
			return {
				...state,
				addedBooks: state.addedBooks.filter(
					(book) => book.id !== action.payload
				),
			};
		default:
			return state;
	}
};
