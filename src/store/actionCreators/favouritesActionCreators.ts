import {
	FavouritesActionTypes,
	IAddToFavouritesAction,
	IRemoveFromFavouritesAction,
} from "../../types/favouritesTypes";

// Экшн для добавления карточки книги в избранное
export const addToFavouritesAction = (id: string): IAddToFavouritesAction => {
	return {
		type: FavouritesActionTypes.ADD_TO_FAVOURITES,
		payload: id,
	};
};

// Экшн для удаления карточки книги из избранного
export const removeFromFavouritesAction = (
	id: string
): IRemoveFromFavouritesAction => {
	return {
		type: FavouritesActionTypes.REMOVE_FROM_FAVOURITES,
		payload: id,
	};
};
