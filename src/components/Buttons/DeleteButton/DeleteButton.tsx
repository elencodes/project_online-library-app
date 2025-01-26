import { useState } from "react";
import deleteIcon from "../../../assets/icons/buttons/delete.svg";
import deleteActiveIcon from "../../../assets/icons/buttons/delete-active.svg";
import styles from "./DeleteButton.module.scss";

const DeleteButton = () => {
	const [isHovered, setHovered] = useState(false); // Состояние hover

	return (
		<>
			<button
				className={styles.button__delete}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<img
					className={styles.button__delete_icon}
					src={isHovered === true ? deleteActiveIcon : deleteIcon}
					alt="delete"
				/>
			</button>
		</>
	);
};

export default DeleteButton;
