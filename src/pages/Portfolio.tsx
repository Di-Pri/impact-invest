import React from "react";
import HiUser from "../components/HiUser";

import BottomNavigation from "../components/BottomNavigation";

export interface PortfolioProps {}

const PortfolioPage: React.FC<PortfolioProps> = (props) => {
  return (
    <div className="portfolio-page">
      <HiUser title="Dear" text="Here is the impact you made" />

      <section className="portfolio-details">
        <h2>Portfolio value</h2>
        <div className="portfolio-value">
          <div>€5,000.00</div>
        </div>

        <div className="flex">
          <div>
            <h5 className="title">Free funds</h5>
            <p className="value">€4,972.24</p>
          </div>
          <div>
            <h5 className="title">Return</h5>
            <p className="value">€1.43(1.1%)</p>
          </div>
        </div>
      </section>

      <section className="portfolio-sdgs">
        <h2>Supported SDGs</h2>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default PortfolioPage;
