import React from "react";

export interface CompanyInfoProps {}

const CompanyInfo: React.FC<CompanyInfoProps> = (props) => {
  return (
    <div className="company-info">
      <p>Company info</p>
    </div>
  );
};

export default CompanyInfo;
