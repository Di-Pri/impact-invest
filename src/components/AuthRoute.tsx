import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return <>{children}</>;
};

export default AuthRoute;
