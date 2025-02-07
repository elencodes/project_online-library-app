import { MAX_PAGES_COUNT } from "./constants";

export const handlePagesCounts = (
	pages: number[], // Сюда передается массив, в который будут добавляться номера страниц
	pagesCount: number, // Общее количество страниц
	currentPage: number // Текущая страница
): void => {
	if (pagesCount > 5) {
		if (currentPage >= 3) {
			for (let i = currentPage - 2; i <= currentPage + 2; i++) {
				pages.push(i);
				if (i === MAX_PAGES_COUNT) break;
			}
		} else {
			for (let i = 1; i <= 5; i++) {
				pages.push(i);
				if (i === MAX_PAGES_COUNT) break;
			}
		}
	} else {
		for (let i = 1; i <= pagesCount; i++) {
			pages.push(i);
		}
	}
};
