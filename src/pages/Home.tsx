import React, { ChangeEvent, useState, useContext } from "react";
import BottomNavigation from "../components/BottomNavigation";
import HiUser from "../components/HiUser";
import { Link } from "react-router-dom";
import { allCompaniesContext } from "../App";

export interface HomeProps {}

const HomePage: React.FC<HomeProps> = (props) => {
  const allCompanies = useContext(allCompaniesContext);

  const [searchCompany, setSearchCompany] = useState("");

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
          {allCompanies
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
