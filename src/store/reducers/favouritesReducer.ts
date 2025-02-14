import {
	FavouritesActionTypes,
	IFavouritesState,
	FavouritesActions,
} from "../../types/favouritesTypes";

const initialState: IFavouritesState = {
	// Загружаем избранное из localStorage или используем пустой массив
	favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
};

export const favouritesReducer = (
	state = initialState,
	action: FavouritesActions
): IFavouritesState => {
	switch (action.type) {
		case FavouritesActionTypes.ADD_TO_FAVOURITES: {
			if (state.favourites.includes(action.payload)) {
				return state; // Если id уже есть, ничего не меняем
			}

			const updatedFavourites = [...state.favourites, action.payload];

			// Сохраняем в localStorage
			localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

			return {
				...state,
				favourites: [...state.favourites, action.payload],
			};
		}

		case FavouritesActionTypes.REMOVE_FROM_FAVOURITES: {
			const updatedFavourites = state.favourites.filter(
				(id) => id !== action.payload
			);

			// Обновляем localStorage
			localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

			return { ...state, favourites: updatedFavourites };
		}

		default:
			return state;
	}
};
