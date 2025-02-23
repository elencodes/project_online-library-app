import { IBook } from "./booksTypes";

export interface IFavouritesState {
	favourites: IBook[];
}

export enum FavouritesActionTypes {
	ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES",
	REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES",
	RESTORE_FAVOURITES = "RESTORE_FAVOURITES",
	NO_ACTION = "NO_ACTION", // Для предотвращения повторного добавления книги
}

export interface IAddToFavouritesAction {
	type: FavouritesActionTypes.ADD_TO_FAVOURITES;
	payload: IBook;
}

export interface IRemoveFromFavouritesAction {
	type: FavouritesActionTypes.REMOVE_FROM_FAVOURITES;
	payload: string;
}

export interface IRestoreFavouritesAction {
	type: FavouritesActionTypes.RESTORE_FAVOURITES;
	payload: IBook[];
}

export interface INoAction {
	type: FavouritesActionTypes.NO_ACTION;
}

export type FavouritesActions =
	| IAddToFavouritesAction
	| IRemoveFromFavouritesAction
	| IRestoreFavouritesAction
	| INoAction;
