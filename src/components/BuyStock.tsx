import React, { Dispatch, SetStateAction } from "react";
import { TriangleIcon } from "../assets";
import { Company } from "../types/Company";

export interface BuyStockProps {
  buyActive: boolean;
  setBuyActive: Dispatch<SetStateAction<boolean>>;
  reviewBuyActive: boolean;
  setReviewBuyActive: Dispatch<SetStateAction<boolean>>;
  selectedCompany: Company | undefined;
}

const BuyStock: React.FC<BuyStockProps> = (props) => {
  const reviewBuyStock = () => {
    props.setBuyActive(false);
    props.setReviewBuyActive(true);
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
        <h3>Number of shares to buy</h3>
      </section>

      <section className="total">
        <h3>Total</h3>
        <p>(incl. fees)</p>
        <div>~€27.76</div>
      </section>

      <section>
        <button className="large-button review-order" onClick={reviewBuyStock}>
          Review order
        </button>
      </section>
    </div>
  );
};

export default BuyStock;
