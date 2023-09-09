import { useState } from 'react';
import { useCitySelector } from './useCityselector';
import { isCityNameValid } from '@/modules/cities/domain/City';
import { use } from 'chai';

function CitiesSearch({ repository }) {
	const [value, setValue] = useState('');
	const { cities, selectCity } = useCitySelector({ search: value, repository });

	const handleSetSelectedCity = city => {
		selectCity(city);
	};

	const renderError = () => {
		return value && !isCityNameValid(value) && <span>Error</span>;
	};

	return (
		<div>
			<input
				type='text'
				placeholder={'Search city'}
				onChange={e => setValue(e.target.value)}
				value={value}
			/>
			{renderError()}
			{Boolean(cities?.length) && (
				<ul>
					{cities.map(city => (
						<li onClick={() => handleSetSelectedCity(city)} key={city.id}>
							{city.name} {city.country}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default CitiesSearch;
