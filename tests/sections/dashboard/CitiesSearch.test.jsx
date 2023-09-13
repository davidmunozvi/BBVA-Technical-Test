import {
	screen,
	fireEvent,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import CitiesSearch from '@/sections/dashboard/CitiesSearch';
import { CityMother } from '../../modules/cities/domain/CityMother';
import { renderWithRouter } from '../../helpers';

const renderCitiesSearch = repository =>
	renderWithRouter(<CitiesSearch repository={repository} />);

describe('CitiesSearch component', () => {
	it('should not request the cities on first render', () => {
		const repository = {
			getAll: vi.fn(),
		};

		renderCitiesSearch(repository);

		expect(repository.getAll).not.toHaveBeenCalled();
	});

	it('should request the cities when the user types valid city name', async () => {
		const citiesList = CityMother.createList(10);
		const repository = {
			getAll: () => citiesList,
		};

		renderCitiesSearch(repository);
		const searchInput = screen.getByLabelText('Search city', {
			selector: 'input',
		});
		fireEvent.change(searchInput, { target: { value: citiesList[0].name } });
		await waitForElementToBeRemoved(() => screen.getByText('...loading'), {
			timeout: 400,
		});
		const suggestions = await screen.getAllByRole('listitem');

		expect(suggestions.length).to.equal(citiesList.length);
	});

	it('should show error message when user put an invalid value', async () => {
		const citiesList = CityMother.createList(10);

		const repository = {
			getAll: () => citiesList,
		};

		renderCitiesSearch(repository);

		const searchInput = screen.getByLabelText('Search city', {
			selector: 'input',
		});
		fireEvent.change(searchInput, { target: { value: 22 } });
		const errorMessage = await screen.findByText('Error');

		expect(errorMessage).toBeInTheDocument();
	});
});
