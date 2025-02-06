// Импортируем необходимые типы для работы с состоянием поиска книги
import {
	ISearchBookState, // Описывает структуру состояния для поиска книг
	SearchBookActions, // Перечисляет все возможные экшены
	SearchBookActionTypes, // Константы с типами экшенов
} from "../../types/searchBooksTypes";

// Инициализируем начальное (дефолтное) состояние для searchBooksReducer
const initialState: ISearchBookState = {
	keyword: "", // Строка запроса, по которой ищем книги
	searchResults: [], // Массив с найденными книгами
	isSearchResultsLoading: false, // Флаг загрузки (true - идет загрузка, false - завершена)
	searchResultsCurrentPage: 1, // Текущая страница результатов поиска
	searchResultsPagesCount: 0, // Общее количество страниц с результатами
	searchBookError: null, // Ошибка поиска (если есть)
};

// Создаем сам редьюсер (функция, которая управляет изменением состояния поиска книг в зависимости от переданного action)
export const searchBooksReducer = (
	state = initialState, // Если состояние не задано, используем initialState
	action: SearchBookActions // Ожидаем, что action, который обрабатывает редьюсер, будет одного из типов, указанных в SearchBookActions
): ISearchBookState => {
	//Создаем конструкцию switch case, которая в зависимости от типа action будет вызывать тот или иной кейс
	switch (action.type) {
		// Начало поиска книг
		case SearchBookActionTypes.SEARCH_BOOK: {
			return {
				...state, // Копируем текущее состояние
				isSearchResultsLoading: true, // Включаем флаг загрузки
				searchResults: initialState.searchResults, // Очищаем предыдущие результаты
			};
		}
		// Успешный поиск книг
		case SearchBookActionTypes.SEARCH_BOOK_SUCCESS: {
			return {
				...state, // Копируем текущее состояние
				searchResults: action.payload, // Записываем найденные книги в состояние
			};
		}
		// Завершение загрузки результатов поиска
		case SearchBookActionTypes.SEARCH_BOOK_FINISHED: {
			return {
				...state, // Копируем текущее состояние
				isSearchResultsLoading: false, // Выключаем флаг загрузки
			};
		}
		// Установка текущей страницы поиска
		case SearchBookActionTypes.SET_SEARCH_BOOK_PAGE: {
			return {
				...state, // Копируем текущее состояние
				searchResultsCurrentPage: action.payload, // Устанавливаем номер текущей страницы
			};
		}
		// Установка поискового запроса (ключевого слова)
		case SearchBookActionTypes.SET_SEARCH_KEYWORD: {
			return {
				...state, // Копируем текущее состояние
				keyword: action.payload, // Записываем новое ключевое слово для поиска
			};
		}
		// Установка общего количества страниц результатов поиска
		case SearchBookActionTypes.SET_SEARCH_PAGES_COUNT: {
			return {
				...state, // Копируем текущее состояние
				searchResultsPagesCount: action.payload, // Устанавливаем количество страниц
			};
		}
		// Ошибка при поиске книг
		case SearchBookActionTypes.SEARCH_BOOK_ERROR: {
			return {
				...state, // Копируем текущее состояние
				searchBookError: action.payload, // Записываем ошибку поиска
			};
		}

		// Если экшен не найден, возвращаем текущее состояние без изменений
		default:
			return state;
	}
};
