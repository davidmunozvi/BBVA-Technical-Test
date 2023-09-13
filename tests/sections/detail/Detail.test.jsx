import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import Detail from '@/sections/detail/Detail';
import { WeatherReportMother } from '../../modules/weatherReports/domain/WeatherReportMother';
import { CityMother } from '../../modules/cities/domain/CityMother';
import { getDetailPath } from '@/router/paths';
import { transformCoordinatesToUrlParam } from '@/modules/cities/domain/City';
import { renderWithRouterAndSavedCitiesContext } from '../../helpers';
import { createLocalStorageSavedCitiesRepository } from '@/modules/savedCities/infrastructure/LocalStorageSavedCitiesRepository';

const savedCitiesRepository = createLocalStorageSavedCitiesRepository();
const renderDetail = (repository, route) =>
	renderWithRouterAndSavedCitiesContext(
		<Detail weatherRepository={repository} />,
		{
			route,
			path: '/detail/:name/:country',
			repository: savedCitiesRepository,
		},
	);
const { country, coordinates, name } = CityMother.create();

describe('Detail section', () => {
	describe('Weather section data functionality', () => {
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

		it('should show error message when incorrect city name is given', async () => {
			const invalidCityName = 2;
			const weatherReport = WeatherReportMother.create();
			const repository = {
				get: () => weatherReport,
			};

			renderDetail(
				repository,
				`/detail/${invalidCityName}/${country}?coordinates=${coordinates.join(
					',',
				)}`,
			);
			const error = screen.getByText('Error');

			expect(error).toBeInTheDocument();
		});

		it('should not try to fetch when incorrect city data is given', async () => {
			const invalidCountry = 2;
			const repository = {
				get: vi.fn(),
			};

			renderDetail(
				repository,
				`/detail/${name}/${invalidCountry}?coordinates=#`,
			);

			expect(repository.get).not.toHaveBeenCalled();
		});
	});
	describe('Saved cities functionality', () => {
		it('should not try to fetch when incorrect city data is given', async () => {
			const country = 2;
			const repository = {
				get: vi.fn(),
			};

			renderDetail(repository, `/detail/${name}/${country}?coordinates=#`);

			expect(repository.get).not.toHaveBeenCalled();
		});
	});
});
