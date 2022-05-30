import React from "react";
import { Company } from "../types/Company";
import { TriangleIcon, StockChart } from "../assets";

export interface CompanyChartProps {
  selectedCompany: Company | undefined;
}

const CompanyChart: React.FC<CompanyChartProps> = (props) => {
  return (
    <div className="company-chart">
      <section className="main-price">
        <div>
          <div> €{props.selectedCompany?.currentPrice}</div>
          <div className={props.selectedCompany?.bullish ? "bull-triangle" : "bear-triangle"}>
            <TriangleIcon />
          </div>
        </div>
      </section>
      <section className={props.selectedCompany?.bullish ? "bull-chart" : "bear-chart"}>
        <StockChart />
      </section>
      <section className="chart-dates">
        <p>Aug 2021</p>
        <p>Dec 2021</p>
        <p>Apr 2021</p>
      </section>
    </div>
  );
};

export default CompanyChart;
