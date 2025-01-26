import { useState } from "react";
import styles from "./FavouritesButton.module.scss";

const FavouritesButton = () => {
	const [isFavourite, setIsFavourite] = useState(false);

	const toggleFavourite = () => {
		setIsFavourite((prev) => !prev);
	};

	return (
		<button
			className={`${styles.button__favourites} ${
				isFavourite ? styles.active : ""
			}`}
			onClick={toggleFavourite}
		>
			<span
				className={`${styles.heart} ${isFavourite ? styles.active : ""}`}
			></span>
		</button>
	);
};

export default FavouritesButton;
