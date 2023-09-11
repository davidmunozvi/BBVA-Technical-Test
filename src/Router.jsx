import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardFactory from '@/sections/dashboard/DashboardFactory';
import DetailFactory from '@/sections/detail/DetailFactory';
import Layout from '@/sections/layout/Layout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <DashboardFactory />,
			},
			{
				path: '/detail/:name/:country',
				element: <DetailFactory />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
