import { useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "../Settings/Settings";
import logo from "../../assets/icons/navigation/logo.svg";
import libraryIcon from "../../assets/icons/navigation/library.svg";
import libraryActiveIcon from "../../assets/icons/navigation/library-active.svg";
import addBookIcon from "../../assets/icons/navigation/book.svg";
import addBookActiveIcon from "../../assets/icons/navigation/book-active.svg";
import styles from "./Header.module.scss";

export function Header() {
	const [isHoveredLibraryButton, setHoveredLibraryButton] = useState(false); // Состояние hover
	const [isHoveredBookButton, setHoveredBookButton] = useState(false); // Состояние hover

	return (
		<>
			<header className={styles.header}>
				<div className="header__inner">
					<div className={styles.header__navigation_box}>
						<Link
							to="/library"
							className={styles.header__navigation_logo}
						>
							<img
								className={styles.header__logo}
								src={logo}
								alt="logo"
							/>
						</Link>
						<nav className={styles.nav}>
							<Link
								className={styles.nav__button}
								to="/library"
								onMouseEnter={() => setHoveredLibraryButton(true)}
								onMouseLeave={() => setHoveredLibraryButton(false)}
							>
								<img
									className={styles.nav__icon}
									src={
										isHoveredLibraryButton
											? libraryActiveIcon
											: libraryIcon
									}
									alt="library"
								/>
								<p className={styles.nav__text}>Library</p>
							</Link>
							<Link
								className={styles.nav__button}
								to="/addbook"
								onMouseEnter={() => setHoveredBookButton(true)}
								onMouseLeave={() => setHoveredBookButton(false)}
							>
								<img
									className={styles.nav__icon}
									src={
										isHoveredBookButton
											? addBookActiveIcon
											: addBookIcon
									}
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
