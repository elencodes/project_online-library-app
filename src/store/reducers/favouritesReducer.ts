import {
	FavouritesActionTypes,
	IFavouritesState,
	FavouritesActions,
} from "../../types/favouritesTypes";

const initialState: IFavouritesState = {
	favourites: [],
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
			return {
				...state,
				favourites: [...state.favourites, action.payload],
			};
		}

		case FavouritesActionTypes.REMOVE_FROM_FAVOURITES: {
			return {
				...state,
				favourites: state.favourites.filter((id) => id !== action.payload),
			};
		}

		default:
			return state;
	}
};
