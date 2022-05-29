import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import HiUser from "../components/HiUser";

export interface HomeProps {}

const HomePage: React.FC<HomeProps> = (props) => {
  return (
    <div className="home-page">
      <HiUser title="Let's explore your matches" />
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
