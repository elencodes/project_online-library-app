import { Link } from "react-router-dom";
import styles from "./StartButton.module.scss";

interface IStartLinkProps {
	text: string;
}

const StartButton: React.FC<IStartLinkProps> = ({ text }) => {
	return (
		<>
			<Link className={styles.button} to="/library">
				<p className={styles.button__text}>{text}</p>
			</Link>
		</>
	);
};

export default StartButton;
