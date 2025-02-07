// Импортируем необходимые типы для работы с состоянием книги
import {
	IBookState, // Интерфейс, описывающий структуру состояния книги
	BookActions, // Тип всех возможных действий (actions), связанных с книгами
	BookActionTypes, // Перечисление (enum) всех возможных типов действий
} from "../../types/booksTypes";

// Инициализируем начальное состояние (initialState) для книги в bookReducer
const initialState: IBookState = {
	book: {
		// Объект, который содержит данные о книге
		id: "", // Уникальный идентификатор книги
		volumeInfo: {
			title: "", // Название книги
			authors: [], // Авторы книги (может быть массивом)
			categories: [], // Категории, к которым относится книга
			pageCount: 0, // Количество страниц
			description: "", // Описание книги
			imageLinks: {
				thumbnail: "", // Ссылка на изображение обложки книги
			},
		},
	},
	isLoading: false, // Флаг, указывающий, загружается ли книга в данный момент
	bookError: null, //поле, которое будет содержать в себе сообщение об ошибке или null
};

// Создаем сам редьюсер (функция, которая управляет изменением состояния в зависимости от переданного action)
export const bookReducer = (
	state = initialState, // Используем initialState как начальное значение
	action: BookActions // Ожидаем, что action, который обрабатывает редьюсер, будет одного из типов, указанных в BookActions
): IBookState => {
	//создаем конструкцию switch case, которая в зависимости от типа action будет вызывать тот или иной кейс
	switch (action.type) {
		// Данный action означает, что началась загрузка книги
		case BookActionTypes.FETCH_BOOK_DATA: {
			return {
				...state, // Копируем текущее состояние
				isLoading: true, // Включаем флаг загрузки
			};
		}
		// Данный action означает, что загрузка книги успешно завершена
		case BookActionTypes.FETCH_BOOK_SUCCESS: {
			return {
				...state, // Копируем текущее состояние
				book: action.payload,
			}; // Обновляем книгу, используя данные из action.payload
		}
		// Данный action означает, что загрузка книги завершена
		case BookActionTypes.FETCH_BOOK_DATA_FINISHED: {
			return {
				...state, // Копируем текущее состояние
				isLoading: false, // Выключаем флаг загрузки
			};
		}
		// Данный action означает, что произошла ошибка при загрузке книги
		case BookActionTypes.FETCH_BOOK_ERROR: {
			return {
				...state, // Копируем текущее состояние
				bookError: action.payload,
			}; // Сохраняем текст ошибки в bookError
		}
		// Данный action означает, что необходимо сбросить состояние книги к начальному
		case BookActionTypes.RESET_BOOK_STATE: {
			return {
				...initialState, // Заменяем состояние на начальное
				book: {
					...initialState.book, // Явно копируем объект book, чтобы избежать мутации состояния
				},
			};
		}
		default:
			return state; // Если переданный action не совпадает ни с одним из вышеуказанных типов, возвращаем текущее состояние без изменений
	}
};
