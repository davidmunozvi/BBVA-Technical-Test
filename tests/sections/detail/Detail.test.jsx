import {
	screen,
	render,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import Detail from '@/sections/detail/Detail';
import { WeatherReportMother } from '../../modules/weatherReports/domain/WeatherReportMother';
import { CityMother } from '../../modules/cities/domain/CityMother';
import { getDetailPath } from '@/router/paths';
import { transformCoordinatesToUrlParam } from '@/modules/cities/domain/City';
import { renderWithRouterAndSavedCitiesContext } from '../../helpers';

const renderDetail = (repository, route) =>
	renderWithRouterAndSavedCitiesContext(
		<Detail weatherRepository={repository} />,
		{
			route,
			path: '/detail/:name/:country',
		},
	);
const { country, coordinates, name } = CityMother.create();

describe('Detail section', () => {
	it('should request the weather info when the correct city data is given', async () => {
		const weatherReport = WeatherReportMother.create();
		const repository = {
			get: () => weatherReport,
		};
		renderDetail(
			repository,
			getDetailPath({
				name,
				country,
				coordinates: transformCoordinatesToUrlParam(coordinates),
			}),
		);
		await waitForElementToBeRemoved(() => screen.getByText('loading...'));
		const screenWeather = screen.getByText(weatherReport.weather);
		const screenCityName = screen.getByText(`${name}, ${country}`);

		expect(screenWeather).toBeInTheDocument();
		expect(screenCityName).toBeInTheDocument();
	});

	it('should show error message when incorrect city data is given', async () => {
		const incorrectCityName = 2;
		const weatherReport = WeatherReportMother.create();
		const repository = {
			get: () => weatherReport,
		};

		renderDetail(
			repository,
			`/detail/${incorrectCityName}/${country}?coordinates=${coordinates.join(
				',',
			)}`,
		);
		const error = screen.getByText('Error');

		expect(error).toBeInTheDocument();
	});

	it('should not try to fetch when incorrect city data is given', async () => {
		const country = 2;
		const repository = {
			get: vi.fn(),
		};

		renderDetail(repository, `/detail/${name}/${country}?coordinates=#`);

		expect(repository.get).not.toHaveBeenCalled();
	});
});
