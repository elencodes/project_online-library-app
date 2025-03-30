import {
	FavouritesActionTypes,
	IAddToFavouritesAction,
	IRemoveFromFavouritesAction,
	IRestoreFavouritesAction,
	INoAction,
} from "../../types/favouritesTypes";

// Экшн для добавления книги в избранное (сохранение не только ID, но и данных книги)
export const addToFavouritesAction = (
	id: string
): IAddToFavouritesAction | INoAction => {
	// Получаем текущие избранные книги из localStorage
	const favouritesData: string[] = JSON.parse(
		localStorage.getItem("favouritesData") || "[]"
	);

	// Проверяем, нет ли уже ID в избранном
	if (favouritesData.includes(id))
		return { type: FavouritesActionTypes.NO_ACTION };

	// Обновляем localStorage
	const updatedFavourites = [...favouritesData, id];
	localStorage.setItem("favouritesData", JSON.stringify(updatedFavourites));

	return {
		type: FavouritesActionTypes.ADD_TO_FAVOURITES,
		payload: id,
	};
};

// Экшн для удаления книги из избранного
export const removeFromFavouritesAction = (
	id: string
): IRemoveFromFavouritesAction => {
	// Получаем избранные книги из localStorage
	const favouritesData: string[] = JSON.parse(
		localStorage.getItem("favouritesData") || "[]"
	);

	// Фильтруем книги и обновляем localStorage
	const updatedFavourites = favouritesData.filter((favId) => favId !== id);
	localStorage.setItem("favouritesData", JSON.stringify(updatedFavourites));

	return {
		type: FavouritesActionTypes.REMOVE_FROM_FAVOURITES,
		payload: id,
	};
};

// Экшн для восстановления избранного при загрузке страницы
export const restoreFavouritesAction = (): IRestoreFavouritesAction => {
	const storedFavourites: string[] = JSON.parse(
		localStorage.getItem("favouritesData") || "[]"
	);

	return {
		type: FavouritesActionTypes.RESTORE_FAVOURITES,
		payload: storedFavourites,
	};
};
