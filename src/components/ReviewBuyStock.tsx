import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Company } from "../types/Company";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, usersCollection } from "../firebase-config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import PopUp from "./PopUp";
import { CSSTransition } from "react-transition-group";

export interface ReviewBuyStockProps {
  buyShares: number;
  setBuyShares: Dispatch<SetStateAction<number>>;
  selectedCompany: Company | undefined;
  closeTradePopup: () => void;
}

const ReviewBuyStock: React.FC<ReviewBuyStockProps> = (props) => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [popUpOpen, setPopUpOpen] = useState(false);

  // Calculating value
  const value = props.buyShares * Number(props.selectedCompany?.currentPrice);

  // Calculating total price
  const totalPrice = value + 2;

  // Placing order by adding new object to trades array in users collection
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
  }, []);

  async function placeOrder() {
    if (authUser) {
      const docRef = doc(usersCollection, authUser.uid);
      await updateDoc(docRef, {
        trades: arrayUnion({
          companyName: props.selectedCompany?.companyName,
          shares: props.buyShares,
          price: props.selectedCompany?.currentPrice,
          logoBackground: props.selectedCompany?.logoBackground,
          logoColor: props.selectedCompany?.logoText,
          companySdgs: props.selectedCompany?.sdgs,
        }),
      });
      setPopUpOpen(true);
    }
  }

  // Closing popup and clearing inputs after placing order
  const tradeDone = () => {
    setPopUpOpen(false);
    props.closeTradePopup();
    props.setBuyShares(0);
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
          <h5 className="title">Number of shares to buy</h5>
          <p className="value">{props.buyShares}</p>
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
          <p className="value">~€{fractionNumber.format(totalPrice)}</p>
        </div>
      </section>

      <div className="buy-sell-buttons">
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
          message="Your order is on its way. You can find trades and transactions in your portfolio."
        />
      </CSSTransition>
    </div>
  );
};

export default ReviewBuyStock;
