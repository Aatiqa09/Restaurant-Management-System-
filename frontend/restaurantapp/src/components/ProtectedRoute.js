import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const token = localStorage.getItem('access');

    return token ? children : <Navigate to="/" />;
}

export default ProtectedRoute;