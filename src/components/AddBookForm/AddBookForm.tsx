import { useState, useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import useTypedValidation from "../../hooks/useTypedValidation";
import { IFormValid } from "../../hooks/useTypedValidation";
import { IAddedBook } from "../../types/addedBooksTypes";
import { addBookAction } from "../../store/actionCreators/addedBooksActionCreators";
import { fileToBase64 } from "../../utils/fileToBase64";
import GoBackButton from "../Buttons/GoBackButton/GoBackButton";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import ClearButton from "../Buttons/ClearButton/ClearButton";
import uploadIcon from "../../assets/icons/buttons/upload.svg";
import doneIcon from "../../assets/icons/buttons/done.svg";
import styles from "./AddBookForm.module.scss";

const AddBookForm = () => {
	// Используем типизированный useDispatch
	const dispatch = useTypedDispatch();

	// Локальное состояние формы
	const [formData, setFormData] = useState({
		id: "",
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
	const {
		formErrors,
		setFormErrors,
		formValid,
		setFormValid,
		isDisabled,
		setIsDisabled,
		validateField,
	} = useTypedValidation();

	const isValid =
		formValid.cover &&
		formValid.title &&
		formValid.author &&
		formValid.genre &&
		formValid.description;

	// Управление состоянием всплывающего уведомления
	const [showNotification, setShowNotification] = useState<boolean>(false);

	// Обработчик загрузки файла
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		// Освобождаем память от созданного URL
		if (preview) {
			URL.revokeObjectURL(preview);
		}
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
				file.name.length > 50 ? file.name.slice(0, 47) + "..." : file.name
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
		validateField(name as keyof IFormValid, value);
	};

	// Обработчик отправки формы
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Запускаем валидацию для всех полей перед отправкой
		Object.entries(formData).forEach(([key, value]) => {
			validateField(key as keyof IFormValid, value);
		});

		if (isValid) {
			const coverBase64 = formData.cover
				? await fileToBase64(formData.cover)
				: "";
			// Создаем объект книги
			const newBook: IAddedBook = {
				id: Date.now().toString(), // Генерируем уникальный id
				cover: coverBase64,
				title: formData.title,
				author: [formData.author],
				genre: [formData.genre],
				description: formData.description,
				originalFile: formData.cover,
			};

			console.log("Dispatching addBookAction:", newBook);
			dispatch(addBookAction(newBook));

			// Логика отправки данных (например, в API или локальное состояние)
			console.log("New book added:", formData);

			// Очистка формы после успешного добавления книги
			setFormData({
				id: "",
				cover: null,
				title: "",
				author: "",
				genre: "",
				description: "",
			});

			setShowNotification(true); // Показываем уведомление

			setPreview(null);
			setFileName(null);
			setIsDisabled(false);
		} else {
			console.log("Форма не прошла валидацию", formErrors);
		}
	};

	const handleClearFile = () => {
		// Освобождаем память от созданного URL
		if (preview) {
			URL.revokeObjectURL(preview);
			setPreview(null);
		}
		// Сбрасываем состояние файла
		setFormData((prev) => ({ ...prev, cover: null }));
		setFileName(null);
		setFormValid((prev) => ({ ...prev, cover: true }));
		// Явно устанавливаем ошибку, так как обложка обязательна
		setFormErrors((prev) => ({
			...prev,
			cover: "Cover image is required!",
		}));
	};

	// Функция для закрытия уведомления
	const closeNotification = () => {
		setShowNotification(false);
	};

	useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	// Cледим за изменениями в formValid и блокируем кнопку при ошибках валидации
	useEffect(() => {
		// Если хотя бы одно поле невалидно, кнопка должна быть заблокирована
		if (!isValid) {
			setIsDisabled(true); // Блокируем кнопку
		} else {
			setIsDisabled(false); // Разблокируем кнопку, если все поля валидны
		}
	}, [isValid, setIsDisabled]);

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
										{preview
											? "The file is uploaded"
											: "Choose a file"}
										<img
											className={
												preview
													? styles.file_placeholder__icon
													: styles.placeholder__upload_icon
											}
											src={preview ? doneIcon : uploadIcon}
											alt={preview ? "done" : "upload"}
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
										<div className={styles.preview__box}>
											<div className={styles.preview__image_box}>
												<img
													className={styles.preview__image}
													src={preview}
													alt=""
												/>
											</div>
											<p className={styles.preview__image_title}>
												{fileName}
											</p>
										</div>
										<ClearButton
											onClick={handleClearFile}
											isVisible={!!preview || !!formErrors.cover}
										/>
									</div>
								)}
								{formErrors.cover && (
									<p className={styles.error}>{formErrors.cover}</p>
								)}
							</div>
							{[
								{
									label: "Title",
									name: "title",
									type: "text",
									value: formData.title,
								},
								{
									label: "Author",
									name: "author",
									type: "text",
									value: formData.author,
								},
								{
									label: "Genre",
									name: "genre",
									type: "text",
									value: formData.genre,
								},
							].map(({ label, name, type, value }) => (
								<div key={name} className={styles.input__container}>
									<label className={styles.input__label}>
										{label}
									</label>
									<input
										className={`${styles.input__item} ${
											formErrors[name] ? styles.invalid : ""
										}`}
										type={type}
										name={name}
										value={value}
										onChange={handleInputChange}
									/>
									{formErrors[name] && (
										<p className={styles.error}>{formErrors[name]}</p>
									)}
								</div>
							))}
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
								{formErrors.description && (
									<p className={styles.error}>
										{formErrors.description}
									</p>
								)}
							</div>
							<SubmitButton text={"Add book"} isDisabled={isDisabled} />
						</form>
					</section>
					{showNotification && (
						<div className={styles.notification}>
							<p className={styles.notification__text}>
								Your book was{" "}
								<span className={styles.text__success}>
									successfully added!
								</span>{" "}
								🎉
							</p>
							<button
								className={styles.closeButton}
								onClick={closeNotification}
							>
								&times;
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default AddBookForm;
