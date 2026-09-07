import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // User is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role restriction
    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/movies" replace />;
    }

    return children;
}

export default ProtectedRoute;