import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon, CrossIcon } from "../assets";

export interface TopNavigationProps {
  sendToPage?: string;
  goBack?: () => void;
  currentStep?: number;
  onClick?: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div className="top-navigation">
      <section>
        {props.goBack ? (
          <button style={{ display: props.currentStep === 0 ? "none" : "block" }} className="back-button" onClick={props.goBack}>
            <BackIcon />
          </button>
        ) : (
          <button className="back-button" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
        )}
      </section>
      <section>
        {props.sendToPage ? (
          <button className="close-button" onClick={() => navigate(props.sendToPage!)}>
            <CrossIcon />
          </button>
        ) : null}
      </section>
    </div>
  );
};

export default TopNavigation;
