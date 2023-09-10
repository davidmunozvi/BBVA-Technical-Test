import React from 'react';
import CitiesSearch from '@/sections/dashboard/CitiesSearch';

function Dashboard({ citiesRepository }) {
	return (
		<>
			<CitiesSearch repository={citiesRepository} />
		</>
	);
}

export default Dashboard;
