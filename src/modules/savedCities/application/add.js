import { createSavedCity } from '../domain/savedCity';

export const addSavedCityUseCase = repository => {
	return city => {
		return repository.save(createSavedCity(city));
	};
};
