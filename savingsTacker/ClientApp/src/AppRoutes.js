import Dashboard from './pages/Dashboard';
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Contributor from "./components/Contributor";
import { FetchData } from "./components/FetchData";
import ActivityLog from './pages/ActivityLog';
import Reports from './pages/Reports';
import Savings from './pages/Savings';
import Members from './pages/Members';
import { SuccessModal, UnsuccessModal } from './components/Modal';

const AppRoutes = [
    {
        index: true,
        requireAuth: true,
        path: '/',
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
        path: '/member',
        requireAuth: true,
        element: <Members />
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
    {
        path: '/success',
        requireAuth: true,
        element: <SuccessModal />
    },
    {
        path: '/notsuccess',
        requireAuth: true,
        element: <UnsuccessModal />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
