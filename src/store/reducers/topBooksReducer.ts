// Импортируем интерфейсы и типы, которые описывают состояние и экшены для топ-книг
import {
	ITopBookState, // Описывает структуру состояния для топ-книг
	TopBooksActionTypes, // Перечисляет все возможные типы экшенов
	TopBookActions, // Описывает структуру экшенов
} from "../../types/topBooksTypes";

// Определяем начальное (дефолтное) состояние для topBooksReducer
const initialState: ITopBookState = {
	topBooks: [], // Массив с топ-книгами
	totalBooks: 0,
	isTopBooksLoading: false, // Флаг загрузки (true - идет загрузка, false - завершена)
	currentPage: 1, // Текущая страница списка топ-книг
	pagesCount: 5, // Общее количество страниц
	fetchTopBooksError: null, // Ошибка при загрузке топ-книг (если есть)
};

// topBooksReducer — это функция, которая управляет состоянием топ-книг
export const topBooksReducer = (
	state = initialState, // Если состояние не задано, используем initialState
	action: TopBookActions // Ожидаем, что action, который обрабатывает редьюсер, будет одного из типов, указанных в TopBookActions
): ITopBookState => {
	//создаем конструкцию switch case, которая в зависимости от типа action будет вызывать тот или иной кейс
	switch (action.type) {
		// Начало загрузки топ-книг
		case TopBooksActionTypes.FETCH_TOP_BOOKS_DATA: {
			return {
				...state, // Копируем текущее состояние
				isTopBooksLoading: true, // Включаем флаг загрузки
			};
		}
		// Успешное получение списка топ-книг
		case TopBooksActionTypes.FETCH_TOP_BOOKS_SUCCESS: {
			return {
				...state, // Копируем текущее состояние
				topBooks: action.payload.books, // Записываем список полученных книг
				totalBooks: action.payload.totalBooks, // Записываем количество книг
			};
		}
		// Завершение загрузки топ-книг
		case TopBooksActionTypes.FETCH_TOP_BOOKS_FINISHED: {
			return {
				...state, // Копируем текущее состояние
				isTopBooksLoading: false, // Включаем флаг загрузки
			};
		}
		// Установка текущей страницы списка топ-книг
		case TopBooksActionTypes.SET_TOP_BOOK_PAGE: {
			return {
				...state, // Копируем текущее состояние
				currentPage: action.payload, // Устанавливаем номер текущей страницы
			};
		}
		// Ошибка при загрузке топ-книг
		case TopBooksActionTypes.FETCH_TOP_BOOKS_ERROR: {
			return {
				...state, // Копируем текущее состояние
				fetchTopBooksError: action.payload, // Записываем ошибку
			};
		}
		case TopBooksActionTypes.CLEAR_TOP_BOOKS: {
			return {
				...state,
				topBooks: [],
				totalBooks: 0,
			};
		}

		// Если экшен не найден, возвращаем текущее состояние без изменений
		default:
			return state;
	}
};
