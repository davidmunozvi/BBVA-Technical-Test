import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

const CityFactory = Factory.define(() => ({
	name: faker.location.city(),
	coordinates: [faker.location.latitude(), faker.location.longitude()],
	country: faker.location.country(),
	id: faker.database.mongodbObjectId(),
}));

export const CityMother = {
	create: params => CityFactory.build(params),
	createList: length => CityFactory.buildList(length),
};
