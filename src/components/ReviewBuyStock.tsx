import React, { useEffect, useState } from "react";
import { Company } from "../types/Company";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, usersCollection } from "../firebase-config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export interface ReviewBuyStockProps {
  buyShares: number;
  selectedCompany: Company | undefined;
}

const ReviewBuyStock: React.FC<ReviewBuyStockProps> = (props) => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);

  // Calculating price
  const totalPrice = props.buyShares * Number(props.selectedCompany?.currentPrice) + 2;

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
        }),
      });
    }
  }

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
          <p className="value">~€{props.selectedCompany?.currentPrice}</p>
        </div>
        <div>
          <h5 className="title">Fees</h5>
          <p className="value">~€2.00</p>
        </div>
        <div>
          <h5 className="title">Total</h5>
          <p className="value">~€{totalPrice}</p>
        </div>
      </section>

      <div className="buy-sell-buttons">
        <button onClick={placeOrder}>Confirm order</button>
      </div>
    </div>
  );
};

export default ReviewBuyStock;
