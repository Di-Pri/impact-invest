import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { auth, usersCollection } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";
import BottomNavigation from "../components/BottomNavigation";
import TopNavigation from "../components/TopNavigation";

//  SDGs images
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

export interface UserValuesUpdateProps {}

const UserValuesUpdate: React.FC<UserValuesUpdateProps> = (props) => {
  const [checked, setChecked] = useState<Array<string>>([]);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);

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

  // Managing the state of checked items
  const handleCheck = (item: string) => {
    let newList = [...checked];
    if (checked.includes(item)) {
      newList.splice(checked.indexOf(item), 1);
    } else {
      newList = [...checked, item];
    }
    setChecked(newList);
  };

  // Getting user values from firestore collection
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
  }, []);

  useEffect(() => {
    async function getUserData() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        const singleUserDoc = await getDoc(docRef);
        const singleUser = singleUserDoc.data();
        if (singleUser) {
          setChecked(singleUser.userValues);
        }
      }
    }
    getUserData();
  }, [authUser]);

  // Updating user values in firestore collection
  useEffect(() => {
    async function updateValues() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        await updateDoc(docRef, {
          userValues: checked,
        });
      }
    }
    updateValues();
    // eslint-disable-next-line
  }, [checked]);

  return (
    <div className="user-values-update">
      <TopNavigation sendToPage="/" />
      <section className="values-header">
        <h1>Your values</h1>
        <div className="blue-cloud"></div>
        <p></p>
      </section>
      <div className="user-values">
        <p> </p>
        <div className="sdgs-grid">
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
      </div>
      <BottomNavigation />
    </div>
  );
};

export default UserValuesUpdate;
