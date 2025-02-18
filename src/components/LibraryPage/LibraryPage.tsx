import { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { handlePagesCounts } from "../../utils/handlePagesCount";
import { calculatePagesCount } from "../../utils/calculatePagesCount";
import SearchForm from "../SearchForm/SearchForm";
import FilterButton from "../Buttons/FilterButton/FilterButton";
import BookList from "../BookList/BookList";
import styles from "./LibraryPage.module.scss";

const LibraryPage = () => {
	// Состояние для текущей страницы
	const [currentPage, setCurrentPage] = useState(1);

	// Состояние для активного фильтра (All books или Favourites)
	const [activeFilter, setActiveFilter] = useState<string>("All books");

	// Получаем данные из Redux
	const totalBooks = useTypedSelector((state) => state.topBooks.totalBooks);
	const favourites = useTypedSelector((state) => state.favourites.favourites);

	// Максимальное количество книг, которое возвращает API
	const maxResults = 30;
	const booksPerPage = 10;

	// Определяем общее количество книг для пагинации (в зависимости от фильтра)
	const totalItems =
		activeFilter === "Favourites" ? favourites.length : totalBooks;

	// Определяем максимальное  количество страниц
	const totalPages =
		activeFilter === "Favourites"
			? Math.ceil(totalItems / booksPerPage) // Пагинация для избранного
			: calculatePagesCount(totalItems, booksPerPage, 3); // Макс. 3 страницы для API

	// Создаем массив страниц для пагинации
	const pages: number[] = [];
	handlePagesCounts(pages, totalPages, currentPage);

	return (
		<>
			<div className="page__background">
				<div className="container">
					<main>
						<div className={styles.search__container}>
							<h1 className={styles.title}>Library</h1>
							<SearchForm activeFilter={activeFilter} />
						</div>
						<div className={styles.filters__box}>
							<FilterButton
								text={"All books"}
								active={activeFilter === "All books"}
								onClick={() => {
									setActiveFilter("All books");
									setCurrentPage(1); // Сбросить страницу
								}}
							/>
							<FilterButton
								text={"Favourites"}
								active={activeFilter === "Favourites"}
								onClick={() => {
									setTimeout(() => setActiveFilter("Favourites"), 100);
									setCurrentPage(1); // Сбросить страницу
								}}
							/>
						</div>
						<h2 className={styles.subtitle}>Book List</h2>
						<BookList
							currentPage={currentPage}
							activeFilter={activeFilter}
						/>
					</main>
					<footer className={styles.footer}>
						<div className={styles.footer__text}>
							<span className={styles.footer__text_total}>
								Total books:{" "}
							</span>
							{activeFilter === "Favourites" ? (
								<>
									<span className={styles.footer__counter}>
										{favourites.length}
									</span>
								</>
							) : (
								<>
									<span className={styles.footer__counter}>
										{totalBooks}
									</span>
									<span className={styles.footer__note}>
										{`(Showing the first ${maxResults} results)`}
									</span>
								</>
							)}
						</div>
						<ul className={styles.pagination__list}>
							{pages.map((page) => (
								<li key={page} className={styles.list__item}>
									<button
										className={`${styles.item__link_page} ${
											currentPage === page ? styles.active : ""
										}`}
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</button>
								</li>
							))}
						</ul>
					</footer>
				</div>
			</div>
		</>
	);
};

export default LibraryPage;
