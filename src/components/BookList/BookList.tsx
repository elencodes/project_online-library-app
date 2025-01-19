import BookCard from "../BookCard/BookCard";
import styles from "./BookList.module.scss";

const BookList = () => {
	return (
		<>
			<div className={styles.list__container}>
				<ul className={styles.list}>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
					<li className={styles.list__item}>
						{" "}
						<BookCard />
					</li>
				</ul>
			</div>
		</>
	);
};

export default BookList;
