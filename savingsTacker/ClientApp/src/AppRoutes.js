import Dashboard from './pages/Dashboard';
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Contributor from "./components/Contributor";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";

import Chart from './pages/Chart';
import Deposits from './pages/Deposits';
import Savings from './pages/Savings';

const AppRoutes = [
    {
        index: true,
        element: <Dashboard />
    },
    {
        path: '/saving',
        element: <Savings />
    },
    {
        path: '/contributor',
        element: <Contributor />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
