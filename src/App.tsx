import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import AuthRoute from "./components/AuthRoute";
import CongratulationsPage from "./pages/Congratulations";

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
        <Route
          path="congratulations"
          element={
            <AuthRoute>
              <CongratulationsPage />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
