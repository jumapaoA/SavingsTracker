import Dashboard from './pages/Dashboard';
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Contributor from "./components/Contributor";
import { FetchData } from "./components/FetchData";
import ActivityLog from './pages/ActivityLog';
import Reports from './pages/Reports';
import Savings from './pages/Savings';

const AppRoutes = [
    {
        index: true,
        requireAuth: true,
        element: <Dashboard />
    },
    {
        path: '/saving',
        requireAuth: true,
        element: <Savings />
    },
    {
        path: '/contributor',
        requireAuth: true,
        element: <Contributor />
    },
    {
        path: '/activities',
        element: <ActivityLog />
    },
    {
        path: '/reports',
        requireAuth: true,
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
