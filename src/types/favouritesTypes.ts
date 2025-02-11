export interface IFavouritesState {
	favourites: string[];
}

export enum FavouritesActionTypes {
	ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES",
	REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES",
}

export interface IAddToFavouritesAction {
	type: FavouritesActionTypes.ADD_TO_FAVOURITES;
	payload: string;
}

export interface IRemoveFromFavouritesAction {
	type: FavouritesActionTypes.REMOVE_FROM_FAVOURITES;
	payload: string;
}

export type FavouritesActions =
	| IAddToFavouritesAction
	| IRemoveFromFavouritesAction;
