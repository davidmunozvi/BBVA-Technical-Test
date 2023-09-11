import { useParams } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';

import WeatherStatusIcon from '@/sections/shared/WeatherStatusIcon';
import {
	useWeatherWidget,
	WEATHER_WIDGET_STATUS,
} from '@/sections/detail/useWeatherWidget';
import { transformCoordinatesFromUrlParam } from '../../modules/cities/domain/City';

function Detail({ weatherRepository }) {
	const query = useQuery();
	const { name, country } = useParams();
	const coordinates = query.get('coordinates');

	const { weather, status } = useWeatherWidget({
		repository: weatherRepository,
		city: {
			name,
			country,
			coordinates: transformCoordinatesFromUrlParam(coordinates),
		},
	});

	const renderDeatailState = () => {
		const states = {
			[WEATHER_WIDGET_STATUS.loading]: <Loading />,
			[WEATHER_WIDGET_STATUS.error]: <Error />,
			[WEATHER_WIDGET_STATUS.loaded]: (
				<Loaded weather={weather} cityName={name} country={country} />
			),
		};
		return states[status];
	};

	return renderDeatailState();
}

function Loaded({ weather, cityName, country }) {
	return (
		<div>
			<div>
				{cityName}, {country}
			</div>
			<div>
				{weather.weather} <WeatherStatusIcon />
			</div>
			<div>{weather.temperature}</div>
			<div>Amanece a las {weather.sunrise}</div>
			<div>Anochece a las {weather.sunset}</div>
			<div>
				{weather.maxTemperature} - {weather.minTemperature}
			</div>
		</div>
	);
}

function Loading() {
	return <div>Loading...</div>;
}

function Error() {
	return <div>Error</div>;
}

export default Detail;
