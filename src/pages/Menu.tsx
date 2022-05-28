import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
//import { User as FirebaseUser } from "firebase/auth";

export interface MenuProps {}

const MenuPage: React.FC<MenuProps> = (props) => {
  //  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      //  setUser(currentUser);
      console.log("CongratulationsUser", currentUser);
    });
  }, []);

  return (
    <div className="menu-page">
      <p>Menu page</p>
    </div>
  );
};

export default MenuPage;
