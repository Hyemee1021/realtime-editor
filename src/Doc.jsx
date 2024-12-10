import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./provider/UserProvider";
import { Header } from "./Header";
import { Timestamp } from "firebase/firestore";
import { db } from "./firebase"; // Ensure db is imported from your Firebase setup
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import { PlusSign } from "./PlusSign";
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
      <div>
        <PlusSign />
      </div>

      {/* add doc */}
      <div className="mt-5 w-[90%]  mx-auto">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div>Text editor options here</div>

        <table>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Title</th>
              <th>Body</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {docArr.map((doc) => (
              <tr
                key={doc.id}
                onClick={() => navigate(`/doc/${doc.id}`)}
                className="hover:cursor-pointer"
              >
                <td>{user.uid === doc.userId ? "Owner" : "Other"}</td>
                <td>{doc.title}</td>
                <td>{doc.body}</td>
                <td>{doc.createdAt?.toDate().toLocaleString() || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
