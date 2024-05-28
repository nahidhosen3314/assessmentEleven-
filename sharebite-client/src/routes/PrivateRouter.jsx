import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login", { state: location.pathname });
        }
    }, [user, loading, navigate, location]);

    return user ? children : null;
};

export default PrivateRouter;
