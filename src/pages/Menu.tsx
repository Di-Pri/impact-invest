import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import HiUser from "../components/HiUser";
import { BackIcon, MainLogo } from "../assets";
import PopUp from "../components/PopUp";
import { CSSTransition } from "react-transition-group";
import { userObjectContext } from "../App";

const MenuPage = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);

  const userObject = useContext(userObjectContext);

  const navigate = useNavigate();

  // Passing refs to CSSTransition component
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  return (
    <div className="menu-page">
      <div>
        <HiUser title="Dear" text="Manage your account here" />
        <section className="menu-buttons">
          <button onClick={() => navigate("/uservaluesupdate")}>
            <p>My values</p>
            <BackIcon />
          </button>
          <button
            onClick={() => {
              setPopUpOpen(true);
            }}
          >
            <p>Log out</p>
            <BackIcon />
          </button>
        </section>
      </div>
      <section className="logo">
        <MainLogo />
      </section>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert2" unmountOnExit nodeRef={nodeRef}>
        <div className="blur-background" ref={nodeRef}></div>
      </CSSTransition>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert" unmountOnExit nodeRef={nodeRef2}>
        <PopUp
          setPopUpOpen={setPopUpOpen}
          nodeRef={nodeRef2}
          hey={userObject?.firstName}
          message="Are you sure you want to log out?"
          logout="Log out"
        />
      </CSSTransition>

      <BottomNavigation />
    </div>
  );
};

export default MenuPage;
