import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardFactory from '@/sections/dashboard/DashboardFactory';
import DetailFactory from '@/sections/detail/DetailFactory';

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '/',
				element: <DashboardFactory />,
			},
			{
				path: '/detail/:city/:country',
				element: <DetailFactory />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
