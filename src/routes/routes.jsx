import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import AllToys from '../pages/AllToys/AllToys';
import Error from '../pages/Error/Error';
import Blogs from '../pages/Blogs/Blogs';
import ToyDetails from '../pages/ToyDetails/ToyDetails';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import MyToys from '../pages/MyToys/MyToys';
import AddToys from '../pages/AddToys/AddToys';
import PrivateRoute from './PrivateRoute';

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/all-toys',
				element: <AllToys />,
				loader: () =>
					fetch('https://brainiac-toys-server.vercel.app/toys'),
			},
			{
				path: '/toy/:id',
				element: (
					<PrivateRoute>
						<ToyDetails />
					</PrivateRoute>
				),
				loader: ({ params }) =>
					fetch(
						`https://brainiac-toys-server.vercel.app/toy/${params.id}`
					),
			},
			{
				path: '/my-toys',
				element: (
					<PrivateRoute>
						<MyToys />
					</PrivateRoute>
				),
			},
			{
				path: '/add-toy',
				element: (
					<PrivateRoute>
						<AddToys />
					</PrivateRoute>
				),
			},
			{
				path: '/sign-up',
				element: <SignUp />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/blogs',
				element: <Blogs />,
			},
		],
	},
]);
