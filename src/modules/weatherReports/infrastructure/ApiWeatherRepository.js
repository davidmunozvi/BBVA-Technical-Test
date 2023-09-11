import { httpClient } from '@/modules/shared/infrastructure/HttpClient';
import { WEATHER_CONDITIONS } from '@/modules/weatherReports/domain/Weather';
import { getTimeFromDateStr } from '@/modules/shared/domain/Date';
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const createApiWeatherRepository = () => ({
	get: async function ([latitude, longitude]) {
		const weather = await httpClient.get(BASE_URL, {
			latitude,
			longitude,
			daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset',
			timezone: 'auto',
			forecast_days: 1,
			current_weather: true,
		});
		return mapWeather(weather);
	},
});

const mapWeather = ({ daily, current_weather }) => ({
	temperature: current_weather.temperature,
	maxTemperature: daily.temperature_2m_max[0],
	minTemperature: daily.temperature_2m_min[0],
	is_day: Boolean(current_weather.is_day),
	weather: tranformWeatherCode(current_weather.weathercode),
	sunrise: getTimeFromDateStr(daily.sunrise[0]),
	sunset: getTimeFromDateStr(daily.sunset[0]),
});

const tranformWeatherCode = weatherCode => {
	const WEATHER_EQUIVALENCES = [
		{ codes: [0], status: WEATHER_CONDITIONS.clear },
		{ codes: [1], status: WEATHER_CONDITIONS.mainlyClear },
		{ codes: [3], status: WEATHER_CONDITIONS.overcast },
		{ codes: [45, 48], status: WEATHER_CONDITIONS.fog },
		{
			codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67],
			status: WEATHER_CONDITIONS.rain,
		},
		{ codes: [71, 73, 75, 85, 86], status: WEATHER_CONDITIONS.snow },
	];

	return (
		WEATHER_EQUIVALENCES.find(({ codes }) => codes.includes(weatherCode))
			.status || WEATHER_CONDITIONS.unknown
	);
};
