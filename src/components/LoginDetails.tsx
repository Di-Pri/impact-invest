import React, { useState, useEffect, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { DoneIcon } from "../assets";
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
  const [showPassHelper, setShowPassHelper] = useState<boolean>(false);
  const [passUppercase, setPassUppercase] = useState<boolean>(false);
  const [passLowercase, setPassLowercase] = useState<boolean>(false);
  const [passNumber, setPassNumber] = useState<boolean>(false);
  const [passCharacters, setPassCharacters] = useState<boolean>(false);

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
    if (props.userData.email.length > 2 && passUppercase && passLowercase && passNumber && passCharacters && props.userData.cookies) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }

    // Set up password helper
    // Password contains uppercase letter
    if (/[A-Z]/.test(props.userData.password)) {
      setPassUppercase(true);
    } else {
      setPassUppercase(false);
    }

    // Password contains lowercase letter
    if (/[a-z]/.test(props.userData.password)) {
      setPassLowercase(true);
    } else {
      setPassLowercase(false);
    }

    // Password contains 6 characters
    if (props.userData.password.length > 5) {
      setPassCharacters(true);
    } else {
      setPassCharacters(false);
    }

    // Password contains numbers
    if (/[0-9]/.test(props.userData.password)) {
      setPassNumber(true);
    } else {
      setPassNumber(false);
    }

    // Hiding password helper when all required characters entered
    if (inputPasswordName) {
      if (!passUppercase || !passLowercase || !passNumber || !passCharacters) {
        setShowPassHelper(true);
      } else {
        setShowPassHelper(false);
      }
    }
  }, [props, showPassHelper, passUppercase, passLowercase, passNumber, passCharacters, inputPasswordName]);

  return (
    <div className="login-details">
      <section>
        <div
          className={props.registerEmail ? "input-names-up-fixed" : inputEmailName ? "input-names-up" : "input-names-down"}
          onClick={focusEmailInput}
        >
          <p>Email</p>
        </div>
        <input
          className="input-text"
          type="email"
          ref={emailInput}
          id="signup-email"
          maxLength={30}
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
      </section>

      <section>
        <div
          className={props.registerPassword ? "input-names-up-fixed" : inputPasswordName ? "input-names-up" : "input-names-down"}
          onClick={focusPasswordInput}
        >
          <p>Password</p>
        </div>
        <input
          className="input-text"
          type="password"
          ref={passwordInput}
          id="signup-password"
          maxLength={30}
          value={props.userData.password}
          onFocus={() => {
            setInputPasswordName(true);
            setShowPassHelper(true);
          }}
          onBlur={() => {
            setInputPasswordName(false);
            setShowPassHelper(false);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.setRegisterPassword(e.target.value);
            props.setInputNameError("");
            props.setUserData({ ...props.userData, password: e.target.value });
          }}
        />
        {showPassHelper ? (
          <div className="password-helper">
            <h4>Password must contain:</h4>
            <p className={passNumber ? "green" : ""}>
              <span>{passNumber ? <DoneIcon /> : "-"}</span> 1 number
            </p>
            <p className={passUppercase ? "green" : ""}>
              <span>{passUppercase ? <DoneIcon /> : "-"}</span> 1 uppercase letter
            </p>
            <p className={passLowercase ? "green" : ""}>
              <span>{passLowercase ? <DoneIcon /> : "-"}</span> 1 lowercase letter
            </p>
            <p className={passCharacters ? "green" : ""}>
              <span>{passCharacters ? <DoneIcon /> : "-"}</span> 6 characters
            </p>
          </div>
        ) : null}
      </section>
      <section className="cookies">
        <label className="container">
          <input
            type="checkbox"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              props.setUserData({ ...props.userData, cookies: e.target.checked });
            }}
          />
          <span className="checkmark"></span>
        </label>

        <p>
          I accept the <span>Privacy Policy</span> and <span>Cookies Policy</span>
        </p>
      </section>
    </div>
  );
};

export default LoginDetails;
