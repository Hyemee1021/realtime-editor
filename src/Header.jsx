import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./provider/UserProvider";
import { UserOption } from "./UserOption";

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase"; // Update this path based on your file structure
import SearchBar from "./SearchBar";

export const Header = () => {
  const { user } = useContext(UserContext);
  const userId = user?.uid; // Safe check for `user` object

  const [docData, setDocData] = useState(null);
  const [docArr, setDocArr] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUserDocuments = async (userId) => {
    try {
      // Adjust the document path based on your Firestore sole.log({ userId });structure
      const docRef = doc(db, "user", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocData({ id: docSnap.id, ...docSnap.data() });
        setErrorMessage(""); // Clear error messages if successful
      } else {
        setDocData(null);
        setErrorMessage(error.message || "Failed to fetch user document.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Fetch user documents from Firestore
  const fetchUserDocumentArr = async (userId) => {
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
  useEffect(() => {
    if (userId) {
      fetchUserDocuments(userId);
      fetchUserDocumentArr(userId);
    }
  }, [userId]);
  return (
    <header className="w-full flex justify-around py-4 items-center bg-slate-50 ">
      {/* logo */}
      <div>
        <p>RealTime-Editor</p>
      </div>
      {/* search bar */}
      <SearchBar user={user} docArr={docArr} />
      {/* showing name and clickable */}
      {user && (
        <div className="hover:cursor-pointer">
          <UserOption
            docData={docData}
            fetchUserDocumentArr={fetchUserDocumentArr}
          />
        </div>
      )}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </header>
  );
};
