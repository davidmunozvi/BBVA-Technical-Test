export function getAllCities(citiesRepository) {
	return function (name) {
		return citiesRepository.getAll(name);
	};
}
