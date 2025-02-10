import { useState } from "react";
import styles from "./FavouritesButton.module.scss";

const FavouritesButton = () => {
	const [isFavourite, setIsFavourite] = useState(false);

	const toggleFavourite = () => {
		setIsFavourite((prev) => !prev);
	};

	return (
		<button
			key={isFavourite ? "liked" : "unliked"}
			className={`${styles.button__favourites} ${
				isFavourite ? styles.active : styles.inactive
			}`}
			onClick={toggleFavourite}
		>
			<span className={styles.heart}></span>
		</button>
	);
};

export default FavouritesButton;
