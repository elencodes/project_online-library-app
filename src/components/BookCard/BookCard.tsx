import poster from "../../assets/images/promo.svg";
import deleteIcon from "../../assets/icons/buttons/delete.svg";
import favouritesIcon from "../../assets/icons/buttons/favourite.svg";
import styles from "./BookCard.module.scss";

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
					<button className={styles.button__delete}>
						<img
							className={styles.button__delete_icon}
							src={deleteIcon}
							alt="delete"
						/>
					</button>
					<button className={styles.button__favourites}>
						<img
							className={styles.button__favourites_icon}
							src={favouritesIcon}
							alt="favourites"
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default BookCard;
