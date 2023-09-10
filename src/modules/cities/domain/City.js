export const CITY_NAME_MIN_LENGTH = 2;

export function isCityNameValid(name) {
	const numbersRegExp = /[0-9]/g;
	return Boolean(
		name?.length >= CITY_NAME_MIN_LENGTH && !numbersRegExp.test(name),
	);
}

export function areCoordinatesValid(coordinates) {
	return Boolean(
		Array.isArray(coordinates) &&
			coordinates?.length === 2 &&
			coordinates.every(coordinate => typeof coordinate === 'number'),
	);
}

export function ensureCityIsValid(city) {
	if (!isCityNameValid(city?.name)) {
		throw new Error('City name is invalid');
	}
	if (!areCoordinatesValid(city?.coordinates)) {
		throw new Error('City coordinates are invalid');
	}
}

export function transformCoordinatesFromUrlParam(param) {
	const [latitude, longitude] = param.split(',');
	return [Number(latitude), Number(longitude)];
}

export function transformCoordinatesToUrlParam(coordinates) {
	return coordinates.join(',');
}
