import { createApiWeatherRepository } from '@/modules/weatherReports/infrastructure/ApiWeatherRepository';
import { createApiCitiesRepository } from '@/modules/cities/infrastructure/ApiCitiesRepository';
import { httpClient } from '@/modules/shared/infrastructure/HttpClient';
import { useEffect, useState } from 'react';
const client = httpClient;
const weatherRepository = createApiWeatherRepository(client);
const citiesRepository = createApiCitiesRepository(client);

function App() {
	const [weather, setWeather] = useState({});
	const [cities, setCities] = useState([]);
	useEffect(() => {
		weatherRepository
			.getWeatherByCoordinates({
				latitude: 40.4165,
				longitude: -3.70256,
			})
			.then(data => setWeather(data));
	}, []);
	useEffect(() => {
		citiesRepository.getAll('Madrid').then(data => setCities(data));
	}, []);

	return (
		<>
			<div>{weather?.timezone} hor</div>
			<div>
				{cities.map(city => (
					<div key={city.id}>
						{city.name} {city.country}
					</div>
				))}
			</div>
		</>
	);
}

export default App;
