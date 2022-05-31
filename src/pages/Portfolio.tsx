import React, { useEffect, useState } from "react";
import HiUser from "../components/HiUser";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import BottomNavigation from "../components/BottomNavigation";
import { auth, usersCollection } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { UserTrades } from "../types/User";

export interface PortfolioProps {}

const PortfolioPage: React.FC<PortfolioProps> = (props) => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [firestoreTrades, setFirestoreTrades] = useState<UserTrades[]>([]);

  console.log("firestoreTrades", firestoreTrades);

  // Checking current signed in user id
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
  }, []);

  // Getting user trades from firestore
  useEffect(() => {
    async function getUserData() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        const singleUserDoc = await getDoc(docRef);
        const singleUser = singleUserDoc.data();
        if (singleUser) {
          setFirestoreTrades(singleUser.trades);
        }
      }
    }
    getUserData();
  }, [authUser]);

  return (
    <div className="portfolio-page">
      <HiUser title="Dear" text="Here is the impact you made" />

      <section className="portfolio-details">
        <h2>Portfolio value</h2>
        <div className="portfolio-value">
          <div>€5,000.00</div>
        </div>

        <div className="flex">
          <div>
            <h5 className="title">Free funds</h5>
            <p className="value">€4,972.24</p>
          </div>
          <div>
            <h5 className="title">Return</h5>
            <p className="value">€1.43(1.1%)</p>
          </div>
        </div>
      </section>

      <section>
        <ul className="companies-list">
          {firestoreTrades.map((elem) => {
            return (
              <li className="company-box">
                <div className="logo-wrap">
                  <div className="company-logo" style={{ backgroundColor: `${elem.logoBackground}`, color: `${elem.logoColor}` }}>
                    {elem.companyName.charAt(0)}
                  </div>
                </div>

                <div className="company-details">
                  <div className="company-name">{elem.companyName}</div>
                  <div className="shares">
                    {elem.shares} {elem.shares === 1 ? "share" : "shares"}
                  </div>
                </div>
                <div className="trade-price">
                  <div className="current-price">€{elem.price}</div>
                  <div className="grow">€0 (0%)</div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="portfolio-sdgs">
        <h2>Supported SDGs</h2>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default PortfolioPage;
