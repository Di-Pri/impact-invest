import React, { useEffect, useState, Dispatch, SetStateAction } from "react";

import { SdgOne } from "../assets";
import { SdgTwo } from "../assets";
import { SdgThree } from "../assets";
import { SdgFour } from "../assets";
import { SdgFive } from "../assets";
import { SdgSix } from "../assets";
import { SdgSeven } from "../assets";
import { SdgEight } from "../assets";
import { SdgNine } from "../assets";
import { SdgTen } from "../assets";
import { SdgEleven } from "../assets";
import { SdgTwelve } from "../assets";
import { SdgThirteen } from "../assets";
import { SdgFourteen } from "../assets";
import { SdgFifteen } from "../assets";
import { SdgSixteen } from "../assets";
import { SdgSeventeen } from "../assets";

import { User } from "../types/User";

export interface UserValuesProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>;
}

const UserValues: React.FC<UserValuesProps> = (props) => {
  useEffect(() => {
    // Disabling the button if there is no values selected
    if (props.userData.userValues.length !== 0) {
      props.setButtonDisabled(false);
    } else {
      props.setButtonDisabled(true);
    }
  }, [props]);

  // Managing the state of checked items
  const [checked, setChecked] = useState<Array<string>>(props.userData.userValues);
  const checkList = [
    "sdg_one",
    "sdg_two",
    "sdg_three",
    "sdg_four",
    "sdg_five",
    "sdg_six",
    "sdg_seven",
    "sdg_eight",
    "sdg_nine",
    "sdg_ten",
    "sdg_eleven",
    "sdg_twelve",
    "sdg_thirteen",
    "sdg_fourteen",
    "sdg_fifteen",
    "sdg_sixteen",
    "sdg_seventeen",
  ];

  const handleCheck = (item: string) => {
    let newList = [...checked];
    if (checked.includes(item)) {
      newList.splice(checked.indexOf(item), 1);
    } else {
      newList = [...checked, item];
    }
    setChecked(newList);
  };

  // Changing values in user object
  useEffect(() => {
    props.setUserData({ ...props.userData, userValues: checked });
    // eslint-disable-next-line
  }, [checked]);

  return (
    <div className="user-values">
      {checkList.map((item, index) => (
        <div key={index} className={checked.includes(item) ? "one-sdg" : "one-sdg sdg-unchecked"}>
          <button className="sdg-button" value={item} onClick={() => handleCheck(item)}>
            {item === "sdg_one" ? <SdgOne /> : null}
            {item === "sdg_two" ? <SdgTwo /> : null}
            {item === "sdg_three" ? <SdgThree /> : null}
            {item === "sdg_four" ? <SdgFour /> : null}
            {item === "sdg_five" ? <SdgFive /> : null}
            {item === "sdg_six" ? <SdgSix /> : null}
            {item === "sdg_seven" ? <SdgSeven /> : null}
            {item === "sdg_eight" ? <SdgEight /> : null}
            {item === "sdg_nine" ? <SdgNine /> : null}
            {item === "sdg_ten" ? <SdgTen /> : null}
            {item === "sdg_eleven" ? <SdgEleven /> : null}
            {item === "sdg_twelve" ? <SdgTwelve /> : null}
            {item === "sdg_thirteen" ? <SdgThirteen /> : null}
            {item === "sdg_fourteen" ? <SdgFourteen /> : null}
            {item === "sdg_fifteen" ? <SdgFifteen /> : null}
            {item === "sdg_sixteen" ? <SdgSixteen /> : null}
            {item === "sdg_seventeen" ? <SdgSeventeen /> : null}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserValues;
