import React, { useState, useEffect, useRef } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { searchBooks } from "../../utils/api";
import { clearSearchResultsAction } from "../../store/actionCreators/searchBooksActionCreators";
import { clearTopBooksAction } from "../../store/actionCreators/topBooksActionCreators";
import styles from "./SearchForm.module.scss";

const SearchForm: React.FC = () => {
	const [keyword, setKeyword] = useState<string>("");
	const dispatch = useTypedDispatch();
	const [placeholder, setPlaceholder] = useState("Search a book...");
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Очищаем предыдущий таймер, если он был
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		// Запускаем новый таймер
		timeoutRef.current = setTimeout(() => {
			if (keyword.trim()) {
				dispatch(searchBooks(keyword));
			}
		}, 1000);

		// Очистка таймера при размонтировании или изменении keyword
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [keyword, dispatch]);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	): void => {
		const value = e.target.value;
		setKeyword(value);

		// Если поле очистилось — показываем топовые книги
		if (value.trim() === "") {
			dispatch(clearSearchResultsAction());
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		// Предотвращаем перезагрузку страницы при нажатии Enter
		e.preventDefault();
		if (keyword.trim()) {
			dispatch(clearTopBooksAction()); // Очистка topBooks перед поиском
			dispatch(searchBooks(keyword)); // Запуск поиска
		}
	};

	const handleFocus = () => setPlaceholder("");
	const handleBlur = () => setPlaceholder("Search a book...");

	return (
		<>
			<form className={styles.search__container} onSubmit={handleSubmit}>
				<span className={styles.search__icon}></span>
				<input
					className={styles.search__item}
					type="text"
					onChange={handleChange}
					value={keyword}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder}
				/>
			</form>
		</>
	);
};

export default SearchForm;
