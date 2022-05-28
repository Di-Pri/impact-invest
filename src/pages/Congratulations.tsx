import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
//import { User as FirebaseUser } from "firebase/auth";
import { DoneIcon } from "../assets";

export interface CongratulationsProps {}

const CongratulationsPage: React.FC<CongratulationsProps> = (props) => {
  //  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      //  setUser(currentUser);
      console.log("CongratulationsUser", currentUser);
    });
  }, []);

  return (
    <div className="congratulations-page">
      <section className="done-section">
        <DoneIcon />
        <h1>Congratulations!</h1>
        <p>You account has been set up</p>
      </section>
      <section>
        <h3>We have found</h3>
        <h4>12</h4>
        <div>
          <p>companies</p>
          <p>matching your chosen values</p>
        </div>
      </section>

      <button
        className="blue-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Get started
      </button>
    </div>
  );
};

export default CongratulationsPage;
