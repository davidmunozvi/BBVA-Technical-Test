const NUMBERS_AND_SPECIAL_CHARACTERS_REGEXP =
	/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/g;

export function isCityNameValid(name) {
	const numbersRegExp = NUMBERS_AND_SPECIAL_CHARACTERS_REGEXP;
	return Boolean(!numbersRegExp.test(name));
}

export function isCityCountryValid(country) {
	const numbersRegExp = NUMBERS_AND_SPECIAL_CHARACTERS_REGEXP;
	return Boolean(!numbersRegExp.test(country));
}

export function areCoordinatesValid(coordinates) {
	return Boolean(
		Array.isArray(coordinates) &&
			coordinates?.length === 2 &&
			coordinates.every(
				coordinate => coordinate && typeof coordinate === 'number',
			),
	);
}

export function isCityValid(city) {
	return (
		isCityNameValid(city?.name) &&
		areCoordinatesValid(city?.coordinates) &&
		isCityCountryValid(city?.country)
	);
}

export function ensureCityIsValid(city) {
	if (!isCityNameValid(city?.name)) {
		throw new Error('City name is invalid');
	}
	if (!areCoordinatesValid(city?.coordinates)) {
		throw new Error('City coordinates are invalid');
	}
	if (!isCityCountryValid(city?.country)) {
		throw new Error('City country is invalid');
	}
}

export function transformCoordinatesFromUrlParam(param) {
	const [latitude, longitude] = param.split(',');
	return [Number(latitude), Number(longitude)];
}

export function transformCoordinatesToUrlParam(coordinates) {
	return coordinates.join(',');
}
