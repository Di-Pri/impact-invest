import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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
  portfolioValue: number;
}

const BuyStock: React.FC<BuyStockProps> = (props) => {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [preBuyShares, setPreBuyShares] = useState<number>(props.buyShares);

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

  // Calculating the number of shares the user has money for
  const affordableShares = Math.floor((props.portfolioValue - props.investedMoney - 2) / Number(props.selectedCompany?.currentPrice));

  // Increasing the number of shares chosen
  const plusShares = () => {
    if (props.buyShares > affordableShares - 1) {
      setPopUpOpen(true);
    } else {
      props.setBuyShares((oldShares) => {
        return oldShares + 1;
      });
    }
  };

  // Changing the number of shares directly in input field
  useEffect(() => {
    if (preBuyShares > affordableShares) {
      setPopUpOpen(true);
      setPreBuyShares((oldShares) => {
        return Number(oldShares.toString().slice(0, -1));
      });
    } else {
      props.setBuyShares(preBuyShares);
    }
    // eslint-disable-next-line
  }, [preBuyShares]);

  // Improving readability of the numbers, with decimals
  const fractionNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Disabling the Review order button when number of shares to buy is zero
  useEffect(() => {
    if (props.buyShares === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [props]);

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
            <button aria-label="minus" onClick={minusShares}>
              <MinusIcon />
            </button>

            <div>
              <input
                value={props.buyShares}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPreBuyShares(Number(e.target.value));
                }}
              />
            </div>

            <button aria-label="plus" onClick={plusShares}>
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
        <button
          disabled={buttonDisabled}
          className={buttonDisabled ? "large-button" : "large-button animate-button review-order"}
          onClick={reviewBuyStock}
        >
          Review order
        </button>
      </section>

      <CSSTransition in={popUpOpen} timeout={300} classNames="alert2" unmountOnExit nodeRef={ref1}>
        <div className="blur-background" ref={ref1}></div>
      </CSSTransition>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert" unmountOnExit nodeRef={ref2}>
        <PopUp
          hey="Hey"
          setPopUpOpen={setPopUpOpen}
          nodeRef={ref2}
          message={`You have available funds to buy ${affordableShares} shares. Please deposit money to buy more shares.`}
        />
      </CSSTransition>
    </div>
  );
};

export default BuyStock;
