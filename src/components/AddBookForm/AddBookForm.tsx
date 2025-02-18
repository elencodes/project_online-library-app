import GoBackButton from "../Buttons/GoBackButton/GoBackButton";
import uploadIcon from "../../assets/icons/buttons/upload.svg";
import styles from "./AddBookForm.module.scss";

const AddBookForm = () => {
	return (
		<>
			<div className="page__background">
				<div className="container">
					<section className={styles.section}>
						<GoBackButton text={"Back to Library"} />
						<form className={styles.form__container}>
							<div className={styles.input__container}>
								<label className={styles.input__label}>Cover</label>
								<div
									className={`${styles.box__input_file} ${styles.input__item}`}
								>
									<p className={styles.input__file_placeholder}>
										Choose a file
										<img
											className={styles.placeholder__upload_icon}
											src={uploadIcon}
											alt="upload"
										/>
									</p>
									<input
										className={styles.input__file}
										type="file"
										name="Cover"
									/>
								</div>
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
									name="description"
									placeholder="Enter description of the book..."
								></textarea>
							</div>
							<button className={styles.button} type="submit">
								<p className={styles.button__text}>Add book</p>
							</button>
						</form>
					</section>
				</div>
			</div>
		</>
	);
};

export default AddBookForm;
