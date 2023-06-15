import { useRoutes } from 'react-router-dom';
import HiringFormComponent from './Hiring';
import Home from './Home';
import Register from './Register';
import Fixtures from './Fixtures';
import Results from './Results';
import PointsTable from './PointsTable';
import Login from './Login';
import CoordinatorComponent from './Coordinator';
import AdminPanel from './Admin';
import SignupForm from './Signup';
export default function RouteComponent() {
  //   const { token } = useUser();
  const routes = useRoutes([
    {
      path: '/hiring',
      element: <HiringFormComponent />,
    },

    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/points-table',
      element: <PointsTable />,
    },

    {
      path: '/results',
      element: <Results />,
    },
    {
      path: '/fixtures',
      element: <Fixtures />,
    },

    {
      path: '/team-register',
      element: <Register />,
    },

    {
      path: '/coordinator-dashboard',
      element: <CoordinatorComponent />,
    },

    {
      path: '/admin-dashboard',
      element: <AdminPanel />,
    },

    {
      path: '/signup',
      element: <SignupForm />,
    },
  ]);

  return routes;
}
