import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HiUser from "../components/HiUser";

import BottomNavigation from "../components/BottomNavigation";

export interface PortfolioProps {}

const PortfolioPage: React.FC<PortfolioProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className="portfolio-page">
      <HiUser title="Dear" text="Here is the impact you made" />
      <BottomNavigation />
    </div>
  );
};

export default PortfolioPage;
