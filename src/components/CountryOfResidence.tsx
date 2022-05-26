import React, { useEffect, useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";
import PopUp from "./PopUp";

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
      {popUpOpen ? <PopUp setPopUpOpen={setPopUpOpen} /> : null}
    </div>
  );
};

export default CountryOfResidence;
