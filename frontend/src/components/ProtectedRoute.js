import { useLocation, Navigate } from "react-router-dom";


const ProtectedRoute = ({ component, ...props }) => {
    const location = useLocation()
    if (!props.loggedIn) {
        return <Navigate to="/sign-in" state={{ from: location }} />
    }
    return component
};

export default ProtectedRoute;