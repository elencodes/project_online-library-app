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
			// Если книга уже в избранном, ничего не меняем
			if (state.favourites.some((book) => book.id === action.payload.id)) {
				return state;
			}

			const updatedFavourites = [...state.favourites, action.payload];

			// Сохраняем в localStorage
			localStorage.setItem(
				"favouritesData",
				JSON.stringify(updatedFavourites)
			);

			return {
				...state,
				favourites: [...state.favourites, action.payload],
			};
		}

		case FavouritesActionTypes.REMOVE_FROM_FAVOURITES: {
			const filteredFavourites = state.favourites.filter(
				(book) => book.id !== action.payload
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
