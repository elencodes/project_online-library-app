//взаимодействие со списком книг
import {
	IBookState,
	BookActions,
	BookActionTypes,
} from "../../types/booksTypes";

//иициализируем дефолтное состояние в bookReducer
const initialState: IBookState = {
	book: {
		//список книг
		id: "",
		volumeInfo: {
			title: "",
			authors: [],
			categories: [],
			pageCount: 0,
			description: "",
			imageLinks: {
				medium: "",
			},
		},
	},
	isLoading: false, //флаг загрузки
	bookError: null, //поле, которое будет содержать в себе сообщение об ошибке или null
};

export const bookReducer = (
	state = initialState,
	action: BookActions
): IBookState => {
	//создаем конструкцию switch case, которая в зависимости от типа action будет вызывать тот или иной кейс
	switch (action.type) {
		case BookActionTypes.FETCH_BOOK_DATA: {
			return { ...state, isLoading: true };
		}
		case BookActionTypes.FETCH_BOOK_SUCCESS: {
			return { ...state, book: action.payload };
		}
		case BookActionTypes.FETCH_BOOK_DATA_FINISHED: {
			return { ...state, isLoading: false };
		}
		case BookActionTypes.FETCH_BOOK_ERROR: {
			return { ...state, bookError: action.payload };
		}
		case BookActionTypes.RESET_BOOK_STATE: {
			return {
				...initialState,
				book: {
					...initialState.book,
				},
			};
		}
		default:
			return state;
	}
};
