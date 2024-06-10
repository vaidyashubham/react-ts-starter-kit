import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { RouteType } from '../types/Common.type';
import { APP_ROUTES } from '../utils/constants/route.constant';
import ProtectedRoute from '../components';
import { HomePage, LoginPage } from '../pages';

const ROUTES: RouteObject[] = [
    {
        path: APP_ROUTES.ROOT,
        element: (
            <ProtectedRoute routeType={RouteType.Authenticated}>
                <LoginPage />
            </ProtectedRoute>
        ),
    },
    {
        path: APP_ROUTES.HOME,
        element: (
            <ProtectedRoute routeType={RouteType.Authenticated}>
                <HomePage />
            </ProtectedRoute>
        ),
    },
];
export const routes = createBrowserRouter(ROUTES);
