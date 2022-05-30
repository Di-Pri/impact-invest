import React, { Dispatch, SetStateAction } from "react";

export interface BuyStockProps {
  buyActive: boolean;
  setBuyActive: Dispatch<SetStateAction<boolean>>;
  reviewBuyActive: boolean;
  setReviewBuyActive: Dispatch<SetStateAction<boolean>>;
}

const BuyStock: React.FC<BuyStockProps> = (props) => {
  const reviewBuyStock = () => {
    props.setBuyActive(false);
    props.setReviewBuyActive(true);
  };

  return (
    <div className="buy-stock-page">
      <p>Buy stock page</p>
      <section>
        <button onClick={reviewBuyStock}>Review order</button>
      </section>
    </div>
  );
};

export default BuyStock;
