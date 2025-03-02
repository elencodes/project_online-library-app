import styles from "./ClearButton.module.scss";

interface IClearButtonProps {
	onClick: () => void;
	isVisible: boolean;
}

const ClearButton: React.FC<IClearButtonProps> = ({ onClick, isVisible }) => {
	return (
		<>
			<button
				type="button"
				className={`${styles.clear__button} ${
					isVisible ? styles.visible : ""
				}`}
				onClick={onClick}
			>
				<span className={styles.clear__icon}></span>
			</button>
		</>
	);
};

export default ClearButton;
