import { useState, useEffect } from "react";
import logo from "../../assets/icons/navigation/logo-icon.svg";
import StartButton from "../Buttons/StartButton/StartButton";
import styles from "./StartPage.module.scss";

const StartPage = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
		return () => setIsVisible(false); // Скрытие при размонтировании
	}, []);

	return (
		<>
			<div
				className={`${styles.about__container} ${
					isVisible ? styles.show : styles.hide
				}`}
			>
				<div className="container">
					<section>
						<img className={styles.logo} src={logo} alt="logo" />
						<div className={styles.content}>
							<h1 className={styles.title}>Get Started!</h1>
							<h2 className={styles.subtitle}>
								Join us now and start Your journey.
							</h2>
						</div>
						<StartButton text={"Open a Library"} />
					</section>
				</div>
			</div>
		</>
	);
};

export default StartPage;
