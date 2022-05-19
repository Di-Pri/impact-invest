import React from "react";
import { useNavigate } from "react-router-dom";

export interface LoginProps {}

const LoginPage: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Login Page</p>
      <button onClick={() => navigate("/")}>Home page</button>
    </div>
  );
};

export default LoginPage;
