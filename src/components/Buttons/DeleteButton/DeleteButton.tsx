import { useState } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import deleteIcon from "../../../assets/icons/buttons/delete.svg";
import deleteActiveIcon from "../../../assets/icons/buttons/delete-active.svg";
import styles from "./DeleteButton.module.scss";
import { deleteTopBooksAction } from "../../../store/actionCreators/topBooksActionCreators";
import { deleteBookFromSearchAction } from "../../../store/actionCreators/searchBooksActionCreators";

const DeleteButton = ({ id }: { id: string }) => {
	const dispatch = useTypedDispatch();
	const [isHovered, setHovered] = useState(false); // Состояние hover

	const handleDelete = () => {
		dispatch(deleteTopBooksAction(id)); // Удаление из топа-книг
		dispatch(deleteBookFromSearchAction(id)); // Удаление найденной книги из поиск
	};

	return (
		<>
			<button
				className={styles.button__delete}
				onClick={handleDelete}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<img
					className={styles.button__delete_icon}
					src={isHovered ? deleteActiveIcon : deleteIcon}
					alt="delete"
				/>
			</button>
		</>
	);
};

export default DeleteButton;
