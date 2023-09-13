import { Link } from 'react-router-dom';
import { useSavedCitiesContext } from '../SavedCitiesContextProvider';
import { getDetailPath } from '@/router/paths';
import { transformCoordinatesToUrlParam } from '@/modules/cities/domain/City';

function SavedCitiesList() {
	const { savedCities, deleteSavedCity, deleteAllSavedCities } =
		useSavedCitiesContext();

	return (
		<section>
			<header>
				<h2>Ciudades guardadas</h2>{' '}
				<button
					disabled={!savedCities?.length}
					onClick={() => deleteAllSavedCities()}
				>
					Delete all
				</button>
			</header>
			<ul>
				{savedCities.map(city => (
					<li key={city.id}>
						{city.name}, {city.country}
						<button onClick={() => deleteSavedCity(city)}>delete</button>
						<Link
							to={getDetailPath({
								name: city.name,
								country: city.country,
								coordinates: transformCoordinatesToUrlParam(city.coordinates),
							})}
						>
							open
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}

export default SavedCitiesList;
