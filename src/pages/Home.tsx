import React, { ChangeEvent, useState, useContext, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import HiUser from "../components/HiUser";
import { Link } from "react-router-dom";
import { allCompaniesContext } from "../App";
import { Company } from "../types/Company";
import { User as FirebaseUser } from "firebase/auth";
import { auth, usersCollection } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export interface HomeProps {}

const HomePage: React.FC<HomeProps> = (props) => {
  const allCompanies = useContext(allCompaniesContext);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [usersCompanies, setUsersCompanies] = useState<Company[]>([]);
  const [userValues, setUserValues] = useState<Array<string>>([]);
  const [searchCompany, setSearchCompany] = useState("");

  // Checking current signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
  }, []);

  // Getting user values from firestore to update companies dynamically based on selected sdgs
  useEffect(() => {
    async function getUserData() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        const singleUserDoc = await getDoc(docRef);
        const singleUser = singleUserDoc.data();
        if (singleUser) {
          setUserValues(singleUser.userValues);
        }
      }
    }
    getUserData();
  }, [authUser]);

  // Matching companies to user values
  useEffect(() => {
    const filteredCompanies = allCompanies.filter((comp) => userValues.some((item2) => comp.sdgs.includes(item2)));
    setUsersCompanies(filteredCompanies);
  }, [allCompanies, userValues]);

  return (
    <div className="home-page">
      <HiUser title="Hi" text="Let's explore your matches" />
      <section className="search">
        <input
          type="text"
          placeholder="Company search"
          className="search-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchCompany(e.target.value);
          }}
        />
      </section>
      <section>
        <ul className="companies-list">
          {usersCompanies
            .filter((elem) => {
              if (searchCompany === "") {
                return elem;
              } else if (elem.companyName.toLowerCase().includes(searchCompany.toLowerCase())) {
                return elem;
              }
              return false;
            })
            .map((elem) => {
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
            })}
        </ul>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;
