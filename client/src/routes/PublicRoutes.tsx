import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type RootState } from "../app/store";

const PrivateRoute = ({ children, }: { children: React.ReactNode; }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    if (user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default PrivateRoute;