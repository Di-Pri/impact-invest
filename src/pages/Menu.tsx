import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import BottomNavigation from "../components/BottomNavigation";
import HiUser from "../components/HiUser";
import { BackIcon } from "../assets";

export interface MenuProps {}

const MenuPage: React.FC<MenuProps> = (props) => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="menu-page">
      <HiUser title="Dear" text="Manage your account here" />
      <section className="menu-buttons">
        <button onClick={() => navigate("/uservaluesupdate")}>
          <p>My values</p>
          <BackIcon />
        </button>
        <button>
          <p>My info</p>
          <BackIcon />
        </button>
        <button>
          <p>Withdraw funds</p>
          <BackIcon />
        </button>
        <button>
          <p>Help</p>
          <BackIcon />
        </button>
        <button>
          <p>Logout</p>
          <BackIcon />
        </button>
      </section>

      <button onClick={logout}>Sign out</button>
      <BottomNavigation />
    </div>
  );
};

export default MenuPage;
