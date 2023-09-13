import {
	fireEvent,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import Detail from '@/sections/detail/Detail';
import { WeatherReportMother } from '../../modules/weatherReports/domain/WeatherReportMother';
import { CityMother } from '../../modules/cities/domain/CityMother';
import { SavedCityMother } from '../../modules/savedCities/domain/SavedCityMother';
import { getDetailPath } from '@/router/paths';
import { transformCoordinatesToUrlParam } from '@/modules/cities/domain/City';
import { renderWithRouterAndSavedCitiesContext } from '../../helpers';
import { createLocalStorageSavedCitiesRepository } from '@/modules/savedCities/infrastructure/LocalStorageSavedCitiesRepository';
import { PATHS } from '@/router/paths';

const savedCitiesRepository = createLocalStorageSavedCitiesRepository();
const defaultWeatherRepository = {
	get: () => WeatherReportMother.create(),
};
const renderDetail = ({
	repository = defaultWeatherRepository,
	route,
	saveCitiesOverride = {},
}) =>
	renderWithRouterAndSavedCitiesContext(
		<Detail weatherRepository={repository} />,
		{
			route,
			path: PATHS.detail,
			repository: { ...savedCitiesRepository, ...saveCitiesOverride },
		},
	);
const { country, coordinates, name } = CityMother.create();

describe('Detail page', () => {
	describe('Weather section data functionality', () => {
		it('should request the weather info when the correct city data is given', async () => {
			const weatherReport = WeatherReportMother.create();
			const repository = {
				get: () => weatherReport,
			};

			renderDetail({
				repository,
				route: getDetailPath({
					name,
					country,
					coordinates: transformCoordinatesToUrlParam(coordinates),
				}),
			});
			await waitForElementToBeRemoved(() => screen.getByText('loading...'));
			const screenWeather = screen.getByText(weatherReport.weather);
			const screenCityName = screen.getByText(`${name}, ${country}`);

			expect(screenWeather).toBeInTheDocument();
			expect(screenCityName).toBeInTheDocument();
		});

		it('should show error message when incorrect city name is given', async () => {
			const invalidCityName = 2;

			renderDetail({
				route: getDetailPath({
					name: invalidCityName,
					country,
					coordinates: transformCoordinatesToUrlParam(coordinates),
				}),
			});
			const error = screen.getByText('Error');

			expect(error).toBeInTheDocument();
		});

		it('should not try to fetch when incorrect city data is given', async () => {
			const invalidCountry = 2;
			const repository = {
				get: vi.fn(),
			};

			renderDetail({
				repository,
				route: getDetailPath({
					name,
					country: invalidCountry,
					coordinates: '#',
				}),
			});

			expect(repository.get).not.toHaveBeenCalled();
		});
	});
	describe('Saved cities section functionality', () => {
		it('should be able to add a city', async () => {
			const addSpy = vi.spyOn(savedCitiesRepository, 'save');

			renderDetail({
				route: getDetailPath({
					name,
					country,
					coordinates: transformCoordinatesToUrlParam(coordinates),
				}),
				saveCitiesOverride: {
					get: () => Promise.resolve([]),
				},
			});
			await waitFor(() => screen.getByText('add city'));
			fireEvent.click(screen.getByText('add city'));

			expect(addSpy).toHaveBeenCalled();
		});

		it('should be able to delete a city', async () => {
			const deleteSpy = vi.spyOn(savedCitiesRepository, 'delete');
			const savedCity = SavedCityMother.create();

			renderDetail({
				route: getDetailPath({
					name,
					country,
					coordinates: transformCoordinatesToUrlParam(savedCity.coordinates),
				}),
				saveCitiesOverride: {
					get: () => Promise.resolve([savedCity]),
				},
			});
			await waitFor(() => screen.getByText('delete city'));
			fireEvent.click(screen.getByText('delete city'));

			expect(deleteSpy).toHaveBeenCalled();
		});
	});
});
