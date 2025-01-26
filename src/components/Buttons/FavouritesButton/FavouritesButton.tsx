import favouritesIcon from "../../../assets/icons/buttons/favourite.svg";
import styles from "./FavouritesButton.module.scss";

const FavouritesButton = () => {
	return (
		<>
			<button className={styles.button__favourites}>
				<img
					className={styles.button__favourites_icon}
					src={favouritesIcon}
					alt="favourites"
				/>
			</button>
		</>
	);
};

export default FavouritesButton;
