import { useState, useEffect } from "react";
import styles from "./FavouritesButton.module.scss";

const FavouritesButton = () => {
	const [isFavourite, setIsFavourite] = useState(false);
	const [disableHover, setDisableHover] = useState(false); // Отключаем `hover` временно

	const toggleFavourite = () => {
		setIsFavourite((prev) => !prev);

		// Если лайк убрали — отключаем `hover` для FavouritesButton
		if (isFavourite) {
			setDisableHover(true);
			// Включаем hover снова через 0.5 сек
			setTimeout(() => setDisableHover(false), 500);
		}
	};

	useEffect(() => {
		// Отключаем hover на тач-устройствах
		const handleTouchStart = () => setDisableHover(true);
		window.addEventListener("touchstart", handleTouchStart);

		return () => window.removeEventListener("touchstart", handleTouchStart);
	}, []);

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
