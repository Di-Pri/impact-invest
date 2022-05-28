import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";
import BottomNavigation from "../components/BottomNavigation";

export interface MenuProps {}

const MenuPage: React.FC<MenuProps> = (props) => {
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
    <div className="menu-page">
      <p>Menu page</p>
      <h4>User logged in:</h4>
      {user?.email}

      <button onClick={logout}>Sign out</button>
      <BottomNavigation />
    </div>
  );
};

export default MenuPage;
