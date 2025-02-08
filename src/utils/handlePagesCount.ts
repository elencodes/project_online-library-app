export const handlePagesCounts = (
	pages: number[], // Сюда передается массив, в который будут добавляться номера страниц
	pagesCount: number, // Общее количество страниц
	currentPage: number // Текущая страница
): void => {
	if (pagesCount > 3) {
		// Если страниц больше 3, формируем массив динамически
		if (currentPage === 1) {
			pages.push(1, 2, 3);
		} else if (currentPage === pagesCount) {
			pages.push(pagesCount - 2, pagesCount - 1, pagesCount);
		} else {
			pages.push(currentPage - 1, currentPage, currentPage + 1);
		}
	} else {
		// Если страниц 3 или меньше — просто добавляем их
		for (let i = 1; i <= pagesCount; i++) {
			pages.push(i);
		}
	}
};
