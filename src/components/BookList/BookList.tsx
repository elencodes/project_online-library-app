import { useState, useEffect } from "react";
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

	let booksToShow = isSearching ? searchResults : topBooks;

	if (activeFilter === "Favourites") {
		booksToShow = booksToShow.filter((book) => favourites.includes(book.id));
	}

	// Состояние для хранения ID активной карточки
	const [activeCardId, setActiveCardId] = useState<string | null>(null);

	// Загружаем список топовых книг при монтировании компонента (передаем currentPage в API-запрос)
	useEffect(() => {
		dispatch(fetchTopBooks(currentPage));
	}, [dispatch, currentPage]); // Добавили зависимость currentPage

	// Определяем, какие книги отображать на текущей странице
	const booksPerPage = 10;
	const startIndex = (currentPage - 1) * booksPerPage;
	const visibleBooks = booksToShow.slice(
		startIndex,
		startIndex + booksPerPage
	);

	if (isTopBooksLoading) return <p>Загрузка...</p>;
	if (fetchTopBooksError) return <p>{fetchTopBooksError}</p>;

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
