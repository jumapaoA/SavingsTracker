import Dashboard from './pages/Dashboard';
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Counter from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";

import Chart from './pages/Chart';
import Deposits from './pages/Deposits';
import Orders from './pages/Orders';

const AppRoutes = [
    {
        index: true,
        element: <Dashboard />
    },
    {
        path: '/orders',
        element: <Orders />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
