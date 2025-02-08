import { useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import styles from "./LibraryPage.module.scss";
import BookList from "../BookList/BookList";
import FilterButton from "../Buttons/FilterButton/FilterButton";
import { handlePagesCounts } from "../../utils/handlePagesCount";

const LibraryPage = () => {
	// Состояние для текущей страницы
	const [currentPage, setCurrentPage] = useState(1);

	// Максимум 3 страницы (30 книг в API, по 10 на страницу)
	const pages: number[] = [];
	handlePagesCounts(pages, 3, currentPage);

	return (
		<>
			<div className="container">
				<main>
					<div className={styles.search__container}>
						<h1 className={styles.title}>Library</h1>
						<SearchForm />
					</div>
					<div className={styles.filters__box}>
						<FilterButton text={"All books"} />
						<FilterButton text={"Favourites"} />
						<FilterButton text={"Fantasy"} />
						<FilterButton text={"Classic"} />
					</div>
					<h2 className={styles.subtitle}>Book List</h2>
					<BookList currentPage={currentPage} />
				</main>
				<footer className={styles.footer}>
					<div className={styles.footer__text}>
						<span className={styles.footer__text_total}>
							Total books:{" "}
						</span>
						<span className={styles.footer__counter}>1</span>
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
