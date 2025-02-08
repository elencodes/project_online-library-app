import { IBook } from "../../types/booksTypes";
import styles from "./BookCard.module.scss";
import poster from "../../assets/images/promo.svg";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import FavouritesButton from "../Buttons/FavouritesButton/FavouritesButton";

// Определяем пропсы: компонент ожидает объект book типа IBook
interface BookCardProps {
	book: IBook;
	onHover: () => void;
	onLeave: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onHover, onLeave }) => {
	// Достаем нужные данные из объекта book
	const { imageLinks, title, authors } = book.volumeInfo;
	const imageUrl = imageLinks?.thumbnail || poster;

	// Функция для обрезки длинных строк
	const truncateText = (text: string, maxLength: number) => {
		return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
	};

	return (
		<>
			<div
				className={styles.card}
				onMouseEnter={onHover}
				onMouseLeave={onLeave}
			>
				<div className={styles.image__box}>
					<img className={styles.image} src={imageUrl} alt="poster" />
				</div>
				<div className={styles.content}>
					<h1 className={styles.title}>{truncateText(title, 13)}</h1>
					<h2 className={styles.subtitle}>
						{truncateText(authors?.join(", ") || "Unknown Author", 20)}
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
