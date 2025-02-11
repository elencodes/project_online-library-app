import styles from "./FilterButton.module.scss";

interface IFilterButtonProps {
	text: string;
	active: boolean;
	onClick: () => void;
}

const FilterButton: React.FC<IFilterButtonProps> = ({
	text,
	active,
	onClick,
}) => {
	return (
		<>
			<button
				className={`${styles.filter__button} ${
					active ? styles.active : ""
				}`}
				onClick={onClick}
			>
				<p className={styles.filter__button_text}>{text}</p>
			</button>
		</>
	);
};

export default FilterButton;
