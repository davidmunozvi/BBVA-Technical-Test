export const createApiCitiesRepository = client => ({
	getAll: async coordinates => {
		const cities = await client.get(
			'https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1&language=en&format=json',
			{
				name: 'Berlin',
				count: 10,
				language: 'en',
				format: 'json',
			},
		);
		return cities.results;
	},
});

const mapCities = cities => ({});
