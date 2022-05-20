import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";

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
    <div>
      <p>Login Page</p>

      <div>
        <h3>Log in</h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}>Log in</button>

        <h4>Don't have an account?</h4>
        <button onClick={() => navigate("/register")}>Sign up</button>
      </div>
    </div>
  );
};

export default LoginPage;
