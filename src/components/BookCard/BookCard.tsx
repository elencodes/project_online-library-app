import { IBook } from "../../types/booksTypes";
import styles from "./BookCard.module.scss";
import poster from "../../assets/images/promo.svg";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import FavouritesButton from "../Buttons/FavouritesButton/FavouritesButton";

const BookCard: React.FC<{ book: IBook }> = ({ book }) => {
	const { imageLinks, title, authors } = book.volumeInfo;

	return (
		<>
			<div className={styles.card}>
				<div className={styles.image__box}>
					<img
						className={styles.image}
						src={imageLinks?.medium || poster}
						alt="poster"
					/>
				</div>
				<div className={styles.content}>
					<h1 className={styles.title}>{title}</h1>
					<h2 className={styles.subtitle}>
						{authors?.join(", ") || "Unknown Author"}
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
