import { useState } from "react";
import styles from "./FavouritesButton.module.scss";

const FavouritesButton = () => {
	const [isFavourite, setIsFavourite] = useState(false);
	const [disableHover, setDisableHover] = useState(false); // Отключаем `hover` временно

	const toggleFavourite = () => {
		setIsFavourite((prev) => !prev);

		// Если лайк убрали — отключаем `hover` на 1000 мс
		if (isFavourite) {
			setDisableHover(true);
			setTimeout(() => setDisableHover(false), 1000);
		}
	};

	return (
		<button
			key={isFavourite ? "liked" : "unliked"}
			className={`${styles.button__favourites} ${
				isFavourite ? styles.active : styles.inactive
			} ${disableHover ? styles.noHover : ""}`}
			onClick={toggleFavourite}
		>
			<span className={styles.heart}></span>
		</button>
	);
};

export default FavouritesButton;
