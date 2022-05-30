import React, { Dispatch, SetStateAction } from "react";

export interface SellStockProps {
  sellActive: boolean;
  setSellActive: Dispatch<SetStateAction<boolean>>;
  reviewSellActive: boolean;
  setReviewSellActive: Dispatch<SetStateAction<boolean>>;
}

const SellStock: React.FC<SellStockProps> = (props) => {
  const reviewSellStock = () => {
    props.setSellActive(false);
    props.setReviewSellActive(true);
  };
  return (
    <div className="sell-stock-page">
      <p>Sell stock page</p>
      <section>
        <button onClick={reviewSellStock}>Review order</button>
      </section>
    </div>
  );
};

export default SellStock;
