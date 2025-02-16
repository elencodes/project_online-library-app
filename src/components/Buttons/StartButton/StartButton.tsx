import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./StartButton.module.scss";

interface IStartLinkProps {
	text: string;
}

const StartButton: React.FC<IStartLinkProps> = ({ text }) => {
	const [isPulsing, setIsPulsing] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsPulsing(true);
		}, 4000); // Запускаем через 4 секунды

		return () => clearTimeout(timer); // Очистка таймера при размонтировании
	}, []);

	return (
		<>
			<Link
				className={`${styles.button} ${isPulsing ? styles.pulse : ""}`}
				to="/library"
			>
				<p className={styles.button__text}>{text}</p>
			</Link>
		</>
	);
};

export default StartButton;
