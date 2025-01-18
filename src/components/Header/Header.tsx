import { Link } from "react-router-dom";
import { Settings } from "../Settings/Settings";
import logo from "../../assets/icons/navigation/logo.svg";
import libraryIcon from "../../assets/icons/navigation/library.svg";
import addBookIcon from "../../assets/icons/navigation/book.svg";
import styles from "./Header.module.scss";

export function Header() {
	return (
		<>
			<header className={styles.header}>
				<div className="header__inner">
					<div className={styles.header__navigation_box}>
						<Link to="/" className={styles.header__navigation_logo}>
							<img
								className={styles.header__logo}
								src={logo}
								alt="logo"
							/>
						</Link>
						<nav className={styles.nav}>
							<Link className={styles.nav__button} to="/">
								<img
									className={styles.nav__icon}
									src={libraryIcon}
									alt="library"
								/>
								<p className={styles.nav__text}>Library</p>
							</Link>
							<Link className={styles.nav__button} to="/addbook">
								<img
									className={styles.nav__icon}
									src={addBookIcon}
									alt="addBook"
								/>
								<p className={styles.nav__text}>Add book</p>
							</Link>
						</nav>
						<Settings />
					</div>
				</div>
			</header>
		</>
	);
}
