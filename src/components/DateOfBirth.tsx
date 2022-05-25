import React, { useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";

export interface DateOfBirthProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const DateOfBirth: React.FC<DateOfBirthProps> = (props) => {
  // Disabling the button when input field is empty
  useEffect(() => {
    if (props.userData.dateOfBirth.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  return (
    <div>
      <div>Date Of Birth</div>

      <input
        type="text"
        value={props.userData.dateOfBirth}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, dateOfBirth: e.target.value })}
      />
    </div>
  );
};

export default DateOfBirth;
