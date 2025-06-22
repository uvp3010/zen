import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // or use a better auth strategy
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location, hackerMode: true }} 
      />
    );
  }

  return children;
};

export default ProtectedRoute;
