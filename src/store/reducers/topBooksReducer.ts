import {
	ITopBookState,
	TopBooksActionTypes,
	TopBookActions,
} from "../../types/topBooksTypes";

const initialState: ITopBookState = {
	topBooks: [],
	isTopBooksLoading: false,
	currentPage: 1,
	pagesCount: 5,
	fetchTopBooksError: null,
};

export const topBooksReducer = (
	state = initialState,
	action: TopBookActions
): ITopBookState => {
	switch (action.type) {
		case TopBooksActionTypes.FETCH_TOP_BOOKS_DATA: {
			return { ...state, isTopBooksLoading: true };
		}
		case TopBooksActionTypes.FETCH_TOP_BOOKS_SUCCESS: {
			return { ...state, topBooks: action.payload };
		}
		case TopBooksActionTypes.FETCH_TOP_BOOKS_FINISHED: {
			return { ...state, isTopBooksLoading: false };
		}
		case TopBooksActionTypes.SET_TOP_BOOK_PAGE: {
			return { ...state, currentPage: action.payload };
		}
		case TopBooksActionTypes.FETCH_TOP_BOOKS_ERROR: {
			return { ...state, fetchTopBooksError: action.payload };
		}

		default:
			return state;
	}
};
