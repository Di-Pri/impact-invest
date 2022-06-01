import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { MainLogo, IIText } from "../assets";
import PopUp from "../components/PopUp";
import { CSSTransition } from "react-transition-group";

const ResetPassword: React.FC = (props) => {
  const [email, setEmail] = useState<string>("");
  const [inputEmailName, setInputEmailName] = useState<boolean>(false);
  const [inputNameError, setInputNameError] = useState<string>("");
  const [popUpOpen, setPopUpOpen] = useState(false);

  const navigate = useNavigate();

  const auth = getAuth();
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setPopUpOpen(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage", errorMessage);
        setInputNameError(error.message);
      });
  };

  // Focus input by clicking input name
  const emailInput = useRef<HTMLInputElement | null>(null);
  const focusEmailInput = () => {
    emailInput.current?.focus();
  };

  // Passing refs to CSSTransition component
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  return (
    <div className="login-page">
      <section className="main-logo">
        <MainLogo />
        <div>
          <IIText />
        </div>
      </section>

      <section>
        <div className="login-inputs reset-password">
          <div className={inputEmailName || email ? "input-names-up" : "input-names-down"} onClick={focusEmailInput}>
            <p>Email</p>
          </div>
          <input
            className="input-text"
            type="email"
            ref={emailInput}
            id="login-email"
            maxLength={30}
            onFocus={() => {
              setInputEmailName(true);
            }}
            onBlur={() => {
              setInputEmailName(false);
            }}
            onChange={(event) => {
              setEmail(event.target.value);
              setInputNameError("");
            }}
          />
          {inputNameError.includes("invalid-email") ? <div className="input-error-message">Please enter a valid email address</div> : null}
          {inputNameError.includes("user-not-found") ? <div className="input-error-message">There is no user with this email.</div> : null}
        </div>

        <button onClick={() => navigate("/login")} className="text-button">
          Back to login
        </button>

        <button className="large-button" disabled={!email} onClick={resetPassword}>
          Reset password
        </button>

        <div className="no-account">
          <p>Don't have an account?</p>
          <button className="text-button" onClick={() => navigate("/register")}>
            Sign up
          </button>
        </div>
      </section>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert2" unmountOnExit nodeRef={ref1}>
        <div className="blur-background" ref={ref1}></div>
      </CSSTransition>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert" unmountOnExit nodeRef={ref2}>
        <PopUp
          hey="Hey"
          setPopUpOpen={setPopUpOpen}
          nodeRef={ref2}
          navigateToLogin="yes"
          message="We have sent an email with password reset instructions. See you soon!"
        />
      </CSSTransition>
    </div>
  );
};

export default ResetPassword;
