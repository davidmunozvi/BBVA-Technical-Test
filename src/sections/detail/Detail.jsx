import { useState, useEffect } from 'react';
import WeatherStatusIcon from '@/sections/shared/WeatherIcon';
import { useParams } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';
import { getWeatherByParamCoordinates } from '@/modules/weatherReports/application/get';

function Detail({ weatherRepository }) {
	const [weather, setWeather] = useState(null);
	const query = useQuery();
	const { city, country } = useParams();

	useEffect(() => {
		// TODO: move this to a hook and move logic to context
		getWeatherByParamCoordinates(weatherRepository)(
			query.get('coordinates'),
		).then(data => setWeather(data));
	}, [weatherRepository, query]);

	return (
		<div>
			<div>
				{city}, {country}
			</div>
			<div>
				{weather?.weather} <WeatherStatusIcon />
			</div>
			<div>{weather?.temperature}</div>
			<div>Amanece a las {weather?.sunrise}</div>
			<div>Anochece a las {weather?.sunset}</div>
			<div>
				{weather?.maxTemperature} - {weather?.minTemperature}
			</div>
		</div>
	);
}

export default Detail;
