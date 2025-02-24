import { useState, useEffect, useMemo } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchTopBooks } from "../../utils/api";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { restoreFavouritesAction } from "../../store/actionCreators/favouritesActionCreators";
import { IBook } from "../../types/booksTypes";
import BookCard from "../BookCard/BookCard";
import SkeletonCard from "../Skeletons/SkeletonCard/SkeletonCard";
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
	const { searchResults, isSearching, isSearchResultsLoading } =
		useTypedSelector((state) => state.searchResults);
	const favourites = useTypedSelector((state) => state.favourites.favourites);

	//Восстанавливаем избранные книги из localStorage при загрузке страницы
	useEffect(() => {
		dispatch(restoreFavouritesAction());
	}, [dispatch]);

	// Формируем общий список избранных книг
	const favouriteBooks = useMemo(() => {
		return favourites
			.map((favBook) => {
				// Ищем книгу сначала в топах, потом в поиске, потом в localStorage
				return (
					topBooks.find((book) => book.id === favBook.id) ||
					searchResults.find((book) => book.id === favBook.id) ||
					favBook // Если не нашли в топах и поиске, берем из localStorage
				);
			})
			.filter((book): book is IBook => Boolean(book));
	}, [favourites, topBooks, searchResults]);

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

	if (isTopBooksLoading || isSearchResultsLoading) {
		return (
			<>
				<div className={styles.list__container}>
					<ul className={styles.list}>
						{Array.from({ length: booksPerPage }).map((_, index) => (
							<li key={index} className={styles.list__item}>
								<SkeletonCard />
							</li>
						))}
					</ul>
				</div>
			</>
		);
	}

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
