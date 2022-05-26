import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, usersCollection } from "../firebase-config";
import { doc, setDoc } from "@firebase/firestore";
import TopNavigation from "../components/TopNavigation";
import ProgressBar from "../components/ProgressBar";
import CountryOfResidence from "../components/CountryOfResidence";
import NameAsInPassport from "../components/NameAsInPassport";
import DateOfBirth from "../components/DateOfBirth";
import PersonaNumber from "../components/PersonalNumber";
import UserValues from "../components/UserValues";
import LoginDetails from "../components/LoginDetails";
import { User } from "../types/User";

export interface RegisterProps {}

const RegisterPage: React.FC<RegisterProps> = (props) => {
  const [step, setStep] = useState(0);
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [inputNameError, setInputNameError] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const formHeaders = [
    "Country of residence",
    "Name as in passport",
    "Date of birth",
    "Personal identity number",
    "Your values",
    "Login details",
  ];

  const [userData, setUserData] = useState<User>({
    country: "",
    firstName: "",
    surname: "",
    dateOfBirth: "",
    personalNumber: "",
    userValues: "",
    email: "",
    password: "",
    cookies: false,
  });

  const displayFormStep = () => {
    if (step === 0) {
      return <CountryOfResidence userData={userData} setUserData={setUserData} setButtonDisabled={setButtonDisabled} />;
    } else if (step === 1) {
      return <NameAsInPassport userData={userData} setUserData={setUserData} setButtonDisabled={setButtonDisabled} />;
    } else if (step === 2) {
      return <DateOfBirth userData={userData} setUserData={setUserData} setButtonDisabled={setButtonDisabled} />;
    } else if (step === 3) {
      return <PersonaNumber userData={userData} setUserData={setUserData} setButtonDisabled={setButtonDisabled} />;
    } else if (step === 4) {
      return <UserValues userData={userData} setUserData={setUserData} setButtonDisabled={setButtonDisabled} />;
    } else {
      return (
        <LoginDetails
          userData={userData}
          setUserData={setUserData}
          registerEmail={registerEmail}
          setRegisterEmail={setRegisterEmail}
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
          inputNameError={inputNameError}
          setInputNameError={setInputNameError}
          setButtonDisabled={setButtonDisabled}
        />
      );
    }
  };

  const navigate = useNavigate();

  // Checking if there is a logged in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        navigate("/");
      }
    });
  }, [navigate]);

  // Register user and add him to firestore users collection
  const register = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

      await setDoc(doc(usersCollection, newUser.user.uid), userData);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setInputNameError(error.message);
      }
    }
  };

  // Going to previous step in a form
  const goBack = () => {
    setStep((currentStep) => currentStep - 1);
  };

  return (
    <div className="register-page">
      <div className="details-section">
        <section>
          <TopNavigation sendToPage="/login" goBack={goBack} currentStep={step} />
        </section>

        <section>
          <ProgressBar numberOfDots={step + 1} />
        </section>

        <section className="register-header">
          <h1>{formHeaders[step]}</h1>
          <div className="blue-cloud"></div>
        </section>

        <section className="register-inputs">{displayFormStep()}</section>
      </div>

      <section className="button-section">
        <button
          disabled={buttonDisabled}
          className={buttonDisabled ? "large-button" : "large-button animate-button"}
          onClick={() => {
            if (step === formHeaders.length - 1) {
              register();
            } else {
              setStep((currentStep) => currentStep + 1);
            }
          }}
        >
          {step === formHeaders.length - 1 ? "Create account" : "Continue"}
        </button>
      </section>
    </div>
  );
};

export default RegisterPage;
