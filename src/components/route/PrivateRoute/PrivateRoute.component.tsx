import { ReactNode, useEffect } from 'react';
import { RouteType } from '../../../types/Common.type';
import { APP_ROUTES } from '@/utils/constants/route.constant';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    routeType: RouteType;
    privileges?: string[];
    children: ReactNode;
}

const PrivateRoute = ({ routeType, children }: PrivateRouteProps) => {
    //   const { isAuthenticated } = useAuth();
    const isAuthenticated = false;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(`/public/${APP_ROUTES.LOGIN}`);
        }
    }, [navigate, routeType, isAuthenticated]);

    return routeType == RouteType.Authenticated ? children : 'Not Authenticated';
};

export default PrivateRoute;
