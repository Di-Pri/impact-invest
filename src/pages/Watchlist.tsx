import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import HiUser from "../components/HiUser";
import BottomNavigation from "../components/BottomNavigation";

export interface WatchlistProps {}

const WatchlistPage: React.FC<WatchlistProps> = (props) => {
  return (
    <div className="watchlist-page">
      <HiUser title="Dear" text="See your saved companies" />
      <div className="empty-list">You don't have saved companies yet.</div>

      <BottomNavigation />
    </div>
  );
};

export default WatchlistPage;
