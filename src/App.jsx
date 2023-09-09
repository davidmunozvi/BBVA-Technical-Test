import { createApiWeatherRepository } from '@/modules/weatherReports/infrastructure/ApiWeatherRepository';
import { createApiCitiesRepository } from '@/modules/cities/infrastructure/ApiCitiesRepository';
import CitiesSearch from '@/sections/CitiesSearch';
import { useEffect, useState } from 'react';
const weatherRepository = createApiWeatherRepository();
const citiesRepository = createApiCitiesRepository();

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
			<CitiesSearch repository={citiesRepository} />
			<div>{weather?.daily.temperature_2m_max[0]} degrees</div>
		</>
	);
}

export default App;
