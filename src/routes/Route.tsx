import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { RouteType } from '@/types/Common.type';
import { APP_ROUTES } from '@/utils/constants/route.constant';
import { HomePage, LoginPage, PageNotFound } from '@/pages';
import PublicRoute from '@/components/route/PublicRoute/PublicRoute.component';
import PrivateRoute from '@/components/route/PrivateRoute/PrivateRoute.component';

const ROUTES: RouteObject[] = [
    {
        path: APP_ROUTES.ROOT,
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: 'public',
        children: [
            {
                path: APP_ROUTES.LOGIN,
                element: (
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                ),
            },
        ],
    },
    {
        path: 'private',
        children: [
            {
                path: APP_ROUTES.HOME,
                element: (
                    <PrivateRoute routeType={RouteType.Authenticated}>
                        <HomePage />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: APP_ROUTES.WILDCARD,
        children: [
            {
                path: APP_ROUTES.WILDCARD,
                element: <PageNotFound />,
            },
        ],
    },
];
export const routes = createBrowserRouter(ROUTES);
