import CitiesSearch from '@/sections/dashboard/CitiesSearch';
import SavedCitiesList from '@/sections/dashboard/SavedCitiesList';

function Dashboard({ citiesRepository }) {
	return (
		<>
			<CitiesSearch repository={citiesRepository} />
			<SavedCitiesList />
		</>
	);
}

export default Dashboard;
