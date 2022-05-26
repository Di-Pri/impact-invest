import React, { useEffect, useState, useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import { User } from "../types/User";

export interface NameAsInPassportProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const NameAsInPassport: React.FC<NameAsInPassportProps> = (props) => {
  const [inputFirstNameName, setInputFirstNameName] = useState<boolean>(false);
  const [inputSurnameName, setInputSurnameName] = useState<boolean>(false);

  //  Focus input by clicking input name
  const firstNameInput = useRef<HTMLInputElement | null>(null);
  const surnameInput = useRef<HTMLInputElement | null>(null);

  const focusFirstNameInput = () => {
    firstNameInput.current?.focus();
  };
  const focusSurnameInput = () => {
    surnameInput.current?.focus();
  };

  // Disabling the button when input field has less than 2 characters
  useEffect(() => {
    if (props.userData.firstName.length > 1 && props.userData.surname.length > 1) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  return (
    <div>
      <section>
        <div
          className={props.userData.firstName ? "input-names-up-fixed" : inputFirstNameName ? "input-names-up" : "input-names-down"}
          onClick={focusFirstNameInput}
        >
          <p>First name</p>
        </div>
        <input
          className="input-text"
          type="text"
          id="firstName"
          required={true}
          maxLength={30}
          ref={firstNameInput}
          value={props.userData.firstName}
          onFocus={() => {
            setInputFirstNameName(true);
          }}
          onBlur={() => {
            setInputFirstNameName(false);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.setUserData({ ...props.userData, firstName: e.target.value });
          }}
        />
      </section>

      <section>
        <div
          className={props.userData.surname ? "input-names-up-fixed" : inputSurnameName ? "input-names-up" : "input-names-down"}
          onClick={focusSurnameInput}
        >
          <p>Surname</p>
        </div>
        <input
          className="input-text"
          type="text"
          id="surname"
          required={true}
          maxLength={30}
          ref={surnameInput}
          value={props.userData.surname}
          onFocus={() => {
            setInputSurnameName(true);
          }}
          onBlur={() => {
            setInputSurnameName(false);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.setUserData({ ...props.userData, surname: e.target.value });
          }}
        />
      </section>
    </div>
  );
};

export default NameAsInPassport;
