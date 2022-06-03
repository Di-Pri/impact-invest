import React from "react";
import { Company } from "../types/Company";

//  SDGs images
import { SdgOne } from "../assets";
import { SdgTwo } from "../assets";
import { SdgThree } from "../assets";
import { SdgFour } from "../assets";
import { SdgFive } from "../assets";
import { SdgSix } from "../assets";
import { SdgSeven } from "../assets";
import { SdgEight } from "../assets";
import { SdgNine } from "../assets";
import { SdgTen } from "../assets";
import { SdgEleven } from "../assets";
import { SdgTwelve } from "../assets";
import { SdgThirteen } from "../assets";
import { SdgFourteen } from "../assets";
import { SdgFifteen } from "../assets";
import { SdgSixteen } from "../assets";
import { SdgSeventeen } from "../assets";

export interface CompanyInfoProps {
  selectedCompany: Company | undefined;
}

const CompanyInfo: React.FC<CompanyInfoProps> = (props) => {
  return (
    <div className="company-info">
      <section>
        <h3>Stock info</h3>
        <div>
          <h5 className="title">High (1 year)</h5>
          <p className="value">€{props.selectedCompany?.highPrice}</p>
        </div>
        <div>
          <h5 className="title">Low (1 year)</h5>
          <p className="value">€{props.selectedCompany?.lowPrice}</p>
        </div>
      </section>

      <section>
        <h3>Company details</h3>
        <div>
          <h5 className="title">CEO</h5>
          <p className="value">{props.selectedCompany?.ceo}</p>
        </div>
        <div>
          <h5 className="title">Sector</h5>
          <p className="value">{props.selectedCompany?.sector}</p>
        </div>
        <div>
          <h5 className="title">Employees</h5>
          <p className="value">{props.selectedCompany?.employees}</p>
        </div>
        <div>
          <h5 className="title">Market Cap</h5>
          <p className="value">{props.selectedCompany?.marketCap}</p>
        </div>
        <div>
          <h5 className="title">Dividend yield</h5>
          <p className="value">{props.selectedCompany?.dividends}</p>
        </div>
      </section>

      <div className="supported-sdgs">
        <h3>Supported SDGs</h3>
        <ul>
          {props.selectedCompany?.sdgs.map((item, index) => (
            <li className="sdg-box" key={index}>
              {item === "sdg_one" ? <SdgOne /> : null}
              {item === "sdg_two" ? <SdgTwo /> : null}
              {item === "sdg_three" ? <SdgThree /> : null}
              {item === "sdg_four" ? <SdgFour /> : null}
              {item === "sdg_five" ? <SdgFive /> : null}
              {item === "sdg_six" ? <SdgSix /> : null}
              {item === "sdg_seven" ? <SdgSeven /> : null}
              {item === "sdg_eight" ? <SdgEight /> : null}
              {item === "sdg_nine" ? <SdgNine /> : null}
              {item === "sdg_ten" ? <SdgTen /> : null}
              {item === "sdg_eleven" ? <SdgEleven /> : null}
              {item === "sdg_twelve" ? <SdgTwelve /> : null}
              {item === "sdg_thirteen" ? <SdgThirteen /> : null}
              {item === "sdg_fourteen" ? <SdgFourteen /> : null}
              {item === "sdg_fifteen" ? <SdgFifteen /> : null}
              {item === "sdg_sixteen" ? <SdgSixteen /> : null}
              {item === "sdg_seventeen" ? <SdgSeventeen /> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyInfo;
