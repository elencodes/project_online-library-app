//функция принимает общее количество книг и сколько книг на одной странице, возвращая количество страниц
export const calculatePagesCount = (
	totalItems: number,
	itemsPerPage: number,
	maxPages: number | null = null // Ограничение страниц (только для API)
): number => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	return maxPages ? Math.min(totalPages, maxPages) : totalPages;
};
