import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";
import { searchBooksReducer } from "./searchBooksReducer";
import { topBooksReducer } from "./topBooksReducer";
import { favouritesReducer } from "./favouritesReducer";
import { addedBooksReducer } from "./addedBooksReducer";

//Создаем корневой редьюсер (rootReducer) и вызываем функцию combineReducers (которая параметром принимает объект)
export const rootReducer = combineReducers({
	//Добавляем все редьюсеры, которые имеются в приложении в формате ключ: значение
	topBooks: topBooksReducer,
	singleBook: bookReducer,
	searchResults: searchBooksReducer,
	favourites: favouritesReducer,
	addedBooks: addedBooksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
