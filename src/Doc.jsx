import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./provider/UserProvider";
import { Header } from "./Header";
import { Timestamp } from "firebase/firestore";
import { db } from "./firebase"; // Ensure db is imported from your Firebase setup
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import { PlusSign } from "./PlusSign";
import { SideBar } from "./SideBar";
export const Doc = () => {
  const { user } = useContext(UserContext);

  const userId = user.uid;
  const [docArr, setDocArr] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  // Navigate to login page if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch user documents from Firestore
  const fetchUserDocuments = async (userId) => {
    try {
      const subCollectionRef = collection(db, `user/${userId}/documents`);
      const querySnapshot = await getDocs(subCollectionRef);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDocArr(items);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Call fetchUserSubCol when the component mounts
  useEffect(() => {
    if (!user?.uid) return;
    fetchUserDocuments(user.uid);
  }, [user?.uid]);
  return (
    <div>
      <Header />
      {/* main screen */}
      <div className="grid grid-cols-1 sm:grid-cols-5">
        <div className="col-span-1">
          <SideBar />
        </div>
        {/* add doc */}
        <div className="col-span-4   ">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <h1 className="my-7 ml-8 text-2xl">Welcome to Drive</h1>

          <table className="w-[90%] mx-auto text-center">
            <thead>
              <tr>
                <th>Name</th>

                <th>Location</th>
                <th>Resaon Suggested</th>
              </tr>
            </thead>
            <tbody>
              {docArr.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={() => navigate(`/doc/${doc.id}`)}
                  className="hover:cursor-pointer border-y-2"
                >
                  <td>{doc.title}</td>
                  <td>{doc.location || "N/A"}</td>
                  <td>{doc.createdAt?.toDate().toLocaleString() || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
