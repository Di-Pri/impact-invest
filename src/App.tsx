import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import AuthRoute from "./components/AuthRoute";

import "./App.css";

initializeApp(config.firebaseConfig);

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
