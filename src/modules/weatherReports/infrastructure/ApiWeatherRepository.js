import { httpClient } from '@/modules/shared/infrastructure/HttpClient';

export const createApiWeatherRepository = () => ({
	getWeatherByCoordinates: async coordinates => {
		const weather = await httpClient.get(
			'https://api.open-meteo.com/v1/forecast',
			{
				latitude: coordinates.latitude,
				longitude: coordinates.longitude,
				daily:
					'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset',
				timezone: 'auto',
				forecast_days: 1,
				current_weather: true,
			},
		);
		return weather;
	},
});

const mapWeather = weather => ({});
