import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import AuthRoute from "./components/AuthRoute";
import CongratulationsPage from "./pages/Congratulations";
import WatchlistPage from "./pages/Watchlist";
import PortfolioPage from "./pages/Portfolio";
import AcademyPage from "./pages/Academy";
import MenuPage from "./pages/Menu";

import "./App.scss";

export interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="congratulations" element={<CongratulationsPage />} />
        <Route path="watchlist" element={<WatchlistPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="academy" element={<AcademyPage />} />
        <Route path="menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
