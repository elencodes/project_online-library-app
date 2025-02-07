import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTopBooks } from "../../utils/api";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import BookCard from "../BookCard/BookCard";
import styles from "./BookList.module.scss";

const BookList = () => {
	// Получаем функцию dispatch для отправки экшенов в Redux
	const dispatch = useDispatch();

	// Достаем из хранилища Redux список книг, статус загрузки и возможную ошибку
	const { topBooks, isTopBooksLoading, fetchTopBooksError } = useTypedSelector(
		(state) => state.topBooks
	);

	// Загружаем список топовых книг при монтировании компонента
	useEffect(() => {
		dispatch(fetchTopBooks() as any);
	}, [dispatch]);

	if (isTopBooksLoading) return <p>Загрузка...</p>;
	if (fetchTopBooksError) return <p>{fetchTopBooksError}</p>;

	return (
		<>
			<div className={styles.list__container}>
				<ul className={styles.list}>
					{topBooks.map((book) => (
						<li key={book.id} className={styles.list__item}>
							<BookCard book={book} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default BookList;
