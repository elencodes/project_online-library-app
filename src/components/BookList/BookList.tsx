import { useState, useEffect, useMemo } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchTopBooks } from "../../utils/api";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import BookCard from "../BookCard/BookCard";
import styles from "./BookList.module.scss";

interface BookListProps {
	currentPage: number;
	activeFilter: string;
}

const BookList: React.FC<BookListProps> = ({ currentPage, activeFilter }) => {
	// Получаем функцию dispatch для отправки экшенов в Redux
	const dispatch = useTypedDispatch();

	// Достаем из хранилища Redux список книг, статус загрузки и возможную ошибку
	const { topBooks, isTopBooksLoading, fetchTopBooksError } = useTypedSelector(
		(state) => state.topBooks
	);

	const { searchResults, isSearching } = useTypedSelector(
		(state) => state.searchResults
	);

	const favourites = useTypedSelector((state) => state.favourites.favourites);

	// Формируем общий список избранных книг
	const favouriteBooks = useMemo(() => {
		const allBooks = [...topBooks, ...searchResults]; // Объединяем топовые книги и результаты поиска
		const uniqueBooks = allBooks.reduce((acc, book) => {
			if (!acc.some((b) => b.id === book.id)) {
				acc.push(book);
			}
			return acc;
		}, [] as typeof allBooks);
		return uniqueBooks.filter((book) => favourites.includes(book.id)); // Фильтруем по id из избранного
	}, [topBooks, searchResults, favourites]);

	// Определяем, какие книги показывать
	let booksToShow = isSearching ? searchResults : topBooks;
	// Показываем весь список избранного, если фильтр активный
	if (activeFilter === "Favourites") {
		booksToShow = favouriteBooks;
	}

	// Состояние для хранения ID активной карточки
	const [activeCardId, setActiveCardId] = useState<string | null>(null);

	// Определяем, какие книги отображать на текущей странице
	const booksPerPage = 10;
	const startIndex = (currentPage - 1) * booksPerPage;
	const visibleBooks = booksToShow.slice(
		startIndex,
		startIndex + booksPerPage
	);

	// Загружаем список топовых книг при монтировании компонента
	useEffect(() => {
		if (activeFilter === "All books") {
			dispatch(fetchTopBooks(currentPage));
		}
	}, [dispatch, currentPage, activeFilter]); // Добавили зависимость currentPage

	if (isTopBooksLoading) return <p>Загрузка...</p>;
	if (fetchTopBooksError) return <p>{fetchTopBooksError}</p>;

	if (isSearching && searchResults.length === 0) {
		return (
			<div className={styles.notification__box}>
				<p className={styles.notification}>No books found</p>
				<p className={styles.notification__text}>Try another keyword 📚</p>
			</div>
		);
	}

	return (
		<>
			<div className={styles.list__container}>
				<ul className={styles.list}>
					{visibleBooks.map((book) => (
						<li
							key={book.id}
							className={`${styles.list__item} ${
								activeCardId && activeCardId !== book.id
									? styles.blurred
									: ""
							}`}
						>
							<BookCard
								key={book.id}
								book={book}
								onHover={() => setActiveCardId(book.id)}
								onLeave={() => setActiveCardId(null)}
							/>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default BookList;
