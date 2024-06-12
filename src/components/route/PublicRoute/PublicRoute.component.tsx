import { APP_ROUTES } from '@/utils/constants/route.constant';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    // TODO: Replace with actual login check
    const isLoggedIn = false;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/private/${APP_ROUTES.HOME}`);
        } else {
            navigate(`/public/${APP_ROUTES.LOGIN}`);
        }
    }, [isLoggedIn, navigate]);

    return !isLoggedIn ? children : null;
};

export default PublicRoute;
