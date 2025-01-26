import styles from "./FilterButton.module.scss";

interface IFilterButtonProps {
	text: string;
}

const FilterButton: React.FC<IFilterButtonProps> = ({ text }) => {
	return (
		<>
			<button className={styles.filter__button}>
				<p className={styles.filter__button_text}>{text}</p>
			</button>
		</>
	);
};

export default FilterButton;
