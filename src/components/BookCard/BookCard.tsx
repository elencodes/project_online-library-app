import { IBook } from "../../types/booksTypes";
import { useNavigate } from "react-router-dom";
import styles from "./BookCard.module.scss";
import poster from "../../assets/images/promo.svg";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import FavouritesButton from "../Buttons/FavouritesButton/FavouritesButton";

// Определяем пропсы: компонент ожидает объект book типа IBook
interface IBookCardProps {
	book: IBook;
	onHover: () => void;
	onLeave: () => void;
}

const BookCard: React.FC<IBookCardProps> = ({ book, onHover, onLeave }) => {
	// Хук для навигации
	const navigate = useNavigate();

	// Достаем нужные данные из объекта book
	const { imageLinks, title, authors } = book.volumeInfo;
	const imageUrl = imageLinks?.thumbnail || poster;

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
						{truncateText(authors?.join(", ") || "Unknown Author", 13)}
					</h2>
				</div>
				<div className={styles.button__container}>
					<DeleteButton />
					<FavouritesButton />
				</div>
			</div>
		</>
	);
};

export default BookCard;
