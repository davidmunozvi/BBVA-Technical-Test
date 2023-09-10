import { transformCoordinatesFromUrlParam } from '@/modules/cities/domain/City';

export function getWeatherByParamCoordinates(weatherRepository) {
	return function (coordinates) {
		return weatherRepository.get(transformCoordinatesFromUrlParam(coordinates));
	};
}
