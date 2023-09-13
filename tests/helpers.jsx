import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SavedCitiesContextProvider } from '@/sections/SavedCitiesContextProvider';
import { createLocalStorageSavedCitiesRepository } from '@/modules/savedCities/infrastructure/LocalStorageSavedCitiesRepository';

const savedCitiesDefaultRepository = createLocalStorageSavedCitiesRepository();

export const renderWithRouterAndSavedCitiesContext = (
	ui,
	{ route = '/', path = '/', repository = savedCitiesDefaultRepository } = {},
) => {
	return {
		...render(
			<SavedCitiesContextProvider repository={repository}>
				<MemoryRouter initialEntries={[route]}>
					<Routes>
						<Route path={path} element={ui} />
					</Routes>
				</MemoryRouter>
			</SavedCitiesContextProvider>,
		),
	};
};

export const renderWithRouter = (
	ui,
	{ route = '/', path = '/', wrapper } = {},
) => {
	return {
		...render(
			<MemoryRouter initialEntries={[route]}>
				<Routes>
					<Route path={path} element={ui} />
				</Routes>
			</MemoryRouter>,
			{ wrapper },
		),
	};
};
