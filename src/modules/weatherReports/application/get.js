export function getWeatherByParamCoordinates(weatherRepository) {
	return function (coordinates) {
		return weatherRepository.get(coordinates);
	};
}
