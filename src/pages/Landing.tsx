import React from "react";
import { useNavigate } from "react-router-dom";

export interface LandingProps {}

const LandingPage: React.FC<LandingProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Landing Page</p>
      <button onClick={() => navigate("/home")}>Home page</button>
    </div>
  );
};

export default LandingPage;
