import { IBook } from "../types/booksTypes";
import { IAddedBook } from "../types/addedBooksTypes";

export const mapAddedBookToIBook = (addedBook: IAddedBook): IBook => ({
	id: addedBook.id,
	volumeInfo: {
		title: addedBook.title,
		authors: addedBook.author,
		categories: addedBook.genre,
		description: addedBook.description,
		imageLinks: {
			thumbnail: addedBook.cover || "",
		},
	},
});
