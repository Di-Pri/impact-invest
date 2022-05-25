import React, { useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";

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
      <div>Country Of Residence</div>

      <input
        type="text"
        value={props.userData.country}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, country: e.target.value })}
      />
    </div>
  );
};

export default CountryOfResidence;
