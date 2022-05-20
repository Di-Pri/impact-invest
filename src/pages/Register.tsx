import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";

export interface RegisterProps {}

const RegisterPage: React.FC<RegisterProps> = (props) => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
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

  const register = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log("newUser", newUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>Register Page</p>

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
