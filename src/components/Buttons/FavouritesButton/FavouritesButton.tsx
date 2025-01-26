import { useState } from "react";
import favouritesIcon from "../../../assets/icons/buttons/favourite.svg";
import favouritesActiveIcon from "../../../assets/icons/buttons/favourite-active.svg";
import styles from "./FavouritesButton.module.scss";

const FavouritesButton = () => {
	const [isFavourite, setIsFavourite] = useState(false); //Состояние добавления в "избранное"
	const [isHovered, setIsHovered] = useState(false); //Состояние hover

	const toggleFavourite = () => {
		setIsFavourite((prev) => !prev);
	};

	return (
		<>
			<button
				className={styles.button__favourites}
				onClick={toggleFavourite}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				aria-label="Добавить в избранное"
			>
				<img
					className={`${styles.button__favourites_icon} ${styles.default}`}
					src={favouritesIcon}
					alt="favourites"
				/>
				<img
					className={`${styles.button__favourites_icon} ${styles.active} ${
						isFavourite || isHovered ? styles.visible : ""
					}`}
					src={
						isFavourite || isHovered
							? favouritesActiveIcon
							: favouritesIcon
					}
					alt="favourites"
				/>
			</button>
		</>
	);
};

export default FavouritesButton;
