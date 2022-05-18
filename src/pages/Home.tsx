import React from "react";
import { useNavigate } from "react-router-dom";

export interface HomeProps {}

const HomePage: React.FC<HomeProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Home Page</p>
      <button onClick={() => navigate("/")}>Landing page</button>
    </div>
  );
};

export default HomePage;
