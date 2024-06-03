import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoot = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: Auth } }) => state.auth
  );
  return userInfo ? <Outlet /> : <Navigate to={`/login?redirect=/`} />;
};

export default PrivateRoot;
