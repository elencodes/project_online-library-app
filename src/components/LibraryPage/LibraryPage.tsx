import { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { handlePagesCounts } from "../../utils/handlePagesCount";
import SearchForm from "../SearchForm/SearchForm";
import FilterButton from "../Buttons/FilterButton/FilterButton";
import BookList from "../BookList/BookList";
import styles from "./LibraryPage.module.scss";

const LibraryPage = () => {
	// Состояние для текущей страницы
	const [currentPage, setCurrentPage] = useState(1);

	const [activeFilter, setActiveFilter] = useState<string>("All books");

	// Максимум 3 страницы (30 книг в API, по 10 на страницу)
	const pages: number[] = [];
	handlePagesCounts(pages, 3, currentPage);

	// Получаем общее количество найденных книг из состояния Redux
	const totalBooks = useTypedSelector((state) => state.topBooks.totalBooks);

	// Максимальное количество книг, которое возвращает API
	const maxResults = 30;

	return (
		<>
			<div className="container">
				<main>
					<div className={styles.search__container}>
						<h1 className={styles.title}>Library</h1>
						<SearchForm />
					</div>
					<div className={styles.filters__box}>
						<FilterButton
							text={"All books"}
							active={activeFilter === "All books"}
							onClick={() => setActiveFilter("All books")}
						/>
						<FilterButton
							text={"Favourites"}
							active={activeFilter === "Favourites"}
							onClick={() => setActiveFilter("Favourites")}
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
						<span className={styles.footer__counter}>{totalBooks}</span>
						<span className={styles.footer__note}>
							{`(Showing the first ${maxResults} results)`}
						</span>
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
		</>
	);
};

export default LibraryPage;
