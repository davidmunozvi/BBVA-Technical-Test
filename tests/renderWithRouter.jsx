import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const renderWithRouter = (ui, { route = '/', path = '/' } = {}) => {
	// window.history.pushState({}, 'Test page', route);

	return {
		...render(
			<MemoryRouter initialEntries={[route]}>
				<Routes>
					<Route path={path} element={ui} />
				</Routes>
			</MemoryRouter>,
		),
	};
};
