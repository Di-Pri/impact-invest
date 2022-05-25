import React, { useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";

export interface NameAsInPassportProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const NameAsInPassport: React.FC<NameAsInPassportProps> = (props) => {
  // Disabling the button when input field is empty
  useEffect(() => {
    if (props.userData.firstName.length !== 0 && props.userData.surname.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  return (
    <div>
      <div>Name As In Passport</div>

      <input
        type="text"
        value={props.userData.firstName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, firstName: e.target.value })}
      />
      <input
        type="text"
        value={props.userData.surname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, surname: e.target.value })}
      />
    </div>
  );
};

export default NameAsInPassport;
