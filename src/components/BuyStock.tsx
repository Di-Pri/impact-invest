import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { TriangleIcon, PlusIcon, MinusIcon } from "../assets";
import { Company } from "../types/Company";
import PopUp from "./PopUp";
import { CSSTransition } from "react-transition-group";

export interface BuyStockProps {
  buyActive: boolean;
  setBuyActive: Dispatch<SetStateAction<boolean>>;
  reviewBuyActive: boolean;
  setReviewBuyActive: Dispatch<SetStateAction<boolean>>;
  selectedCompany: Company | undefined;
  buyShares: number;
  setBuyShares: Dispatch<SetStateAction<number>>;
  investedMoney: number;
}

const BuyStock: React.FC<BuyStockProps> = (props) => {
  const [popUpOpen, setPopUpOpen] = useState(false);

  // Decrementing the number of shares chosen
  const minusShares = () => {
    if (props.buyShares > 0) {
      props.setBuyShares((oldShares) => {
        return oldShares - 1;
      });
    }
  };

  // Calculating total price
  const totalPrice = props.buyShares * Number(props.selectedCompany?.currentPrice) + 2;

  // Increasing the number of shares chosen
  const plusShares = () => {
    if (totalPrice > 5000 - props.investedMoney - Number(props.selectedCompany?.currentPrice) + 2) {
      setPopUpOpen(true);
    } else {
      props.setBuyShares((oldShares) => {
        return oldShares + 1;
      });
    }
  };

  // Improving readability of the numbers, with decimals
  const fractionNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Opening review order section
  const reviewBuyStock = () => {
    props.setBuyActive(false);
    props.setReviewBuyActive(true);
  };

  // Passing refs to CSSTransition component
  const ref1 = useRef(null);
  const ref2 = useRef(null);

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

      <div className="strech">
        <section className="number-of-shares">
          <h3>Number of shares to buy</h3>
          <div>
            <button onClick={minusShares}>
              <MinusIcon />
            </button>
            <div>{props.buyShares}</div>
            <button onClick={plusShares}>
              <PlusIcon />
            </button>
          </div>
        </section>

        <section className="total">
          <h3>Total</h3>
          <p>(incl. fees)</p>
          {props.buyShares > 0 ? <div>~€{fractionNumber.format(totalPrice)}</div> : <div>€0</div>}
        </section>
      </div>

      <section>
        <button className="large-button review-order" onClick={reviewBuyStock}>
          Review order
        </button>
      </section>

      <CSSTransition in={popUpOpen} timeout={300} classNames="alert2" unmountOnExit nodeRef={ref1}>
        <div className="blur-background" ref={ref1}></div>
      </CSSTransition>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert" unmountOnExit nodeRef={ref2}>
        <PopUp hey="Hey" setPopUpOpen={setPopUpOpen} nodeRef={ref2} message="Please deposit funds if you want to buy more shares." />
      </CSSTransition>
    </div>
  );
};

export default BuyStock;
