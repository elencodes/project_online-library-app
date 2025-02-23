import { useState, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { handlePagesCounts } from "../../utils/handlePagesCount";
import { calculatePagesCount } from "../../utils/calculatePagesCount";
import SearchForm from "../SearchForm/SearchForm";
import FilterButton from "../Buttons/FilterButton/FilterButton";
import BookList from "../BookList/BookList";
import styles from "./LibraryPage.module.scss";

const LibraryPage = () => {
	// Состояние для текущей страницы (нужно для пагинации)
	const [currentPage, setCurrentPage] = useState(1);

	// Состояние для активного фильтра (All books или Favourites)
	const [activeFilter, setActiveFilter] = useState<string>("All books");

	// Получаем данные из Redux store
	const totalBooks = useTypedSelector((state) => state.topBooks.totalBooks);
	const favourites = useTypedSelector((state) => state.favourites.favourites);
	const { searchResults, isSearching, isSearchResultsLoading } =
		useTypedSelector((state) => state.searchResults);

	// Константы для работы с пагинацией
	const maxResults = 30; // API ограничивает количество книг
	const booksPerPage = 10; // Количество книг на одной странице

	// Определяем, сколько всего книг доступно для пагинации (учитываем активный фильтр)
	const totalItems =
		activeFilter === "Favourites"
			? favourites.length // Если фильтр "Favourites", берем количество избранных книг
			: isSearching
			? searchResults.length // Если идет поиск, берем количество найденных книг
			: totalBooks; // В остальных случаях — общее количество книг

	// Определяем максимальное  количество страниц
	const totalPages =
		activeFilter === "Favourites"
			? Math.ceil(totalItems / booksPerPage) // Для избранных книг считаем страницы по 10 книг (пагинация)
			: calculatePagesCount(totalItems, booksPerPage, 3); // Макс. 3 страницы для API

	// Создаем массив страниц для пагинации
	const pages: number[] = [];
	handlePagesCounts(pages, totalPages, currentPage);

	// Эффект, который подписывается на кастомное событие "changeFilter"
	useEffect(() => {
		//Обработчик кастомного события "changeFilter"
		//Когда событие срабатывает, переключаем фильтр и сбрасываем пагинацию
		const handleChangeFilter = (e: CustomEvent<string>) => {
			setActiveFilter(e.detail); // Переключаем фильтр на "All books"
			setCurrentPage(1); // Сбрасываем текущую страницу на первую
		};

		// Подписываемся на кастомное событие
		window.addEventListener(
			"changeFilter",
			handleChangeFilter as EventListener
		);

		// При размонтировании компонента отписываемся от события
		return () => {
			window.removeEventListener(
				"changeFilter",
				handleChangeFilter as EventListener
			);
		};
	}, []);

	return (
		<>
			<div className="page__background">
				<div className="container">
					<main className={styles.main}>
						<div className={styles.search__container}>
							<h1 className={styles.title}>Library</h1>
							<SearchForm
								activeFilter={activeFilter}
								setActiveFilter={setActiveFilter}
							/>
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
						{activeFilter === "Favourites" && favourites.length === 0 ? (
							<div className={styles.notification__box}>
								<p className={styles.notification}>
									There is nothing in favorites
								</p>
								<p className={styles.notification__text}>
									Add books using ❤️
								</p>
							</div>
						) : activeFilter === "All books" &&
						  isSearching &&
						  !isSearchResultsLoading &&
						  searchResults.length === 0 ? (
							<div className={styles.notification__box}>
								<p className={styles.notification}>Nothing was found</p>
								<p className={styles.notification__text}>
									Try changing the request 📚
								</p>
							</div>
						) : (
							<BookList
								currentPage={currentPage}
								activeFilter={activeFilter}
							/>
						)}
					</main>
					<footer className={styles.footer}>
						<div className={styles.footer__text}>
							<span className={styles.footer__text_total}>
								Total books:{" "}
							</span>
							{activeFilter === "Favourites" ? (
								<span className={styles.footer__counter}>
									{favourites.length}
								</span>
							) : isSearching ? (
								<span className={styles.footer__counter}>
									{searchResults.length}
								</span>
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
