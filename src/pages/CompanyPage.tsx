import React, { useState, useEffect, useContext } from "react";
import TopNavigation from "../components/TopNavigation";
import BottomNavigation from "../components/BottomNavigation";
import { useParams } from "react-router-dom";
import { Company } from "../types/Company";
import { allCompaniesContext } from "../App";

const CompanyPage: React.FC = (props) => {
  const allCompanies = useContext(allCompaniesContext);
  const params = useParams();
  const [selectedCompany, setSelectedCompany] = useState<Company[]>([]);

  console.log("selectedCompany", selectedCompany);

  // Filtering selected company from all companies global state by id
  useEffect(() => {
    const company = allCompanies.filter((elem) => elem.id === params.id);
    setSelectedCompany(company);
  }, [allCompanies, params.id]);

  return (
    <div className="company-page">
      <section>
        <TopNavigation sendToPage="/" />
      </section>

      <section>{`View Account ID "${params.id}"`}</section>

      <BottomNavigation />
    </div>
  );
};

export default CompanyPage;
