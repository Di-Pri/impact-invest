import React, { useEffect, useState, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";
import PopUp from "./PopUp";
import { CSSTransition } from "react-transition-group";

export interface CountryOfResidenceProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const CountryOfResidence: React.FC<CountryOfResidenceProps> = (props) => {
  const [popUpOpen, setPopUpOpen] = useState(false);

  // Disabling the button when input field is empty
  useEffect(() => {
    if (props.userData.country.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
    if (props.userData.country === "Other") {
      props.setButtonDisabled(true);
    }
  }, [props]);

  // Passing nodeRef to CSSTransition
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  return (
    <div className="country-of-residence">
      <label>
        Denmark
        <span className={props.userData.country === "Denmark" ? "showCheckMark" : ""}></span>
        <input
          type="radio"
          value="Denmark"
          name="country"
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, country: e.target.value })}
        />
      </label>
      <label>
        Sweden
        <span className={props.userData.country === "Sweden" ? "showCheckMark" : ""}></span>
        <input
          type="radio"
          value="Sweden"
          name="country"
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, country: e.target.value })}
        />
      </label>
      <label>
        Norway
        <span className={props.userData.country === "Norway" ? "showCheckMark" : ""}></span>
        <input
          type="radio"
          value="Norway"
          name="country"
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, country: e.target.value })}
        />
      </label>
      <label>
        Other
        <input
          type="radio"
          value="Other"
          name="country"
          onClick={() => {
            setPopUpOpen(true);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.setUserData({ ...props.userData, country: e.target.value });
          }}
        />
      </label>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert2" unmountOnExit nodeRef={nodeRef2}>
        <div className="blur-background" ref={nodeRef2}></div>
      </CSSTransition>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert" unmountOnExit nodeRef={nodeRef}>
        <PopUp setPopUpOpen={setPopUpOpen} nodeRef={nodeRef} />
      </CSSTransition>
    </div>
  );
};

export default CountryOfResidence;
