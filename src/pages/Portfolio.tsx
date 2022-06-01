import React, { useEffect, useState } from "react";
import HiUser from "../components/HiUser";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import BottomNavigation from "../components/BottomNavigation";
import { auth, usersCollection } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { UserTrades } from "../types/User";
import { SdgsWheel } from "../assets";

const PortfolioPage: React.FC = (props) => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [firestoreTrades, setFirestoreTrades] = useState<UserTrades[]>([]);
  const [investedMoney, setInvestedMoney] = useState<number>(0);
  const [allSupportedSdgs, setAllSupportedSdgs] = useState<Array<string>>([]);
  const [sdgColorClass, setSdgColorClass] = useState<string>("");

  // Calculating free funds available for user to invest
  useEffect(() => {
    if (firestoreTrades.length !== 0) {
      firestoreTrades.map((elem) => {
        let value = Number(elem.price) * elem.shares;
        setInvestedMoney((oldAmount) => {
          return oldAmount + value;
        });
        setAllSupportedSdgs((oldSdgs) => {
          return oldSdgs.concat(elem.companySdgs);
        });
        return false;
      });
    }
  }, [firestoreTrades]);

  // Filtering unique sdgs from all bought companies
  useEffect(() => {
    let uniqueSdgs: Array<string> = [];
    allSupportedSdgs.forEach((elem) => {
      if (!uniqueSdgs.includes(elem)) {
        uniqueSdgs.push(elem);
      }
    });
    let sdgsClass = uniqueSdgs.toString().replaceAll(",", " ");
    setSdgColorClass(sdgsClass);
  }, [allSupportedSdgs]);

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

  // Improving readability of the numbers, with decimals
  const fractionNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="portfolio-page">
      <HiUser title="Dear" text="Here is the impact you made" />

      <section className="portfolio-details">
        <h2>Portfolio value</h2>
        <div className="portfolio-value">
          <div>€5000</div>
        </div>

        <div className="flex">
          <div>
            <h5 className="title">Free funds</h5>
            <p className="value">€{fractionNumber.format(5000 - investedMoney)}</p>
          </div>
          <div>
            <h5 className="title">Return</h5>
            <p className="value grow">€0 (0%)</p>
          </div>
        </div>
      </section>

      <section className="portfolio-sdgs">
        <h2>Supported SDGs</h2>
        <div className={sdgColorClass}>
          <SdgsWheel />
        </div>
      </section>

      <section>
        <ul className="companies-list">
          {firestoreTrades
            ? firestoreTrades.map((elem, index) => {
                return (
                  <li key={index} className="company-box">
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
                      <div className="current-price">€{fractionNumber.format(Number(elem.price) * elem.shares)}</div>
                      <div className="grow">€0 (0%)</div>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default PortfolioPage;
