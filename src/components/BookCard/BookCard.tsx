import poster from "../../assets/images/promo.svg";
import styles from "./BookCard.module.scss";
import DeleteButton from "../Buttons/DeleteButton/DeleteButton";
import FavouritesButton from "../Buttons/FavouritesButton/FavouritesButton";

const BookCard = () => {
	return (
		<>
			<div className={styles.card}>
				<div className={styles.image__box}>
					<img className={styles.image} src={poster} alt="poster" />
				</div>
				<div className={styles.content}>
					<h1 className={styles.title}>Title</h1>
					<h2 className={styles.subtitle}>Author</h2>
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
