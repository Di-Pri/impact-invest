import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";
import { MainLogo } from "../assets/MainLogo";

export interface LoginProps {}

const LoginPage: React.FC<LoginProps> = (props) => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser !== null) {
        navigate("/");
      }
    });
  }, []);

  const login = async () => {
    try {
      const loggedUser = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log("loggedUser", loggedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <section className="main-logo">
        <MainLogo />
        <h1>Impact Invest</h1>
      </section>

      <section className="login-details">
        <div className="login-inputs">
          <input
            placeholder="Email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            placeholder="Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
        </div>

        <button className="text-button">Forgot password?</button>

        <button className="large-button" onClick={login}>
          Log in
        </button>

        <div className="no-account">
          <p>Don't have an account?</p>
          <button className="text-button" onClick={() => navigate("/register")}>
            Sign up
          </button>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
