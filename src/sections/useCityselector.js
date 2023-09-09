import { useState, useEffect } from 'react';
import { getAllCities } from '@/modules/cities/application/getAll';
import { isCityNameValid } from '@/modules/cities/domain/City';
import { ensureCityIsValid } from '@/modules/cities/domain/City';

export function useCitySelector({ search, repository }) {
	const [cities, setCities] = useState([]);

	useEffect(() => {
		if (!isCityNameValid(search)) {
			resetCities();
			return;
		}

		const timeoutId = setTimeout(() => {
			getAllCities(repository)(search).then(data => setCities(data || []));
		}, 400);
		return () => clearTimeout(timeoutId);
	}, [search]);

	const resetCities = () => {
		setCities([]);
	};

	const selectCity = city => {
		ensureCityIsValid(city);
		console.log(city);
	};

	return { cities, selectCity };
}
