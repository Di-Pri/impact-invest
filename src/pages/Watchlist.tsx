import React, { useState, useContext, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import HiUser from "../components/HiUser";
import { Link } from "react-router-dom";
import { allCompaniesContext } from "../App";
import { Company } from "../types/Company";
import { User as FirebaseUser } from "firebase/auth";
import { auth, usersCollection } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export interface WatchlistProps {}

const WatchlistPage: React.FC<WatchlistProps> = (props) => {
  const allCompanies = useContext(allCompaniesContext);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [firestoreWatchlist, setFirestoreWatchlist] = useState<Array<string>>([]);

  console.log("filteredCompanies", filteredCompanies);

  // Checking current signed in user id
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
  }, []);

  // Getting user's saved companies from firestore
  useEffect(() => {
    async function getUserData() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        const singleUserDoc = await getDoc(docRef);
        const singleUser = singleUserDoc.data();
        if (singleUser) {
          setFirestoreWatchlist(singleUser.watchlist);
        }
      }
    }
    getUserData();
  }, [authUser]);

  // Matching companies to user saved companies
  useEffect(() => {
    const filteredCompanies = allCompanies.filter((comp) => firestoreWatchlist.some((item) => comp.companyName.includes(item)));
    setFilteredCompanies(filteredCompanies);
  }, [allCompanies, firestoreWatchlist]);

  return (
    <div className="watchlist-page">
      <HiUser title="Dear" text="See your saved companies" />

      <section>
        <ul className="companies-list">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((elem) => {
              return (
                <Link key={elem.id} to={`/companypage/${elem.id}`}>
                  <li className="company-box">
                    <div className="logo-wrap">
                      <div className="company-logo" style={{ backgroundColor: `${elem.logoBackground}`, color: `${elem.logoText}` }}>
                        {elem.companyName.charAt(0)}
                      </div>
                    </div>

                    <div className="company-details">
                      <div className="comapany-name">{elem.companyName}</div>
                      <div className="sector">{elem.sector}</div>
                    </div>
                    <div className="current-price">€{elem.currentPrice}</div>
                  </li>
                </Link>
              );
            })
          ) : (
            <div className="empty-list">Add companies you are interested in to your watchlist to have quick access.</div>
          )}
        </ul>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default WatchlistPage;
