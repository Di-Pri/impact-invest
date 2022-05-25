import React, { useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";

export interface PersonaNumberProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const PersonaNumber: React.FC<PersonaNumberProps> = (props) => {
  // Disabling the button when input field is empty
  useEffect(() => {
    if (props.userData.personalNumber.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  return (
    <div>
      <div>Personal Number</div>

      <input
        type="text"
        value={props.userData.personalNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, personalNumber: e.target.value })}
      />
    </div>
  );
};

export default PersonaNumber;
