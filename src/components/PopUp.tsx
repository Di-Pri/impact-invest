import React, { Dispatch, SetStateAction, MutableRefObject } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { CrossIcon } from "../assets";

export interface PopUpProps {
  setPopUpOpen: Dispatch<SetStateAction<boolean>>;
  nodeRef?: MutableRefObject<null>;
  message: string;
  navigateHome?: string;
  hey: string | undefined;
  navigate?: string;
  logout?: string;
  tradeDone?: () => void;
  navigateToPortfolio?: string;
}

const PopUp: React.FC<PopUpProps> = (props) => {
  const navigate = useNavigate();

  // Logout function
  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="pop-up" ref={props.nodeRef}>
      <div className="message">
        <h2>{props.hey}!</h2>
        <p>{props.message}</p>

        {props.navigateHome ? (
          <button className="pop-up-button" onClick={() => navigate("/")}>
            {props.navigateHome}
          </button>
        ) : null}

        {props.navigateToPortfolio ? (
          <button className="pop-up-button" onClick={() => navigate("/portfolio")}>
            {props.navigateToPortfolio}
          </button>
        ) : null}

        {props.logout ? (
          <button className="pop-up-button" onClick={logout}>
            {props.logout}
          </button>
        ) : null}

        {props.tradeDone ? (
          <button className="close-button" onClick={props.tradeDone}>
            <CrossIcon />
          </button>
        ) : (
          <button
            className="close-button"
            onClick={() => {
              props.setPopUpOpen(false);
            }}
          >
            <CrossIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default PopUp;
