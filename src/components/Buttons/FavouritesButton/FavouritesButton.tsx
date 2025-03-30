import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { RootState } from "../../../store/reducers";
import {
	addToFavouritesAction,
	removeFromFavouritesAction,
} from "../../../store/actionCreators/favouritesActionCreators";
import styles from "./FavouritesButton.module.scss";

interface IFavouritesButtonProps {
	id: string;
}

const FavouritesButton: React.FC<IFavouritesButtonProps> = ({ id }) => {
	const dispatch = useTypedDispatch();
	const favourites = useTypedSelector(
		(state: RootState) => state.favourites.favourites
	);

	// Проверяем, есть ли книга в избранном
	const isFavourite = favourites.some((favId) => favId=== id);

	const handleClick = () => {
		if (isFavourite) {
			dispatch(removeFromFavouritesAction(id));
		} else {
			dispatch(addToFavouritesAction(id));
		}
	};

	return (
		<button
			key={isFavourite ? "liked" : "unliked"}
			className={`${styles.button__favourites} ${
				isFavourite ? styles.active : styles.inactive
			}`}
			onClick={handleClick}
		>
			<span className={styles.heart}></span>
		</button>
	);
};

export default FavouritesButton;
