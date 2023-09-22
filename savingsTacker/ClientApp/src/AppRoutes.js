import Dashboard from './pages/Dashboard';
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Contributor from "./components/Contributor";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";

import Chart from './pages/Chart';
import ActivityLog from './pages/ActivityLog';
import Reports from './pages/Reports';
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
        path: '/activities',
        element: <ActivityLog />
    },
    {
        path: '/reports',
        element: <Reports />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
