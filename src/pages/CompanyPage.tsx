import React, { useState, useEffect, useContext } from "react";
import TopNavigation from "../components/TopNavigation";
import BottomNavigation from "../components/BottomNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { Company } from "../types/Company";
import { allCompaniesContext } from "../App";
import CompanyDetails from "../components/CompanyDetails";
import BuyStock from "../components/BuyStock";
import SellStock from "../components/SellStock";
import ReviewBuyStock from "../components/ReviewBuyStock";
import ReviewSellStock from "../components/ReviewSellStock";

const CompanyPage: React.FC = (props) => {
  const navigate = useNavigate();
  const allCompanies = useContext(allCompaniesContext);
  const params = useParams();
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  const [companyDetails, setCompanyDetails] = useState(true);
  const [buyActive, setBuyActive] = useState(false);
  const [reviewBuyActive, setReviewBuyActive] = useState(false);
  const [sellActive, setSellActive] = useState(false);
  const [reviewSellActive, setReviewSellActive] = useState(false);

  console.log("selectedCompany", selectedCompany);

  // Finding selected company from all companies global state by id
  useEffect(() => {
    const company = allCompanies.find((elem) => elem.id === params.id);
    console.log("company", company);
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

  return (
    <div className="company-page">
      <section>
        <TopNavigation sendToPage="/" goBack={changeCompanyPageComponents} />
      </section>
      <header>
        <div>Logo</div>
        <div>{selectedCompany?.companyName}</div>
      </header>

      {companyDetails ? (
        <section>
          <section>
            <button onClick={buyStock}>Buy</button>
            <button onClick={sellStock}>Sell</button>
          </section>
          <CompanyDetails />
        </section>
      ) : null}

      {buyActive ? (
        <BuyStock
          buyActive={buyActive}
          setBuyActive={setBuyActive}
          reviewBuyActive={reviewBuyActive}
          setReviewBuyActive={setReviewBuyActive}
        />
      ) : null}

      {sellActive ? (
        <SellStock
          sellActive={sellActive}
          setSellActive={setSellActive}
          reviewSellActive={reviewSellActive}
          setReviewSellActive={setReviewSellActive}
        />
      ) : null}

      {reviewBuyActive ? <ReviewBuyStock /> : null}

      {reviewSellActive ? <ReviewSellStock /> : null}

      <BottomNavigation />
    </div>
  );
};

export default CompanyPage;
