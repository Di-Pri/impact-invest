import React from "react";

export interface CompanyDetailsProps {}

const CompanyDetails: React.FC<CompanyDetailsProps> = (props) => {
  return (
    <div className="company-details">
      <p>Company details</p>
    </div>
  );
};

export default CompanyDetails;
