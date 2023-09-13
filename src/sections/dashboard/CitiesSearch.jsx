import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
	transformCoordinatesToUrlParam,
	isCityNameValid,
} from '@/modules/cities/domain/City';
import { useCitySelector } from '@/sections/dashboard/useCityselector';
import { getDetailPath } from '@/router/paths';

function CitiesSearch({ repository }) {
	const [value, setValue] = useState('');
	const { cities } = useCitySelector({ search: value, repository });

	const renderError = () => {
		return value && !isCityNameValid(value) && <span>Error</span>;
	};

	const renderOptions = cities =>
		cities?.length ? (
			<ul>
				{cities.map(city => (
					<li key={city.id}>
						<Link
							to={getDetailPath({
								name: city.name,
								country: city.country,
								coordinates: transformCoordinatesToUrlParam(city.coordinates),
							})}
						>
							{city.name} {city.country}
						</Link>
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
