import React, { useEffect, useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";
import { DoneIcon } from "../assets";

export interface CountryOfResidenceProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const CountryOfResidence: React.FC<CountryOfResidenceProps> = (props) => {
  // Disabling the button when input field is empty
  useEffect(() => {
    if (props.userData.country.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  return (
    <div>
      <input
        type="text"
        value={props.userData.country}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, country: e.target.value })}
      />
    </div>
  );
};

export default CountryOfResidence;
