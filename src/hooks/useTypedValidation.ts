import { useState, useEffect } from "react";

// Тип для ошибок формы
export interface IFormErrors {
	cover: string;
	title: string;
	author: string;
	genre: string;
	description: string;
	[key: string]: string;
}

// Тип для валидации полей (true - ошибка, false - поле валидно)
export interface IFormValid {
	cover: boolean;
	title: boolean;
	author: boolean;
	genre: boolean;
	description: boolean;
}

// Хук useTypedValidation для валидации полей формы
const useTypedValidation = () => {
	// Состояние для хранения сообщений об ошибках валидации
	const [formErrors, setFormErrors] = useState<IFormErrors>({
		cover: "",
		title: "",
		author: "",
		genre: "",
		description: "",
	});

	// Состояние для отслеживания, является ли поле валидным
	const [formValid, setFormValid] = useState<IFormValid>({
		cover: false,
		title: false,
		author: false,
		genre: false,
		description: false,
	});

	// Состояние для контроля активности кнопки (например, для кнопки "Add book")
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	//useEffect отслеживает изменения в `formValid` и обновляет состояние `isDisabled`.
	//Если хотя бы одно поле содержит ошибку (`true`), кнопка отправки остается заблокированной.
	useEffect(() => {
		setIsDisabled(Object.values(formValid).some((valid) => valid));
	}, [formValid]);

	// Функция validateField для проверки конкретного поля на соответствие правилам валидации
	const validateField = (
		name: keyof IFormValid,
		value: string | File | null
	) => {
		// Если поле с типом "строка" состоит только из пробелов, устанавливаем ошибку и отмечаем его как невалидное
		if (typeof value === "string" && /^\s*$/.test(value)) {
			setFormValid((prev) => ({ ...prev, [name]: true })); // Обновляем статус валидности для текущего поля
			setFormErrors((prev) => ({
				...prev,
				[name]: "Field cannot be only spaces!",
			})); // Сообщение об ошибке
			return;
		}

		// Регулярное выражение (проверка) на соответствие латинице/кириллице и чтобы строка не состояла только из пробелов
		const textRegex = /^(?!\s*$)[A-Za-zА-Яа-яЁё -'<>:?!]+$/i;
		const authorGenreRegex = /^(?!\s*$)[A-Za-zА-Яа-яЁё -']+$/i;

		//Разрешенные типы файлов у обложки книги
		const allowedTypes = [
			"image/jpeg",
			"image/svg+xml",
			"image/png",
			"image/webp",
		];

		// Максимальный размер загружаемой обложки книги = 5MB
		const maxSize = 5 * 1024 * 1024;

		//Универсальная валидация полей
		const textValidation = (
			name: keyof IFormValid,
			value: string,
			regex: RegExp,
			errorMessage: string
		) => {
			if (regex.test(value)) {
				setFormValid((prev) => ({ ...prev, [name]: false })); // Поле валидно
				setFormErrors((prev) => ({ ...prev, [name]: "" })); // Ошибка отсутствует
			} else {
				setFormValid((prev) => ({ ...prev, [name]: true })); // Поле невалидно
				setFormErrors((prev) => ({ ...prev, [name]: errorMessage })); // Сообщение об ошибке
			}
		};

		switch (name) {
			// Валидация текстовых полей (title, author, genre, description)
			case "title":
			case "description":
				textValidation(
					name,
					value as string,
					textRegex,
					"Only Latin, Cyrillic, and symbols -'<>:?! allowed"
				);
				break;

			case "author":
			case "genre":
				textValidation(
					name,
					value as string,
					authorGenreRegex,
					"Only Latin, Cyrillic, and symbols -' allowed"
				);
				break;

			// Валидация поля "cover" (загрузка обложки книги)
			case "cover":
				if (!value) {
					// Если файл отсутствует - ошибка
					setFormValid((prev) => ({ ...prev, cover: true }));
					setFormErrors((prev) => ({
						...prev,
						cover: "Cover image is required!",
					}));
				} else if (value instanceof File) {
					// Если загружается файл, проверяем его MIME-тип
					if (!allowedTypes.includes(value.type)) {
						setFormValid((prev) => ({ ...prev, cover: true })); // Поле невалидно
						setFormErrors((prev) => ({
							...prev,
							cover: "Only JPG, PNG, SVG or WEBP allowed!",
						})); // Сообщение об ошибке
					} else if (value.size > maxSize) {
						setFormValid((prev) => ({ ...prev, cover: true })); // Поле невалидно
						setFormErrors((prev) => ({
							...prev,
							cover: "File size should be < 5MB!",
						})); // Сообщение об ошибке
					} else {
						setFormValid((prev) => ({ ...prev, cover: false })); // Поле валидно
						setFormErrors((prev) => ({ ...prev, cover: "" })); // Ошибка отсутствует
					}
				}
				break;

			default:
				break;
		}
	};

	// Возвращаем необходимые переменные и функции для использования вне этого хука
	return {
		formErrors, // Объект, содержащий сообщения об ошибках для каждого поля формы (например, "Field is empty!").
		setFormErrors, // Функция для обновления состояния `formErrors`. Используется для установки конкретных сообщений об ошибках для полей.
		formValid, // Объект, отслеживающий, являются ли отдельные поля формы валидными (true - если есть ошибка, false - если нет ошибки).
		setFormValid, // Функция для обновления состояния `formValid`. Позволяет установить, является ли поле формы валидным.
		isDisabled, // Логическое значение, которое контролирует, должна ли кнопка отправки быть заблокирована (true - заблокирована, false - разблокирована).
		setIsDisabled, // Функция для изменения значения `isDisabled`. Используется для блокировки или разблокировки кнопки отправки.
		validateField, // Функция, которая выполняет проверку конкретного поля формы, проверяя его значение на соответствие правилам валидации.
	};
};

export default useTypedValidation;
