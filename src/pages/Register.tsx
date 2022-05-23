import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";
import TopNavigation from "../components/TopNavigation";
import RegisterSteps from "../components/RegisterSteps";
import RegisterHeader from "../components/RegisterHeader";

export interface RegisterProps {}

const RegisterPage: React.FC<RegisterProps> = (props) => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
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

  // Register user function
  const register = async () => {
    setInputEmailName(false);
    setInputPasswordName(false);
    try {
      const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log("newUser", newUser);
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
    <div className="register-page">
      <div className="details-section">
        <section className="register-header">
          <TopNavigation sendToPage="/login" />
        </section>

        <section>
          <RegisterSteps numberOfDots={5} />
        </section>

        <section>
          <RegisterHeader headerText="Login details" />
        </section>

        <section className="register-inputs">
          <div className={inputEmailName || registerEmail ? "input-names-up" : "input-names-down"} onClick={focusEmailInput}>
            <p>Email</p>
          </div>
          <input
            className="input-text"
            type="email"
            ref={emailInput}
            onFocus={() => {
              setInputEmailName(true);
            }}
            onBlur={() => {
              setInputEmailName(false);
            }}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
              setInputNameError("");
            }}
          />
          {inputNameError.includes("invalid-email") ? <div className="input-error-message">Please enter a valid email address</div> : null}
          {inputNameError.includes("email-already-in-use") ? (
            <div className="input-error-message">
              User with this email already exists.<span onClick={() => navigate("/login")}>Log in?</span>
            </div>
          ) : null}

          <div className={inputPasswordName || registerPassword ? "input-names-up" : "input-names-down"} onClick={focusPasswordInput}>
            <p>Password</p>
          </div>
          <input
            className="input-text"
            type="Password"
            ref={passwordInput}
            onFocus={() => {
              setInputPasswordName(true);
            }}
            onBlur={() => {
              setInputPasswordName(false);
            }}
            onChange={(event) => {
              setRegisterPassword(event.target.value);
              setInputNameError("");
            }}
          />
          {inputNameError.includes("weak-password") ? <div className="input-error-message">Please provide stronger password</div> : null}
        </section>
      </div>

      <div className="button-section">
        <button className="large-button" disabled={!registerEmail || !registerPassword} onClick={register}>
          Create user
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
