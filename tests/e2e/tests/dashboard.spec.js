/* eslint-disable no-undef */
import translations from '../../../src/translations';
describe('The dashboard', () => {
	it('find a city and navigate to the detail with the correct option', () => {
		const city = 'Madrid';

		cy.visit('/');
		cy.get(
			`input[placeholder="${translations.dashboard.input_search_placeholder}"]`,
		).type('Madrid');
		cy.contains(city).click();
		cy.contains(city).should('exist');
	});
});
