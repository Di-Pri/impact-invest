import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";
import TopNavigation from "../components/TopNavigation";
import RegisterSteps from "../components/RegisterSteps";

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
      <section className="register-header">
        <TopNavigation sendToPage="/login" />
      </section>

      <section>
        <RegisterSteps numberOfDots={5} />
      </section>

      <div>
        <h3>Register user</h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}>Create user</button>
      </div>
    </div>
  );
};

export default RegisterPage;
