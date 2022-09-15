import React, { useState, useEffect, useContext } from "react";
import TopNavigation from "../components/TopNavigation";
import BottomNavigation from "../components/BottomNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { Company } from "../types/Company";
import { allCompaniesContext } from "../App";
import CompanyInfo from "../components/CompanyInfo";
import CompanyChart from "../components/CompanyChart";
import BuyStock from "../components/BuyStock";
import SellStock from "../components/SellStock";
import ReviewBuyStock from "../components/ReviewBuyStock";
import ReviewSellStock from "../components/ReviewSellStock";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, usersCollection } from "../firebase-config";
import { UserTrades } from "../types/User";

const CompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const allCompanies = useContext(allCompaniesContext);
  const params = useParams();
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  const [companyDetails, setCompanyDetails] = useState<boolean>(true);
  const [buyActive, setBuyActive] = useState<boolean>(false);
  const [reviewBuyActive, setReviewBuyActive] = useState<boolean>(false);
  const [sellActive, setSellActive] = useState<boolean>(false);
  const [reviewSellActive, setReviewSellActive] = useState<boolean>(false);
  const [buyShares, setBuyShares] = useState<number>(0);
  const [sellShares, setSellShares] = useState<number>(0);
  const [checked, setChecked] = useState<Array<string>>([]);
  const [companyIsSaved, setCompanyIsSaved] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [firestoreTrades, setFirestoreTrades] = useState<UserTrades[]>([]);
  const [investedMoney, setInvestedMoney] = useState<number>(0);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  // Finding selected company from all companies global state by id
  useEffect(() => {
    const company = allCompanies.find((elem) => elem.id === params.id);
    setSelectedCompany(company);
  }, [allCompanies, params.id]);

  // Managing components displayed based on user actions
  const buyStock = () => {
    setCompanyDetails(false);
    setBuyActive(true);
  };

  const sellStock = () => {
    setCompanyDetails(false);
    setSellActive(true);
  };

  // Going to previous step in purchase process
  const changeCompanyPageComponents = () => {
    if (reviewBuyActive === true) {
      setReviewBuyActive(false);
      setBuyActive(true);
    } else if (reviewSellActive === true) {
      setReviewSellActive(false);
      setSellActive(true);
    } else if (buyActive === true) {
      setBuyActive(false);
      setCompanyDetails(true);
    } else if (sellActive === true) {
      setSellActive(false);
      setCompanyDetails(true);
    } else {
      navigate(-1);
    }
  };

  // Going to main page of the company after placing order
  const closeTradePopup = () => {
    if (reviewBuyActive === true) {
      setReviewBuyActive(false);
      setCompanyDetails(true);
    } else if (reviewSellActive === true) {
      setReviewSellActive(false);
      setCompanyDetails(true);
    } else {
      navigate("/");
    }
  };

  // Saving company to watchlist
  // Managing the state of checked items
  const saveCompany = () => {
    if (selectedCompany) {
      let newList = [...checked];
      if (checked.includes(selectedCompany.companyName)) {
        newList.splice(checked.indexOf(selectedCompany.companyName), 1);
      } else {
        newList = [...checked, selectedCompany.companyName];
      }
      setChecked(newList);
    }
  };

  // Getting user watchlist list and trades from firestore collection
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getUserData() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        const singleUserDoc = await getDoc(docRef);
        const singleUser = singleUserDoc.data();
        if (singleUser) {
          setChecked(singleUser.watchlist);
          setFirestoreTrades(singleUser.trades);
          setPortfolioValue(singleUser.portfolio);
        }
      }
    }
    getUserData();
    setOrderPlaced(false);
  }, [authUser, orderPlaced]);

  // Calculating free funds available for user to invest
  useEffect(() => {
    if (firestoreTrades.length !== 0) {
      firestoreTrades.map((elem) => {
        let value = Number(elem.price) * elem.shares;
        setInvestedMoney((oldAmount) => {
          return oldAmount + value;
        });
        return false;
      });
    }
  }, [firestoreTrades]);

  // Updating user watchlist in firestore collection
  useEffect(() => {
    async function updateValues() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        await updateDoc(docRef, {
          watchlist: checked,
        });
      }
    }
    updateValues();

    // Managing save company icon color
    if (selectedCompany) {
      if (checked.includes(selectedCompany.companyName)) {
        setCompanyIsSaved(true);
      } else {
        setCompanyIsSaved(false);
      }
    }
    // eslint-disable-next-line
  }, [checked]);

  // Checking if user has shares of this company
  const boughtCompany = firestoreTrades.find((comp) => comp.companyName === selectedCompany?.companyName);

  return (
    <div className="company-page">
      {companyDetails ? (
        <section>
          <TopNavigation saveCompany={saveCompany} saveCompanyChecked={companyIsSaved} goBack={changeCompanyPageComponents} />
        </section>
      ) : (
        <section>
          <TopNavigation sendToPage="/" goBack={changeCompanyPageComponents} />
        </section>
      )}

      <header className="company-header">
        <div style={{ backgroundColor: `${selectedCompany?.logoBackground}`, color: `${selectedCompany?.logoText}` }}>
          {selectedCompany?.companyName.charAt(0)}
        </div>
        <div>{selectedCompany?.companyName}</div>
      </header>

      {companyDetails ? (
        <section>
          <CompanyChart selectedCompany={selectedCompany} />
          {boughtCompany ? (
            <section className="buy-sell-buttons">
              <button onClick={buyStock}>Buy</button>
              <button onClick={sellStock}>Sell</button>
            </section>
          ) : (
            <section className="buy-button">
              <button onClick={buyStock}>Buy</button>
            </section>
          )}

          <CompanyInfo selectedCompany={selectedCompany} boughtCompany={boughtCompany} />
        </section>
      ) : null}

      {buyActive ? (
        <BuyStock
          buyActive={buyActive}
          setBuyActive={setBuyActive}
          reviewBuyActive={reviewBuyActive}
          setReviewBuyActive={setReviewBuyActive}
          selectedCompany={selectedCompany}
          buyShares={buyShares}
          setBuyShares={setBuyShares}
          investedMoney={investedMoney}
          portfolioValue={portfolioValue}
        />
      ) : null}

      {sellActive ? (
        <SellStock
          sellActive={sellActive}
          setSellActive={setSellActive}
          reviewSellActive={reviewSellActive}
          setReviewSellActive={setReviewSellActive}
          selectedCompany={selectedCompany}
          sellShares={sellShares}
          setSellShares={setSellShares}
          boughtCompany={boughtCompany}
        />
      ) : null}

      {reviewBuyActive ? (
        <ReviewBuyStock
          authUser={authUser}
          buyShares={buyShares}
          setBuyShares={setBuyShares}
          selectedCompany={selectedCompany}
          closeTradePopup={closeTradePopup}
          firestoreTrades={firestoreTrades}
          boughtCompany={boughtCompany}
          portfolioValue={portfolioValue}
          setOrderPlaced={setOrderPlaced}
        />
      ) : null}

      {reviewSellActive ? (
        <ReviewSellStock
          authUser={authUser}
          sellShares={sellShares}
          setSellShares={setSellShares}
          selectedCompany={selectedCompany}
          closeTradePopup={closeTradePopup}
          boughtCompany={boughtCompany}
          portfolioValue={portfolioValue}
          setOrderPlaced={setOrderPlaced}
        />
      ) : null}

      <BottomNavigation />
    </div>
  );
};

export default CompanyPage;
