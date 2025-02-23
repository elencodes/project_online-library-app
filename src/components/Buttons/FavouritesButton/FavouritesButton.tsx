import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { RootState } from "../../../store/reducers";
import {
	addToFavouritesAction,
	removeFromFavouritesAction,
} from "../../../store/actionCreators/favouritesActionCreators";
import { IBook } from "../../../types/booksTypes";
import styles from "./FavouritesButton.module.scss";

interface IFavouritesButtonProps {
	book: IBook;
}

const FavouritesButton: React.FC<IFavouritesButtonProps> = ({ book }) => {
	const dispatch = useTypedDispatch();
	const favourites = useTypedSelector(
		(state: RootState) => state.favourites.favourites
	);

	// Проверяем, есть ли книга в избранном
	const isFavourite = favourites.some((favBook) => favBook.id === book.id);

	const handleClick = () => {
		if (isFavourite) {
			dispatch(removeFromFavouritesAction(book.id));
		} else {
			dispatch(addToFavouritesAction(book));
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
