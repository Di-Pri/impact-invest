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

  // const [output, setOutput] = useState<string>(props.userData.dateOfBirth);
  // console.log("output", output);

  // const addDigit = (x: any) => {
  //   setOutput((currentState) => {
  //     const newState = currentState.concat(x);
  //     return newState;
  //   });
  // };

  // const removeDigit = () => {
  //   setOutput((currentState) => {
  //     const newState = currentState.slice(0, -1);
  //     return newState;
  //   });
  // };

  // useEffect(() => {
  //   props.setUserData({ ...props.userData, dateOfBirth: output });
  // }, [output]);

  return (
    <div>
      <div>Personal Number</div>

      <input
        type="text"
        value={props.userData.personalNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.setUserData({ ...props.userData, personalNumber: e.target.value })}
      />

      {/* <div className="output">{props.userData.dateOfBirth}</div> */}
      {/* <div className="keyboard-grid">
        <button id="digit-1" onClick={() => addDigit(1)}>
          1
        </button>
        <button id="digit-2" onClick={() => addDigit(2)}>
          2
        </button>
        <button id="digit-3" onClick={() => addDigit(3)}>
          3
        </button>
        <button id="digit-4" onClick={() => addDigit(4)}>
          4
        </button>
        <button id="digit-5" onClick={() => addDigit(5)}>
          5
        </button>
        <button id="digit-6" onClick={() => addDigit(6)}>
          6
        </button>
        <button id="digit-7" onClick={() => addDigit(7)}>
          7
        </button>
        <button id="digit-8" onClick={() => addDigit(8)}>
          8
        </button>
        <button id="digit-9" onClick={() => addDigit(9)}>
          9
        </button>
        <button id="digit-y" onClick={() => addDigit(0)}>
          y
        </button>
        <button id="digit-0" onClick={() => addDigit(0)}>
          0
        </button>
        <button id="digit-x" onClick={() => removeDigit()}>
          x
        </button>
      </div> */}
    </div>
  );
};

export default PersonaNumber;
