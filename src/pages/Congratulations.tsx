import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, usersCollection } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";
import { DoneIcon } from "../assets";
import { doc, getDoc } from "firebase/firestore";
import { allCompaniesContext } from "../App";
import { Company } from "../types/Company";
import Loading from "../components/Loading";

export interface CongratulationsProps {}

const CongratulationsPage: React.FC<CongratulationsProps> = (props) => {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [userValues, setUserValues] = useState<Array<string>>([]);
  const [usersCompanies, setUsersCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const allCompanies = useContext(allCompaniesContext);

  const navigate = useNavigate();

  // Checking current signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
  }, []);

  // Getting user values from firestore to update companies based on selected sdgs
  useEffect(() => {
    async function getUserData() {
      if (authUser) {
        const docRef = doc(usersCollection, authUser.uid);
        const singleUserDoc = await getDoc(docRef);

        const singleUser = singleUserDoc.data();
        if (singleUser) {
          setUserValues(singleUser.userValues);
        }
      }
    }
    getUserData();
  }, [authUser]);

  // Matching companies to user values
  useEffect(() => {
    const filteredCompanies = allCompanies.filter((comp) => userValues.some((item2) => comp.sdgs.includes(item2)));
    setUsersCompanies(filteredCompanies);
  }, [allCompanies, userValues]);

  // Matching companies to user values
  useEffect(() => {
    if (usersCompanies.length !== 0) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [usersCompanies]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="congratulations-page">
          <section className="done-section">
            <DoneIcon />
            <h1>Congratulations!</h1>
            <p>You account has been set up</p>
          </section>
          <section>
            <h3>We have found</h3>
            <h4>{usersCompanies.length}</h4>
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
      )}
    </div>
  );
};

export default CongratulationsPage;
