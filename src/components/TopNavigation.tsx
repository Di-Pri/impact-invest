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
          <button aria-label="Go back" style={{ display: props.currentStep === 0 ? "none" : "block" }} onClick={props.goBack}>
            <BackIcon />
          </button>
        ) : (
          <button aria-label="Go back" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
        )}
      </section>
      <section>
        {props.sendToPage ? (
          <button aria-label="Close" onClick={() => navigate(props.sendToPage!)}>
            <CrossIcon />
          </button>
        ) : null}
        {props.saveCompany ? (
          <button aria-label="Save to watchlist" className={props.saveCompanyChecked ? "company-checked" : ""} onClick={props.saveCompany}>
            <WatchlistIcon />
          </button>
        ) : null}
      </section>
    </div>
  );
};

export default TopNavigation;
