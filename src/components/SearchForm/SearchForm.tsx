import { useState } from "react";
import styles from "./SearchForm.module.scss";

export function SearchForm() {
	const [placeholder, setPlaceholder] = useState("Search a book...");

	const handleFocus = () => setPlaceholder("");
	const handleBlur = () => setPlaceholder("Search a book...");

	return (
		<>
			<form className={styles.search__container}>
				<span className={styles.search__icon}></span>
				<input
					className={styles.search__item}
					type="text"
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder}
				/>
			</form>
		</>
	);
}
