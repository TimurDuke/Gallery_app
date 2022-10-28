import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />;
};

export default ProtectedRoute;