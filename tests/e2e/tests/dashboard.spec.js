/* eslint-disable no-undef */
import translations from '../../../src/translations';

const { dashboard } = translations;
describe('The dashboard', () => {
	it('find a city and navigate to the detail with the correct option', () => {
		const city = 'Madrid';

		cy.visit('/');
		cy.get(`input[placeholder="${dashboard.input_search_placeholder}"]`).type(
			'Madrid',
		);
		cy.intercept('**/search**').as('citiesList');
		cy.wait('@citiesList');
		cy.contains(city).click();
		cy.contains(city).should('exist');
	});
});
