import {
	FavouritesActionTypes,
	IFavouritesState,
	FavouritesActions,
} from "../../types/favouritesTypes";

const initialState: IFavouritesState = {
	// Загружаем избранное из localStorage или используем пустой массив
	favourites: JSON.parse(localStorage.getItem("favouritesData") || "[]"),
};

export const favouritesReducer = (
	state = initialState,
	action: FavouritesActions
): IFavouritesState => {
	switch (action.type) {
		case FavouritesActionTypes.ADD_TO_FAVOURITES: {
			if (state.favourites.includes(action.payload)) {
				return state; // Если id уже есть, ничего не делаем
			}

			const updatedFavourites = [...state.favourites, action.payload];
			// Обновляем localStorage
			localStorage.setItem(
				"favouritesData",
				JSON.stringify(updatedFavourites)
			);

			return {
				...state,
				favourites: updatedFavourites,
			};
		}

		case FavouritesActionTypes.REMOVE_FROM_FAVOURITES: {
			const filteredFavourites = state.favourites.filter(
				(favId) => favId !== action.payload
			);
			// Обновляем localStorage
			localStorage.setItem(
				"favouritesData",
				JSON.stringify(filteredFavourites)
			);

			return { ...state, favourites: filteredFavourites };
		}

		case FavouritesActionTypes.RESTORE_FAVOURITES: {
			return {
				...state,
				favourites: action.payload,
			};
		}

		default:
			return state;
	}
};
