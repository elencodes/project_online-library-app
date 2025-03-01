import styles from "./SubmitButton.module.scss";

interface ISubmitButtonProps {
	text: string;
	isDisabled: boolean;
}

const SubmitButton: React.FC<ISubmitButtonProps> = ({ text, isDisabled }) => {
	return (
		<>
			<button className={styles.button} type="submit" disabled={isDisabled}>
				<p className={styles.button__text}>{text}</p>
			</button>
		</>
	);
};

export default SubmitButton;
