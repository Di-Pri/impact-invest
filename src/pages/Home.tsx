import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";

export interface HomeProps {}

const HomePage: React.FC<HomeProps> = (props) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("homeUser", currentUser);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <p>Home Page</p>

      <h4>User logged in:</h4>
      {user?.email}

      <button onClick={logout}>Sign out</button>
    </div>
  );
};

export default HomePage;
