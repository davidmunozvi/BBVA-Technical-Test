import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardFactory from '@/sections/dashboard/DashboardFactory';

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '/',
				element: <DashboardFactory />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
