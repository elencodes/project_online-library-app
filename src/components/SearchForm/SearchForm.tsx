import React, { useState, useEffect, useRef } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { searchBooks } from "../../utils/api";
import { clearSearchResultsAction } from "../../store/actionCreators/searchBooksActionCreators";
import { clearTopBooksAction } from "../../store/actionCreators/topBooksActionCreators";
import styles from "./SearchForm.module.scss";

interface SearchFormProps {
	activeFilter: string;
	setActiveFilter: (filter: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
	activeFilter,
	setActiveFilter,
}) => {
	// Состояние для хранения введенного пользователем запроса
	const [keyword, setKeyword] = useState<string>("");
	// Флаг, указывающий, есть ли текст в поле (нужен для отображения кнопки очистки)
	const [hasText, setHasText] = useState<boolean>(false);
	// Получаем `dispatch` для отправки экшенов в Redux
	const dispatch = useTypedDispatch();
	// Динамический плейсхолдер (убирается при фокусе, возвращается при потере фокуса)
	const [placeholder, setPlaceholder] = useState("Search a book...");
	// Реф для хранения ссылки на таймер (чтобы управлять задержкой поиска)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// useEffect для запуска поиска с задержкой 1 секунда
	useEffect(() => {
		// Очищаем предыдущий таймер, если он был
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		// Запускаем новый таймер
		timeoutRef.current = setTimeout(() => {
			if (keyword.trim()) {
				dispatch(searchBooks(keyword)); // Отправляем запрос на поиск книг
			}
		}, 1000);

		// Очистка таймера при размонтировании или изменении keyword
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [keyword, dispatch]); // Запускается при изменении `keyword`

	// Обработчик изменения ввода
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	): void => {
		const value = e.target.value;
		setKeyword(value);
		setHasText(value.trim().length > 0); // Обновляем флаг наличия текста

		// Переключаемся на "All books", если был активен "Favourites"
		if (activeFilter === "Favourites" && value.trim() !== "") {
			setActiveFilter("All books");
		}

		// Если поле очистилось — показываем топовые книги
		if (value.trim() === "") {
			dispatch(clearSearchResultsAction());
		}
	};

	// Обработчик отправки формы (по нажатию Enter)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы при нажатии Enter

		if (keyword.trim()) {
			dispatch(clearTopBooksAction()); // Очистка topBooks перед поиском
			dispatch(searchBooks(keyword)); // Запуск поиска
		}
	};

	// Очищаем поле ввода и скрываем кнопку очистки
	const clearInput = () => {
		setKeyword(""); // Очищаем введенный текст
		setHasText(false); // Скрываем кнопку очистки

		if (activeFilter === "Favourites") {
			const event = new CustomEvent("changeFilter", { detail: "All books" });
			window.dispatchEvent(event);

			// Добавляем небольшую задержку перед очисткой результатов
			setTimeout(() => {
				dispatch(clearSearchResultsAction());
			}, 0);
		} else {
			dispatch(clearSearchResultsAction());
		}
	};

	// Убираем плейсхолдер при фокусе на поле ввода
	const handleFocus = () => setPlaceholder("");
	// Возвращаем плейсхолдер при потере фокуса
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
				{hasText && (
					<button
						type="button"
						className={styles.clear__button}
						onClick={clearInput}
					>
						<span className={styles.clear__icon}></span>
					</button>
				)}
			</form>
		</>
	);
};

export default SearchForm;
