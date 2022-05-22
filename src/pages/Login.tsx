import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";
import { MainLogo, IIText } from "../assets";

export interface LoginProps {}

const LoginPage: React.FC<LoginProps> = (props) => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [inputEmailName, setInputEmailName] = useState<boolean>(false);
  const [inputPasswordName, setInputPasswordName] = useState<boolean>(false);
  const [inputNameError, setInputNameError] = useState<string>("");

  console.log("user", user);
  console.log("inputNameError", inputNameError);
  const navigate = useNavigate();

  // Checking if there is a logged in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser !== null) {
        navigate("/");
      }
    });
  }, [navigate]);

  // Log in user function
  const login = async () => {
    setInputEmailName(false);
    setInputPasswordName(false);
    try {
      const loggedUser = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setInputNameError(error.message);
      }
    }
  };

  // Focus input by clicking input name
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);

  const focusEmailInput = () => {
    emailInput.current?.focus();
  };

  const focusPasswordInput = () => {
    passwordInput.current?.focus();
  };

  return (
    <div className="login-page">
      <section className="main-logo">
        <MainLogo />
        <div>
          <IIText />
        </div>
      </section>

      <section>
        <div className="login-inputs">
          <div className={inputEmailName || loginEmail ? "input-names-up" : "input-names-down"} onClick={focusEmailInput}>
            <p className={inputNameError.includes("invalid-email") || inputNameError.includes("user-not-found") ? "shake-input-name" : ""}>
              Email
            </p>
          </div>
          <input
            className="input-text"
            type="email"
            ref={emailInput}
            onFocus={(e) => {
              setInputEmailName(true);
            }}
            onBlur={(e) => {
              setInputEmailName(false);
            }}
            onChange={(event) => {
              setLoginEmail(event.target.value);
              setInputNameError("");
            }}
          />

          <div className={inputPasswordName || loginPassword ? "input-names-up" : "input-names-down"} onClick={focusPasswordInput}>
            <p className={inputNameError.includes("wrong-password") ? "shake-input-name" : ""}>Password</p>
          </div>
          <input
            className="input-text"
            type="Password"
            ref={passwordInput}
            onFocus={(e) => {
              setInputPasswordName(true);
            }}
            onBlur={(e) => {
              setInputPasswordName(false);
            }}
            onChange={(event) => {
              setLoginPassword(event.target.value);
              setInputNameError("");
            }}
          />
        </div>

        <button className="text-button">Forgot password?</button>

        <button className="large-button" disabled={!loginEmail || !loginPassword} onClick={login}>
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
