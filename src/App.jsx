import { useEffect, useState } from 'react';
import { Router } from './Router';

import { createApiWeatherRepository } from '@/modules/weatherReports/infrastructure/ApiWeatherRepository';

const weatherRepository = createApiWeatherRepository();

function App() {
	const [weather, setWeather] = useState(null);
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
			<header>Weather app</header>
			<Router />
			<div>{weather?.daily.temperature_2m_max[0]} degrees</div>
		</>
	);
}

export default App;
