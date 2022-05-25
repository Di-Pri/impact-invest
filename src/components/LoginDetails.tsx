import React, { useState, useEffect, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";

export interface LoginDetailsProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  registerEmail: string;
  setRegisterEmail: Dispatch<SetStateAction<string>>;
  registerPassword: string;
  setRegisterPassword: Dispatch<SetStateAction<string>>;
  inputNameError: string;
  setInputNameError: Dispatch<SetStateAction<string>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const LoginDetails: React.FC<LoginDetailsProps> = (props) => {
  const [inputEmailName, setInputEmailName] = useState<boolean>(false);
  const [inputPasswordName, setInputPasswordName] = useState<boolean>(false);

  const navigate = useNavigate();

  //  Focus input by clicking input name
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);

  const focusEmailInput = () => {
    emailInput.current?.focus();
  };
  const focusPasswordInput = () => {
    passwordInput.current?.focus();
  };

  // Disabling the button when input field is empty
  useEffect(() => {
    if (props.userData.email.length !== 0 && props.userData.password.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  return (
    <div>
      <div className="details-section">
        <div className={inputEmailName || props.registerEmail ? "input-names-up" : "input-names-down"} onClick={focusEmailInput}>
          <p>Email</p>
        </div>
        <input
          className="input-text"
          type="email"
          ref={emailInput}
          value={props.userData.email}
          onFocus={() => {
            setInputEmailName(true);
          }}
          onBlur={() => {
            setInputEmailName(false);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.setRegisterEmail(e.target.value);
            props.setInputNameError("");
            props.setUserData({ ...props.userData, email: e.target.value });
          }}
        />
        {props.inputNameError.includes("invalid-email") ? (
          <div className="input-error-message">Please enter a valid email address</div>
        ) : null}
        {props.inputNameError.includes("email-already-in-use") ? (
          <div className="input-error-message">
            User with this email already exists.<span onClick={() => navigate("/login")}>Log in?</span>
          </div>
        ) : null}

        <div className={inputPasswordName || props.registerPassword ? "input-names-up" : "input-names-down"} onClick={focusPasswordInput}>
          <p>Password</p>
        </div>
        <input
          className="input-text"
          type="Password"
          ref={passwordInput}
          value={props.userData.password}
          onFocus={() => {
            setInputPasswordName(true);
          }}
          onBlur={() => {
            setInputPasswordName(false);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.setRegisterPassword(e.target.value);
            props.setInputNameError("");
            props.setUserData({ ...props.userData, password: e.target.value });
          }}
        />
        {props.inputNameError.includes("weak-password") ? (
          <div className="input-error-message">Please provide stronger password</div>
        ) : null}
      </div>
    </div>
  );
};

export default LoginDetails;
