import { IBook } from "../../types/booksTypes";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchBook } from "../../utils/api";
import { MAX_LENGTH } from "../../utils/constants";
import { mapAddedBookToIBook } from "../../utils/mapAddedBookToIBook";
import GoBackButton from "../Buttons/GoBackButton/GoBackButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import FavouritesButton from "../Buttons/FavouritesButton/FavouritesButton";
import SkeletonBookPage from "../Skeletons/SkeletonBookPage/SkeletonBookPage";
import poster from "../../assets/images/promo.svg";
import styles from "./BookPage.module.scss";

const BookPage: React.FC = () => {
	// Получаем функцию dispatch для отправки экшенов в Redux
	const dispatch = useTypedDispatch();
	// Получаем id книги из URL
	const { id } = useParams<{ id: string }>();
	// Достаем из хранилища Redux список книг
	const { topBooks, isTopBooksLoading } = useTypedSelector(
		(state) => state.topBooks
	);
	const { searchResults, isSearchResultsLoading } = useTypedSelector(
		(state) => state.searchResults
	);
	const { book: singleBook, isLoading: isSingleBookLoading } =
		useTypedSelector((state) => state.singleBook);

	const addedBooks = useTypedSelector((state) => state.addedBooks);

	// Проверяем, загружаются ли книги
	const isLoading =
		isTopBooksLoading || isSearchResultsLoading || isSingleBookLoading;

	// Ищем книгу по id
	const book: IBook | undefined =
		topBooks?.find((book: IBook) => book.id === id) ||
		searchResults?.find((book) => book.id === id) ||
		(addedBooks.addedBooks.find((addedBook) => addedBook.id === id) &&
			mapAddedBookToIBook(
				addedBooks.addedBooks.find((addedBook) => addedBook.id === id)!
			)) ||
		singleBook;

	// Если книга не найдена в локальном Redux-хранилище, загружаем её по `id`
	useEffect(() => {
		if (book?.id) {
			dispatch(fetchBook(book.id));
		}
	}, [book?.id, dispatch]);

	// Состояние для переключения показа полного текста
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	// Если книга не найдена
	if (!book) {
		return <p>Book not found</p>;
	}

	// Достаем нужные данные из объекта book
	const { imageLinks, title, authors, categories, description } =
		book.volumeInfo;
	const imageUrl = imageLinks?.thumbnail
		? `https://images.weserv.nl/?url=${encodeURIComponent(
				imageLinks.thumbnail
		  )}`
		: poster;

	// Функция переключения
	const toggleDescription = () => {
		setIsExpanded((prev) => !prev);
	};

	// Обрезка текста, если он длиннее MAX_LENGTH
	const shouldTruncate = description && description.length > MAX_LENGTH;
	const displayedText =
		isExpanded || !shouldTruncate
			? description
			: description.slice(0, MAX_LENGTH) + "...";

	return (
		<>
			<div className="page__background">
				<div className="container">
					<section className={styles.section}>
						<GoBackButton text={"Back to Library"} />
						{isLoading && <SkeletonBookPage />}
						{!isLoading && (
							<div className={styles.content}>
								<div className={styles.image__box}>
									<img
										className={styles.image}
										src={imageUrl}
										alt="poster"
									/>
								</div>
								<h1 className={styles.title}>{title}</h1>
								<h2 className={styles.subtitle}>
									{authors?.join(", ") || "Unknown Author"}
								</h2>
								<h3 className={styles.genres}>
									{categories?.join(", ") || "No Genre"}
								</h3>
								<div className={styles.button__container}>
									<DeleteButton id={book.id} />
									<FavouritesButton book={book} />
								</div>
								<div className={styles.description__box}>
									<h4 className={styles.description__title}>
										About book
									</h4>
									<p className={styles.description}>
										{displayedText || "No description available."}
									</p>
									{shouldTruncate && (
										<button
											className={styles.description__toggle}
											onClick={toggleDescription}
										>
											{isExpanded ? "Hide description" : "Read More"}
										</button>
									)}
								</div>
							</div>
						)}
					</section>
				</div>
			</div>
		</>
	);
};

export default BookPage;
