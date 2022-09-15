import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Company } from "../types/Company";
import { User as FirebaseUser } from "firebase/auth";
import { usersCollection } from "../firebase-config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import PopUp from "./PopUp";
import { CSSTransition } from "react-transition-group";
import { UserTrades } from "../types/User";

export interface ReviewSellStockProps {
  authUser: FirebaseUser | null;
  sellShares: number;
  setSellShares: Dispatch<SetStateAction<number>>;
  selectedCompany: Company | undefined;
  closeTradePopup: () => void;
  boughtCompany: UserTrades | undefined;
  portfolioValue: number;
  setOrderPlaced: Dispatch<SetStateAction<boolean>>;
}

const ReviewBuyStock: React.FC<ReviewSellStockProps> = (props) => {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

  // Calculating value
  const value = props.sellShares * Number(props.selectedCompany?.currentPrice);

  // Calculating the new number of shares if user didn't sell all shares of this company
  const newNumberOfShares = Number(props.boughtCompany?.shares) - props.sellShares;

  // Placing order by removing the data about this company from the user trades array
  async function placeOrder() {
    if (props.authUser) {
      const docRef = doc(usersCollection, props.authUser.uid);
      await updateDoc(docRef, {
        trades: arrayRemove(props.boughtCompany),
        portfolio: props.portfolioValue - 2,
      });
      // If user sold less shares than he had I add new data to the user trades array
      if (props.boughtCompany?.shares !== props.sellShares) {
        await updateDoc(docRef, {
          trades: arrayUnion({
            companyName: props.selectedCompany?.companyName,
            shares: newNumberOfShares,
            price: props.selectedCompany?.currentPrice,
            logoBackground: props.selectedCompany?.logoBackground,
            logoColor: props.selectedCompany?.logoText,
            companySdgs: props.selectedCompany?.sdgs,
          }),
        });
      }
      setPopUpOpen(true);
      props.setOrderPlaced(true);
    }
  }

  // Closing popup and clearing inputs after placing order
  const tradeDone = () => {
    setPopUpOpen(false);
    props.closeTradePopup();
    props.setSellShares(0);
  };

  // Improving readability of the numbers, with decimals
  const fractionNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Passing refs to CSSTransition component
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  return (
    <div className="review-buy-sell-page">
      <section>
        <h3>Transaction details</h3>
        <div>
          <h5 className="title">Number of shares to sell</h5>
          <p className="value">{props.sellShares}</p>
        </div>
        <div>
          <h5 className="title">Value</h5>
          <p className="value">~€{fractionNumber.format(value)}</p>
        </div>
        <div>
          <h5 className="title">Fees</h5>
          <p className="value">~€2.00</p>
        </div>
        <div>
          <h5 className="title">Total</h5>
          <p className="value">~€{fractionNumber.format(value - 2)}</p>
        </div>
      </section>

      <div className="buy-button">
        <button onClick={placeOrder}>Confirm order</button>
      </div>

      <CSSTransition in={popUpOpen} timeout={300} classNames="alert2" unmountOnExit nodeRef={ref1}>
        <div className="blur-background" ref={ref1}></div>
      </CSSTransition>
      <CSSTransition in={popUpOpen} timeout={300} classNames="alert" unmountOnExit nodeRef={ref2}>
        <PopUp
          hey="Done"
          navigateToPortfolio="See portfolio"
          tradeDone={tradeDone}
          setPopUpOpen={setPopUpOpen}
          nodeRef={ref2}
          message="The transaction was successful. Check out your portfolio."
        />
      </CSSTransition>
    </div>
  );
};

export default ReviewBuyStock;
