import React, { useEffect, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import NumberFormat from "react-number-format";
import { User } from "../types/User";

export interface PersonaNumberProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const PersonaNumber: React.FC<PersonaNumberProps> = (props) => {
  useEffect(() => {
    // Disabling the button when input field is not completed
    if (!props.userData.personalNumber.includes("_") && props.userData.personalNumber.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  // Passing refs to NumberFormat component
  const inputRef = useRef(null);

  return (
    <div className="personal-number">
      <NumberFormat
        ref={inputRef}
        className="personal-number-input"
        id="personal-number-input"
        displayType="input"
        type="tel"
        allowEmptyFormatting
        mask="_"
        format="######-####"
        allowNegative={false}
        value={props.userData.personalNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          props.setUserData({ ...props.userData, personalNumber: e.target.value });
        }}
      />
    </div>
  );
};

export default PersonaNumber;
