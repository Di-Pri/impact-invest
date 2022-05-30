import React, { useEffect, useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import HiUser from "../components/HiUser";
import { getDocs } from "@firebase/firestore";
import { companiesCollection } from "../firebase-config";
import { Company } from "../types/Company";
import { Link } from "react-router-dom";

export interface HomeProps {}

const HomePage: React.FC<HomeProps> = (props) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  // Getting companies from firestore collection
  useEffect(() => {
    async function getCompaniesData() {
      const companiesDocs = await getDocs(companiesCollection);
      if (companiesDocs) {
        const companies = companiesDocs.docs.map((com) => com.data());
        console.log("companies", companies);
        if (companies) {
          setCompanies(companies);
          companies.forEach((company) => console.log(company.companyName));
        }
      }
    }
    getCompaniesData();
  }, []);

  return (
    <div className="home-page">
      <HiUser title="Hi" text="Let's explore your matches" />

      <ul className="companies-list">
        {companies.map((elem) => (
          <Link key={elem.id} to={`/companypage/${elem.id}`}>
            <li className="company-box">
              {/* <section className="company-box"> */}
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
              {/* </section> */}
            </li>
          </Link>
        ))}
      </ul>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;
