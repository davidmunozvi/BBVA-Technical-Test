import { IconList } from '@/sections/shared/Icons';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
	return (
		<>
			<header>
				{
					<Link to='/'>
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
