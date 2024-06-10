import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/Route';

const AuthApp = () => {
    return <RouterProvider router={routes} />;
};

export default AuthApp;
