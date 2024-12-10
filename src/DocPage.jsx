import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure you have the correct Firebase setup
import { UserContext, UserProvider } from "./provider/UserProvider";

const DocPage = () => {
  const { documentId } = useParams(); // Capture the productId from the URL

  // getting userid
  const { user } = useContext(UserContext);
  const userId = user.uid;

  console.log("userId:", userId);
  console.log("documentId:", documentId);

  const [docData, setDocData] = useState(null);
  console.log(docData);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch one user document from Firestore

  const fetchDocument = async () => {
    if (!userId && !documentId) {
      setErrorMessage("Invalid user or document ID.");
      return;
    }

    try {
      const docRef = doc(db, `user/${userId}/documents`, documentId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocData({ id: docSnap.id, ...docSnap.data() });
      } else {
        setErrorMessage("Document not found.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (userId) fetchDocument();
  }, [userId, documentId]);

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!docData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{docData.title}</h1>
      <p>{docData.body}</p>
      <p>
        Created at:{" "}
        {docData.createdAt?.toDate
          ? docData.createdAt.toDate().toLocaleString()
          : "N/A"}
      </p>
    </div>
  );
};

export default DocPage;
