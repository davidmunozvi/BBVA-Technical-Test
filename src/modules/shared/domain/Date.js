export const getTimeFromDateStr = dateStr => {
	const date = new Date(dateStr);
	return `${date.getHours()}:${date.getMinutes()}`;
};
