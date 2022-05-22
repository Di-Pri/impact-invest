import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon, CrossIcon } from "../assets";

export interface TopNavigationProps {
  sendToPage?: string;
  onClick?: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = (props) => {
  const navigate = useNavigate();
  console.log("props.sendToPafe", props.sendToPage);
  return (
    <div className="top-navigation">
      <section>
        <button className="back-button" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
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
