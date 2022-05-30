import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import image from "../assets/academy.jpg";

const AcademyPage: React.FC = (props) => {
  return (
    <div className="academy-page">
      <div className="overlay"></div>
      <div className="academy-image">
        <img src={image} alt="Logo" />
      </div>
      <div className="modal">
        <h2>Coming soon!</h2>
        <p>
          In the near future, you will find here educational videos and articles. You will learn more about Sustainable Development Goals,
          basics of investing in stock market, and how you can make an impact through your investments.
        </p>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AcademyPage;
