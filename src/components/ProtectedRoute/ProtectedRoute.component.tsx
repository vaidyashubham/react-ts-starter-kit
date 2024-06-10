import { ReactNode } from 'react';
import { RouteType } from '../../types/Common.type';

interface ProtectedRouteProps {
    routeType: RouteType;
    privileges?: string[];
    children: ReactNode;
}

const ProtectedRoute = ({ routeType, children }: ProtectedRouteProps) => {
    //   const { isAuthenticated } = useAuth();
    return routeType == RouteType.Authenticated ? children : 'Not Authenticated';
};

export default ProtectedRoute;
