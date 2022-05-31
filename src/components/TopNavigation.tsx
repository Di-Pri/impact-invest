import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon, CrossIcon, WatchlistIcon } from "../assets";

export interface TopNavigationProps {
  sendToPage?: string;
  goBack?: () => void;
  currentStep?: number;
  onClick?: () => void;
  saveCompany?: () => void;
  saveCompanyChecked?: boolean;
}

const TopNavigation: React.FC<TopNavigationProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div className="top-navigation">
      <section>
        {props.goBack ? (
          <button style={{ display: props.currentStep === 0 ? "none" : "block" }} onClick={props.goBack}>
            <BackIcon />
          </button>
        ) : (
          <button onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
        )}
      </section>
      <section>
        {props.sendToPage ? (
          <button onClick={() => navigate(props.sendToPage!)}>
            <CrossIcon />
          </button>
        ) : null}
        {props.saveCompany ? (
          <button className={props.saveCompanyChecked ? "company-checked" : ""} onClick={props.saveCompany}>
            <WatchlistIcon />
          </button>
        ) : null}
      </section>
    </div>
  );
};

export default TopNavigation;
