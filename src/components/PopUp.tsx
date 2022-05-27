import React, { Dispatch, SetStateAction, MutableRefObject } from "react";
import { useNavigate } from "react-router-dom";
import { CrossIcon } from "../assets";

export interface PopUpProps {
  setPopUpOpen: Dispatch<SetStateAction<boolean>>;
  nodeRef?: MutableRefObject<null>;
  message: string;
  button?: string;
}

const PopUp: React.FC<PopUpProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div className="pop-up" ref={props.nodeRef}>
      <div className="message">
        <h2>Hey!</h2>
        <p>{props.message}</p>

        {props.button ? (
          <button className="pop-up-button" onClick={() => navigate("/")}>
            {props.button}
          </button>
        ) : null}

        <button
          className="close-button"
          onClick={() => {
            props.setPopUpOpen(false);
          }}
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
};

export default PopUp;
