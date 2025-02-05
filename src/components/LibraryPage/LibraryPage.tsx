import { SearchForm } from "../SearchForm/SearchForm";
import styles from "./LibraryPage.module.scss";
import BookList from "../BookList/BookList";
import FilterButton from "../Buttons/FilterButton/FilterButton";

const LibraryPage = () => {
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
					<BookList />
				</main>
				<footer className={styles.footer}>
					<div className={styles.footer__text}>
						<span className={styles.footer__text_total}>
							Total books:{" "}
						</span>
						<span className={styles.footer__counter}>1</span>
					</div>
					<ul className={styles.pagination__list}>
						<li className={styles.list__item}>
							<a className={styles.item__link_page} href="#">
								1
							</a>
						</li>
						<li className={styles.list__item}>
							<a className={styles.item__link_page} href="#">
								2
							</a>
						</li>
						<li className={styles.list__item}>
							<a className={styles.item__link_page} href="#">
								3
							</a>
						</li>
					</ul>
				</footer>
			</div>
		</>
	);
};

export default LibraryPage;
