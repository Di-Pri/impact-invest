import React, { useEffect, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import NumberFormat from "react-number-format";
import { User } from "../types/User";

export interface DateOfBirthProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setUserTooYoungError: Dispatch<SetStateAction<boolean>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
  inputNameError: string;
  setInputNameError: Dispatch<SetStateAction<string>>;
}

const DateOfBirth: React.FC<DateOfBirthProps> = (props) => {
  useEffect(() => {
    // Disabling the button when input field is not completed
    if (
      !props.userData.dateOfBirth.includes("_") &&
      props.userData.dateOfBirth.length !== 0 &&
      !props.inputNameError.includes("Invalid date")
    ) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }

    // Validating date and users age
    const splitDate = props.userData.dateOfBirth.split("/");
    const day = Number(splitDate[0]);
    const month = Number(splitDate[1]) - 1;
    const year = Number(splitDate[2]);
    let birthDate = new Date(year, month, day);

    // Validating date format
    if (year > 2021 || year < 1900 || month > 11 || day > 31) {
      console.log("Invalid date");
      props.setInputNameError("Invalid date");
    } else {
      props.setInputNameError("");
    }

    //Checking if the user older than 18
    function meetsMinimumAge(birthDate: any) {
      let tempDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
      return tempDate <= new Date();
    }
    if (meetsMinimumAge(birthDate)) {
      console.log("Ok age");
      props.setUserTooYoungError(false);
    } else {
      console.log("Too young");
      props.setUserTooYoungError(true);
    }
  }, [props]);

  // Passing refs to NumberFormat component
  const inputRef = useRef(null);

  return (
    <div className="date-of-birth">
      <NumberFormat
        ref={inputRef}
        className="date-of-birth-input"
        id="date-of-birth-input"
        displayType="input"
        type="tel"
        allowEmptyFormatting
        mask="_"
        format="##/##/####"
        allowNegative={false}
        value={props.userData.dateOfBirth}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          props.setUserData({ ...props.userData, dateOfBirth: e.target.value });
        }}
      />
      {props.inputNameError.includes("Invalid date") ? <div className="input-error-message">Please enter correct date</div> : null}
    </div>
  );
};

export default DateOfBirth;
