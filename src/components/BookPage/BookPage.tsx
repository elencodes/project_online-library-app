import { IBook } from "../../types/booksTypes";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { MAX_LENGTH } from "../../utils/constants";
import GoBackButton from "../Buttons/GoBackButton/GoBackButton";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import FavouritesButton from "../Buttons/FavouritesButton/FavouritesButton";
import poster from "../../assets/images/promo.svg";
import styles from "./BookPage.module.scss";

const BookPage: React.FC = () => {
	// Получаем id книги из URL
	const { id } = useParams();
	// Достаем из хранилища Redux список книг
	const topBooksState = useTypedSelector((state) => state.topBooks);
	const searchBooksState = useTypedSelector((state) => state.searchResults);

	// Состояние для переключения показа полного текста
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	// Ищем книгу по id
	const book =
		topBooksState.topBooks?.find((book: IBook) => book.id === id) ||
		searchBooksState.searchResults?.find((book) => book.id === id);

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
			<div className="container">
				<section className={styles.section}>
					<GoBackButton text={"Back to Library"} />
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
							<DeleteButton />
							<FavouritesButton id={book.id} />
						</div>
						<div className={styles.description__box}>
							<h4 className={styles.description__title}>About book</h4>
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
				</section>
			</div>
		</>
	);
};

export default BookPage;
