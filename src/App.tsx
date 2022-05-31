import React, { useState, useEffect } from "react";
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
import { onAuthStateChanged } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";
import { auth, companiesCollection, usersCollection } from "./firebase-config";
import { doc, getDoc, getDocs } from "@firebase/firestore";
import { createContext } from "react";
import { User } from "./types/User";
import "./App.scss";
import UserValuesUpdate from "./pages/UserValuesUpdate";
import CompanyPage from "./pages/CompanyPage";
import { Company } from "./types/Company";

export interface AppProps {}

// Context for user object
export const userObjectContext = createContext<User | null>(null);
// Context for companies object
export const allCompaniesContext = createContext<Company[]>([]);

const App: React.FC<AppProps> = (props) => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [userObject, setUserObject] = useState<User | null>(null);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);

  // Checking if there is a signed in user using firebase Auth service
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
  }, []);

  // Getting data of the matched user from firestore users collection
  useEffect(() => {
    async function getUserData() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        const singleUserDoc = await getDoc(docRef);
        const singleUser = singleUserDoc.data();
        if (singleUser) {
          setUserObject(singleUser);
        }
      }
    }
    getUserData();
  }, [authUser]);

  // Getting companies from firestore collection
  useEffect(() => {
    async function getCompaniesData() {
      const companiesDocs = await getDocs(companiesCollection);
      if (companiesDocs) {
        const companies = companiesDocs.docs.map((com) => com.data());
        if (companies) {
          setAllCompanies(companies);
        }
      }
    }
    getCompaniesData();
  }, []);

  return (
    <BrowserRouter>
      <userObjectContext.Provider value={userObject}>
        <allCompaniesContext.Provider value={allCompanies}>
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
            <Route path="uservaluesupdate" element={<UserValuesUpdate />} />
            <Route path="companypage/:id" element={<CompanyPage />} />
          </Routes>
        </allCompaniesContext.Provider>
      </userObjectContext.Provider>
    </BrowserRouter>
  );
};

export default App;
