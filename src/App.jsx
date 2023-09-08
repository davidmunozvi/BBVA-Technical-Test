import { createApiWeatherRepository } from '@/modules/weatherReports/infrastructure/ApiWeatherRepository';
import { httpClient } from '@/modules/shared/infrastructure/HttpClient';
import { useEffect, useState } from 'react';
const client = httpClient;
const weatherRepository = createApiWeatherRepository(client);

function App() {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		weatherRepository
			.getWeatherByCoordinates({
				latitude: 40.4165,
				longitude: -3.70256,
			})
			.then(data => setWeather(data));
	}, []);

	return (
		<>
			<div>{weather?.timezone} hor</div>
		</>
	);
}

export default App;
