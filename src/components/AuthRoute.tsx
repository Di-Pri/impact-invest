import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoutePage: React.FC<AuthRouteProps> = (props) => {
  const { children } = props;
  // const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log("unauthorized");
        navigate("/login");
      }
    });
    return () => AuthCheck();
  }, [auth]);

  if (loading) return <p>loading...</p>;

  return <>{children}</>;
};

export default AuthRoutePage;
