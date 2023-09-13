import { Factory } from 'fishery';

import { CityMother } from '../../cities/domain/CityMother';
import { getSavedCityId } from '@/modules/savedCities/domain/savedCity';

const SavedCityFactory = Factory.define(() => {
	const city = CityMother.create();
	return {
		name: city.name,
		coordinates: city.coordinates,
		country: city.country,
		id: getSavedCityId(city),
	};
});

export const SavedCityMother = {
	create: params => SavedCityFactory.build(params),
	createList: length => SavedCityFactory.buildList(length),
};
