import { Outlet, Link } from 'react-router-dom';

import { IconList } from '@/sections/shared/Icons';
import { PATHS } from '@/router/paths';

function Layout() {
	return (
		<>
			<header>
				{
					<Link to={PATHS.dashboard}>
						<IconList />
					</Link>
				}
				<h1>Aplicación del tiempo</h1>
			</header>
			<Outlet />
		</>
	);
}

export default Layout;
