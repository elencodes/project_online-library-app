import {
	FavouritesActionTypes,
	IAddToFavouritesAction,
	IRemoveFromFavouritesAction,
	IRestoreFavouritesAction,
	INoAction,
} from "../../types/favouritesTypes";
import { IBook } from "../../types/booksTypes";

// Экшн для добавления книги в избранное (сохранение не только ID, но и данных книги)
export const addToFavouritesAction = (
	book: IBook
): IAddToFavouritesAction | INoAction => {
	// Получаем текущие избранные книги из localStorage
	const favouritesData: IBook[] = JSON.parse(
		localStorage.getItem("favouritesData") || "[]"
	);

	// Проверяем, нет ли уже книги в избранном
	const isAlreadyInFavourites = favouritesData.some(
		(favBook) => favBook.id === book.id
	);
	if (isAlreadyInFavourites) return { type: FavouritesActionTypes.NO_ACTION };

	// Обновляем localStorage
	const updatedFavourites = [...favouritesData, book];
	localStorage.setItem("favouritesData", JSON.stringify(updatedFavourites));

	return {
		type: FavouritesActionTypes.ADD_TO_FAVOURITES,
		payload: book,
	};
};

// Экшн для удаления книги из избранного
export const removeFromFavouritesAction = (
	id: string
): IRemoveFromFavouritesAction => {
	// Получаем избранные книги из localStorage
	const favouritesData: IBook[] = JSON.parse(
		localStorage.getItem("favouritesData") || "[]"
	);

	// Фильтруем книги и обновляем localStorage
	const updatedFavourites = favouritesData.filter((book) => book.id !== id);
	localStorage.setItem("favouritesData", JSON.stringify(updatedFavourites));

	return {
		type: FavouritesActionTypes.REMOVE_FROM_FAVOURITES,
		payload: id,
	};
};

// Экшн для восстановления избранного при загрузке страницы
export const restoreFavouritesAction = (): IRestoreFavouritesAction => {
	const storedFavourites: IBook[] = JSON.parse(
		localStorage.getItem("favouritesData") || "[]"
	);

	return {
		type: FavouritesActionTypes.RESTORE_FAVOURITES,
		payload: storedFavourites,
	};
};
