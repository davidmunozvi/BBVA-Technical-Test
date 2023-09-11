import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithRouter } from '../../renderWithRouter';
import { vi, describe, it, expect } from 'vitest';

import Detail from '@/sections/detail/Detail';
import { WeatherReportMother } from '../../modules/weatherReports/domain/WeatherReportMother';
import { CityMother } from '../../modules/cities/domain/CityMother';

const renderDetail = (repository, route) =>
	renderWithRouter(<Detail weatherRepository={repository} />, {
		route,
		path: '/detail/:name/:country',
	});

describe('Detail section', () => {
	it('should request the weather info when the correct city data is given', async () => {
		const cityName = 'Madrid';
		const country = 'Spain';
		const coordinates = CityMother.create().coordinates;

		const weatherReport = WeatherReportMother.create();
		const repository = {
			get: () => weatherReport,
		};

		renderDetail(
			repository,
			`/detail/${cityName}/${country}?coordinates=${coordinates.join(',')}`,
		);
		await waitForElementToBeRemoved(() => screen.getByText('loading...'));
		const screenWeather = screen.getByText(weatherReport.weather);
		const screenCityName = screen.getByText(`${cityName}, ${country}`);

		expect(screenWeather).toBeInTheDocument();
		expect(screenCityName).toBeInTheDocument();
	});

	it('should show error message when incorrect city data is given', async () => {
		const cityName = 2;
		const country = 'Spain';
		const coordinates = CityMother.create().coordinates;
		const weatherReport = WeatherReportMother.create();
		const repository = {
			get: () => weatherReport,
		};

		renderDetail(
			repository,
			`/detail/${cityName}/${country}?coordinates=${coordinates.join(',')}`,
		);
		const error = screen.getByText('Error');

		expect(error).toBeInTheDocument();
	});

	it('should not try to fetch when incorrect city data is given', async () => {
		const cityName = 2;
		const country = 'Spain';
		const repository = {
			get: vi.fn(),
		};

		renderDetail(repository, `/detail/${cityName}/${country}?coordinates=#`);

		expect(repository.get).not.toHaveBeenCalled();
	});
});
