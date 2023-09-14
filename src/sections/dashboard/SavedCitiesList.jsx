import styled from 'styled-components';

import Link from '@/sections/shared/Link';
import Button from '@/sections/shared/Button';
import { useSavedCitiesContext } from '@/sections/SavedCitiesContextProvider';
import { getDetailPath } from '@/router/paths';
import { transformCoordinatesToUrlParam } from '@/modules/cities/domain/City';
import translations from '@/translations';

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
`;

const StyledCityCardsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	grid-auto-rows: auto;
	grid-gap: 16px;
`;
const StyledCityCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	gap: 8px;
	background-color: white;
	border-radius: 8px;
	box-shadow: rgba(54, 60, 75, 0.1) 0px 16px 32px;
	> span {
		font-size: 16px;
		font-weight: 700;
	}
`;
const SavedCityActions = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

function SavedCitiesList() {
	const { savedCities, deleteSavedCity, deleteAllSavedCities } =
		useSavedCitiesContext();

	return (
		<section>
			<StyledHeader>
				<h2>Favoritos</h2>
				<Button disabled={!savedCities?.length} onClick={deleteAllSavedCities}>
					{translations.dashboard.delete_all_saved_cities}
				</Button>
			</StyledHeader>
			{!savedCities?.length && (
				<span>{translations.dashboard.no_saved_cities}</span>
			)}
			<StyledCityCardsWrapper>
				{savedCities.map(city => (
					<StyledCityCard key={city.id}>
						<span>
							{city.name}, {city.country}
						</span>
						<SavedCityActions>
							<Button onClick={() => deleteSavedCity(city)}>
								{translations.dashboard.delete_saved_city}
							</Button>
							<Link
								href={getDetailPath({
									name: city.name,
									country: city.country,
									coordinates: transformCoordinatesToUrlParam(city.coordinates),
								})}
							>
								{translations.dashboard.open_saved_city}
							</Link>
						</SavedCityActions>
					</StyledCityCard>
				))}
			</StyledCityCardsWrapper>
		</section>
	);
}

export default SavedCitiesList;
