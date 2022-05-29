import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import BottomNavigation from "../components/BottomNavigation";
import HiUser from "../components/HiUser";

export interface MenuProps {}

const MenuPage: React.FC<MenuProps> = (props) => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="menu-page">
      <HiUser title="Here is the impact you made" />

      <button onClick={logout}>Sign out</button>
      <BottomNavigation />
    </div>
  );
};

export default MenuPage;
