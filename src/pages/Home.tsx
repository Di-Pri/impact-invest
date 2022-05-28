import React, { useState, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";

export interface HomeProps {}

const HomePage: React.FC<HomeProps> = (props) => {
  return (
    <div>
      <p>Home Page</p>
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
