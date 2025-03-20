import { IAddedBook } from "../types/addedBooksTypes";

const DB_NAME = "booksDB";
const STORE_NAME = "books";
const DB_VERSION = 1;

// Открываем базу данных
const openDB = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		// Создание хранилища при первом запуске
		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: "id" });
			}
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject("Error opening IndexedDB");
		};
	});
};

// Функция для сохранения книги
export const saveBookToIndexedDB = async (book: IAddedBook) => {
	const db = await openDB();
	const transaction = db.transaction(STORE_NAME, "readwrite");
	const store = transaction.objectStore(STORE_NAME);
	store.put(book);
};

// Функция для загрузки всех книг
export const getBooksFromIndexedDB = async (): Promise<IAddedBook[]> => {
	const db = await openDB();
	return new Promise((resolve) => {
		const transaction = db.transaction(STORE_NAME, "readonly");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.getAll();

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			resolve([]);
		};
	});
};

// Функция для удаления книги
export const deleteBookFromIndexedDB = async (id: string) => {
	const db = await openDB();
	const transaction = db.transaction(STORE_NAME, "readwrite");
	const store = transaction.objectStore(STORE_NAME);
	store.delete(id);
};
