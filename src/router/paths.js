export const PATHS = {
	dashboard: '/',
	detail: '/detail/:name/:country',
};

export const getDetailPath = ({ name, country, coordinates }) => {
	const mainPath = PATHS.detail
		.replace(':name', name)
		.replace(':country', country);
	return `${mainPath}?coordinates=${coordinates}`;
};
