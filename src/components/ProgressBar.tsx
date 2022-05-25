import React from "react";

export interface ProgressBarProps {
  numberOfDots: number;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
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

export default ProgressBar;
