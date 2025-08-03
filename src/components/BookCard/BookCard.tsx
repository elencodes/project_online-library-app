import { IBook } from "../../types/booksTypes";
import { IAddedBook } from "../../types/addedBooksTypes";
import { useNavigate } from "react-router-dom";
import styles from "./BookCard.module.scss";
import poster from "../../assets/images/promo.png";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import FavouritesButton from "../Buttons/FavouritesButton/FavouritesButton";

// Определяем пропсы: компонент ожидает объект book типа IBook
interface IBookCardProps {
	book: IBook | IAddedBook;
	onHover: () => void;
	onLeave: () => void;
}

const BookCard: React.FC<IBookCardProps> = ({ book, onHover, onLeave }) => {
	// Хук для навигации
	const navigate = useNavigate();

	// Проверяем, была ли книга добавлена вручную (у нее нет volumeInfo)
	const isCustomBook = !("volumeInfo" in book);

	// Явная аннотация типов
	const customBook = book as IAddedBook;
	const googleBook = book as IBook;

	// Если книга загружена из Google Books API, берем данные из volumeInfo
	const title = isCustomBook
		? customBook.title
		: googleBook.volumeInfo?.title || "Unknown title";
	const authors = isCustomBook
		? customBook.author
		: googleBook.volumeInfo?.authors || ["Unknown Author"];
	const cover = isCustomBook
		? customBook.cover
		: googleBook.volumeInfo?.imageLinks?.thumbnail;

	const imageUrl = cover
		? cover.startsWith("data:image")
			? cover // Если base64, используем как есть
			: `https://images.weserv.nl/?url=${encodeURIComponent(cover)}`
		: poster;

	// Функция для обрезки длинных строк
	const truncateText = (text: string, maxLength: number) => {
		return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
	};

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		// Проверяем, был ли клик по кнопке (чтобы не переходить на страницу книги)
		const isButtonClick = (event.target as HTMLElement).closest("button");
		if (isButtonClick) return;

		navigate(`/book/${book.id}`); // Переход на страницу книги
	};

	return (
		<>
			<div
				className={styles.card}
				onMouseEnter={onHover}
				onMouseLeave={onLeave}
				onClick={handleClick}
			>
				<div className={styles.image__box}>
					<img className={styles.image} src={imageUrl} alt="poster" />
				</div>
				<div className={styles.content}>
					<h1 className={styles.title}>{truncateText(title, 13)}</h1>
					<h2 className={styles.subtitle}>
						{truncateText(
							Array.isArray(authors) ? authors.join(", ") : authors,
							13
						)}
					</h2>
				</div>
				<div className={styles.button__container}>
					<DeleteButton id={book.id} />
					<FavouritesButton id={book.id} />
				</div>
			</div>
		</>
	);
};

export default BookCard;
