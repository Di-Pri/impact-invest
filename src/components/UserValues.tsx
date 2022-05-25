import React, { useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";

export interface UserValuesProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const UserValues: React.FC<UserValuesProps> = (props) => {
  // Disabling the button when input field is empty
  useEffect(() => {
    if (props.userData.userValues.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  return (
    <div>
      <div>User Values</div>

      <input
        type="text"
        value={props.userData.userValues}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, userValues: e.target.value })}
      />
    </div>
  );
};

export default UserValues;
