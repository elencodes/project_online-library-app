//взаимодействие с поиском книг
import {
	ISearchBookState,
	SearchBookActions,
	SearchBookActionTypes,
} from "../../types/searchBooksTypes";

//иициализируем дефолтное состояние в searchBookReducer
const initialState: ISearchBookState = {
	keyword: "",
	searchResults: [],
	isSearchResultsLoading: false,
	searchResultsCurrentPage: 1,
	searchResultsPagesCount: 0,
	searchBookError: null,
};

export const searchBooksReducer = (
	state = initialState,
	action: SearchBookActions
): ISearchBookState => {
	//создаем конструкцию switch case, которая в зависимости от типа action будет вызывать тот или иной кейс
	switch (action.type) {
		case SearchBookActionTypes.SEARCH_BOOK: {
			return {
				...state,
				isSearchResultsLoading: true,
				searchResults: initialState.searchResults,
			};
		}
		case SearchBookActionTypes.SEARCH_BOOK_SUCCESS: {
			return { ...state, searchResults: action.payload };
		}
		case SearchBookActionTypes.SEARCH_BOOK_FINISHED: {
			return { ...state, isSearchResultsLoading: false };
		}
		case SearchBookActionTypes.SET_SEARCH_BOOK_PAGE: {
			return { ...state, searchResultsCurrentPage: action.payload };
		}
		case SearchBookActionTypes.SET_SEARCH_KEYWORD: {
			return { ...state, keyword: action.payload };
		}
		case SearchBookActionTypes.SET_SEARCH_PAGES_COUNT: {
			return { ...state, searchResultsPagesCount: action.payload };
		}
		case SearchBookActionTypes.SEARCH_BOOK_ERROR: {
			return { ...state, searchBookError: action.payload };
		}

		default:
			return state;
	}
};
