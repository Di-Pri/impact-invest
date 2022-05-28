import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
//import { User as FirebaseUser } from "firebase/auth";
import BottomNavigation from "../components/BottomNavigation";

export interface WatchlistProps {}

const WatchlistPage: React.FC<WatchlistProps> = (props) => {
  //  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      //  setUser(currentUser);
      console.log("CongratulationsUser", currentUser);
    });
  }, []);

  return (
    <div className="watchlist-page">
      <p>Watchlist page</p>
      <BottomNavigation />
    </div>
  );
};

export default WatchlistPage;
