import React from "react";

export interface RegisterStepsProps {
  numberOfDots: number;
}

const RegisterSteps: React.FC<RegisterStepsProps> = (props) => {
  console.log("props.numberOfDots", props.numberOfDots);
  return (
    <section className="register-steps">
      <div className={props.numberOfDots > 0 ? "dark" : "light"}></div>
      <div className={props.numberOfDots > 1 ? "dark" : "light"}></div>
      <div className={props.numberOfDots > 2 ? "dark" : "light"}></div>
      <div className={props.numberOfDots > 3 ? "dark" : "light"}></div>
      <div className={props.numberOfDots > 4 ? "dark" : "light"}></div>
      <div className={props.numberOfDots > 5 ? "dark" : "light"}></div>
    </section>
  );
};

export default RegisterSteps;
