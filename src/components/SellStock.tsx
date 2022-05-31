import React, { Dispatch, SetStateAction } from "react";
import { TriangleIcon } from "../assets";
import { Company } from "../types/Company";

export interface SellStockProps {
  sellActive: boolean;
  setSellActive: Dispatch<SetStateAction<boolean>>;
  reviewSellActive: boolean;
  setReviewSellActive: Dispatch<SetStateAction<boolean>>;
  selectedCompany: Company | undefined;
}

const SellStock: React.FC<SellStockProps> = (props) => {
  const reviewSellStock = () => {
    props.setSellActive(false);
    props.setReviewSellActive(true);
  };
  return (
    <div className="buy-sell-stock-page">
      <section className="main-price">
        <div>
          <div>€{props.selectedCompany?.currentPrice}</div>
          <div className={props.selectedCompany?.bullish ? "bull-triangle" : "bear-triangle"}>
            <TriangleIcon />
          </div>
        </div>
      </section>

      <section className="number-of-shares">
        <h3>Number of shares to sell</h3>
      </section>

      <section className="total">
        <h3>Number of shares to sell</h3>
        <p>(incl. fees)</p>
      </section>

      <section>
        <button onClick={reviewSellStock}>Review order</button>
      </section>
    </div>
  );
};

export default SellStock;
