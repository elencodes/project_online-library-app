import { useState, useEffect } from "react";
import useTypedValidation from "../../hooks/useTypedValidation";
import GoBackButton from "../Buttons/GoBackButton/GoBackButton";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import uploadIcon from "../../assets/icons/buttons/upload.svg";
import styles from "./AddBookForm.module.scss";

const AddBookForm = () => {
	// Локальное состояние формы
	const [formData, setFormData] = useState({
		cover: null as File | null,
		title: "",
		author: "",
		genre: "",
		description: "",
	});

	//Состояние для предпросмотра обложки
	const [preview, setPreview] = useState<string | null>(null);
	// Состояние для имени файла (обложки)
	const [fileName, setFileName] = useState<string | null>(null);

	// Используем кастомный хук валидации
	const { formErrors, formValid, isDisabled, validateField } =
		useTypedValidation();

	// Обработчик загрузки файла
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		// Обновляем состояние формы
		setFormData((prev) => ({ ...prev, cover: file }));
		// Валидация загружаемого файла
		validateField("cover", file);

		// Если файл загружен, создаем URL для предпросмотра
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setPreview(objectUrl);

			// Сохраняем имя файла и его тип
			setFileName(
				file.name.length > 45 ? file.name.slice(0, 42) + "..." : file.name
			);
		} else {
			setPreview(null);
			setFileName(null);
		}
	};

	// Обработчик изменения полей формы
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		// Обновляем состояние формы
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Запускаем валидацию для текущего поля
		validateField(name as keyof typeof formValid, value);
	};

	// Обработчик отправки формы
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Проверяем, есть ли ошибки
		if (isDisabled) return;
		// Логика отправки данных (например, в API или локальное состояние)
		console.log("New book added:", formData);
		// Очистка формы после успешного добавления книги
		setFormData({
			cover: null,
			title: "",
			author: "",
			genre: "",
			description: "",
		});
	};

	useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	return (
		<>
			<div className="page__background">
				<div className="container">
					<section className={styles.section}>
						<GoBackButton text={"Back to Library"} />
						<form
							className={styles.form__container}
							onSubmit={handleSubmit}
						>
							<div className={styles.input__container}>
								<label className={styles.input__label}>Cover</label>
								<div
									className={`${styles.box__input_file} ${
										styles.input__item
									} ${formErrors.cover ? styles.invalid : ""}`}
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
										name="cover"
										onChange={handleFileChange}
									/>
								</div>
								{preview && (
									<div className={styles.preview}>
										<div className={styles.preview__image_box}>
											<img
												className={styles.preview__image}
												src={preview}
												alt="Book cover preview"
											/>
										</div>
										<p className={styles.preview__image_title}>
											{fileName}
										</p>
									</div>
								)}
								{formValid.cover && formErrors.cover && (
									<p className={styles.error}>{formErrors.cover}</p>
								)}
							</div>
							<div className={styles.input__container}>
								<label className={styles.input__label}>Title</label>
								<input
									className={`${styles.input__item} ${
										formErrors.title ? styles.invalid : ""
									}`}
									type="text"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
								/>
								{formValid.title && formErrors.title && (
									<p className={styles.error}>{formErrors.title}</p>
								)}
							</div>
							<div className={styles.input__container}>
								<label className={styles.input__label}>Author</label>
								<input
									className={`${styles.input__item} ${
										formErrors.author ? styles.invalid : ""
									}`}
									type="text"
									name="author"
									value={formData.author}
									onChange={handleInputChange}
								/>
								{formValid.author && formErrors.author && (
									<p className={styles.error}>{formErrors.author}</p>
								)}
							</div>
							<div className={styles.input__container}>
								<label className={styles.input__label}>Genre</label>
								<input
									className={`${styles.input__item} ${
										formErrors.genre ? styles.invalid : ""
									}`}
									type="text"
									name="genre"
									value={formData.genre}
									onChange={handleInputChange}
								/>
								{formValid.genre && formErrors.genre && (
									<p className={styles.error}>{formErrors.genre}</p>
								)}
							</div>
							<div className={styles.input__container}>
								<label className={styles.description__label}>
									About book
								</label>
								<textarea
									className={`${styles.input__item} ${
										styles.textarea
									} ${formErrors.description ? styles.invalid : ""}`}
									name="description"
									placeholder="Enter description of the book..."
									value={formData.description}
									onChange={handleInputChange}
								></textarea>
								{formValid.description && formErrors.description && (
									<p className={styles.error}>
										{formErrors.description}
									</p>
								)}
							</div>
							<SubmitButton text={"Add book"} isDisabled={isDisabled} />
						</form>
					</section>
				</div>
			</div>
		</>
	);
};

export default AddBookForm;
