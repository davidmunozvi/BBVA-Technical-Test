import { useState } from 'react';
import { useCitySelector } from '@/sections/dashboard/useCityselector';
import { isCityNameValid } from '@/modules/cities/domain/City';

function CitiesSearch({ repository }) {
	const [value, setValue] = useState('');
	const { cities, selectCity } = useCitySelector({ search: value, repository });

	const handleSetSelectedCity = city => {
		selectCity(city);
	};

	const renderError = () => {
		return value && !isCityNameValid(value) && <span>Error</span>;
	};

	const renderOptions = cities =>
		Boolean(cities?.length) ? (
			<ul>
				{cities.map(city => (
					<li onClick={() => handleSetSelectedCity(city)} key={city.id}>
						{city.name} {city.country}
					</li>
				))}
			</ul>
		) : (
			<span>...loading</span>
		);

	return (
		<div>
			<label htmlFor='search'>Search city</label>
			<input
				name='search'
				id='search'
				type='text'
				onChange={e => setValue(e.target.value)}
				value={value}
			/>
			{renderError()}
			{isCityNameValid(value) && renderOptions(cities)}
		</div>
	);
}

export default CitiesSearch;
