import { Factory } from 'fishery';

import { CityMother } from '../../cities/domain/CityMother';

const SavedCityFactory = Factory.define(() => {
	const { coordinates, name, country } = CityMother.create();
	return {
		name,
		coordinates,
		country,
		id: coordinates.join(','),
	};
});

export const SavedCityMother = {
	create: params => SavedCityFactory.build(params),
	createList: length => SavedCityFactory.buildList(length),
};
