import { useParams } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';

import WeatherStatusIcon from '@/sections/shared/WeatherStatusIcon';
import {
	useWeatherWidget,
	WEATHER_WIDGET_STATUS,
} from '@/sections/detail/useWeatherWidget';
import { transformCoordinatesFromUrlParam } from '@/modules/cities/domain/City';
import { useSavedCitiesContext } from '@/sections/SavedCitiesContextProvider';
import { isSavedCity } from '@/modules/savedCities/domain/SavedCity';
import translations from '@/translations';

function Detail({ weatherRepository }) {
	const query = useQuery();
	const { name, country } = useParams();
	const coordinates = query.get('coordinates');
	const city = {
		name,
		country,
		coordinates: transformCoordinatesFromUrlParam(coordinates),
	};

	const { weather, status } = useWeatherWidget({
		repository: weatherRepository,
		city,
	});
	const { savedCities, addSavedCity, deleteSavedCity } =
		useSavedCitiesContext();

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

	return (
		<div>
			{isSavedCity(savedCities, city) ? (
				<button onClick={() => deleteSavedCity(city)}>
					{translations.detail.delete_button}
				</button>
			) : (
				<button onClick={() => addSavedCity(city)}>
					{translations.detail.add_button}
				</button>
			)}

			{renderDeatailState()}
		</div>
	);
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
			<div>
				{translations.detail.sunrise} {weather.sunrise}
			</div>
			<div>
				{translations.detail.sunset} {weather.sunset}
			</div>
			<div>
				{weather.maxTemperature} - {weather.minTemperature}
			</div>
		</div>
	);
}

function Loading() {
	return <div>loading...</div>;
}

function Error() {
	return <div>Error</div>;
}

export default Detail;
