import { Link } from "react-router-dom";
import styles from "./GoBackButton.module.scss";

interface IGoBackLinkProps {
	text: string;
}

const GoBackButton: React.FC<IGoBackLinkProps> = ({ text }) => {
	return (
		<>
			<Link className={styles.go_back__button} to="/">
				<p className={styles.button__text}>{text}</p>
			</Link>
		</>
	);
};

export default GoBackButton;
