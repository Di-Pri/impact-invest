import React, { Dispatch, SetStateAction, MutableRefObject } from "react";
import { CrossIcon } from "../assets";

export interface PopUpProps {
  setPopUpOpen: Dispatch<SetStateAction<boolean>>;
  nodeRef: MutableRefObject<null>;
}

const PopUp: React.FC<PopUpProps> = (props) => {
  return (
    <div className="pop-up" ref={props.nodeRef}>
      <div className="message">
        <h2>Hey!</h2>
        <p>At the moment we only offer our services to residents of Denmark, Sweden and Norway.</p>

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
