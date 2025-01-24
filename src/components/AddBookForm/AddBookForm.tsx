import { Link } from "react-router-dom";
import styles from "./AddBookForm.module.scss";

const AddBookForm = () => {
	return (
		<>
			<div className="container">
				<section className={styles.section}>
					<Link className={styles.go_back__button} to="/">
						<p className={styles.button__text}>Back to Library</p>
					</Link>
					<form className={styles.form__container}>
						<div className={styles.input__container}>
							<label className={styles.input__label}>Cover</label>
							<input
								className={styles.input__item}
								type="file"
								name="Cover"
							/>
						</div>
						<div className={styles.input__container}>
							<label className={styles.input__label}>Title</label>
							<input
								className={styles.input__item}
								type="text"
								name="Title"
							/>
						</div>
						<div className={styles.input__container}>
							<label className={styles.input__label}>Author</label>
							<input
								className={styles.input__item}
								type="text"
								name="Author"
							/>
						</div>
						<div className={styles.input__container}>
							<label className={styles.input__label}>Genre</label>
							<input
								className={styles.input__item}
								type="text"
								name="Genre"
							/>
						</div>
						<div className={styles.input__container}>
							<label className={styles.description__label}>
								About book
							</label>
							<textarea
								className={`${styles.input__item} ${styles.textarea}`}
								name=""
								id=""
								placeholder="A description of the book"
							></textarea>
						</div>
						<button className={styles.button} type="submit">
							<p className={styles.button__text}>Add book</p>
						</button>
					</form>
				</section>
			</div>
		</>
	);
};

export default AddBookForm;
