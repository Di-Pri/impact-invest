import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MinusIcon, PlusIcon, TriangleIcon } from "../assets";
import { Company } from "../types/Company";
import PopUp from "./PopUp";
import { CSSTransition } from "react-transition-group";
import { UserTrades } from "../types/User";

export interface SellStockProps {
  sellActive: boolean;
  setSellActive: Dispatch<SetStateAction<boolean>>;
  reviewSellActive: boolean;
  setReviewSellActive: Dispatch<SetStateAction<boolean>>;
  selectedCompany: Company | undefined;
  sellShares: number;
  setSellShares: Dispatch<SetStateAction<number>>;
  boughtCompany: UserTrades | undefined;
}

const SellStock: React.FC<SellStockProps> = (props) => {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [preSellShares, setPreSellShares] = useState<number>(props.sellShares);

  // Decrementing the number of shares chosen
  const minusShares = () => {
    if (props.sellShares > 0) {
      props.setSellShares((oldShares) => {
        return oldShares - 1;
      });
    }
  };

  // Calculating total price
  const totalPrice = props.sellShares * Number(props.selectedCompany?.currentPrice) - 2;

  // Changing the number of shares directly in input field
  useEffect(() => {
    if (props.boughtCompany !== undefined && preSellShares > props.boughtCompany.shares) {
      setPopUpOpen(true);
      setPreSellShares((oldShares) => {
        return Number(oldShares.toString().slice(0, -1));
      });
    } else {
      props.setSellShares(preSellShares);
    }
    // eslint-disable-next-line
  }, [preSellShares]);

  // Increasing the number of shares chosen
  const plusShares = () => {
    if (props.boughtCompany !== undefined && props.sellShares > props.boughtCompany.shares - 1) {
      setPopUpOpen(true);
    } else {
      props.setSellShares((oldShares) => {
        return oldShares + 1;
      });
    }
  };

  // Improving readability of the numbers, with decimals
  const fractionNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Disabling the Review order button when number of shares to buy is zero
  useEffect(() => {
    if (props.sellShares === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [props]);

  // Opening review order section
  const reviewSellStock = () => {
    props.setSellActive(false);
    props.setReviewSellActive(true);
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
          <h3>Number of shares to sell</h3>
          <div>
            <button aria-label="minus" onClick={minusShares}>
              <MinusIcon />
            </button>

            <div>
              <input
                value={props.sellShares}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPreSellShares(Number(e.target.value));
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
          {props.sellShares > 0 ? <div>~€{fractionNumber.format(totalPrice)}</div> : <div>€0</div>}
        </section>
      </div>

      <section>
        <button
          disabled={buttonDisabled}
          className={buttonDisabled ? "large-button" : "large-button animate-button review-order"}
          onClick={reviewSellStock}
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
          message={`You have ${props.boughtCompany?.shares} shares of this company in your portfolio.`}
        />
      </CSSTransition>
    </div>
  );
};

export default SellStock;
