import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { WEATHER_WIDGET_STATUS } from '@/sections/detail/useWeatherWidget';

const WeatherReportFactory = Factory.define(() => ({
	temperature: faker.number.float({ max: 100, precision: 0.1 }),
	maxTemperature: faker.number.float({ max: 100, precision: 0.1 }),
	minTemperature: faker.number.float({ max: 100, precision: 0.1 }),
	is_day: faker.datatype.boolean(),
	weather: faker.helpers.arrayElement(Object.values(WEATHER_WIDGET_STATUS)),
	sunrise: faker.helpers.regexpStyleStringParse('[1-24]test[00-59]'),
	sunset: faker.helpers.regexpStyleStringParse('[1-24]test[00-59]'),
}));

export const WeatherReportMother = {
	create: params => WeatherReportFactory.build(params),
};
