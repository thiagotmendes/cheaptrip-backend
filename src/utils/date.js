export const convertPtBrToDate = (dateStr) => {
	var parts = dateStr.split("/");
	return new Date(parts[2], parts[1] - 1, parts[0]);
}
