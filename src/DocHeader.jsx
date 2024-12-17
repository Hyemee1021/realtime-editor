import React, { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase"; // Update this path based on your file structure

export const DocHeader = ({ userId, docDataTitle }) => {
  const [docData, setDocData] = useState(null);
  console.log(docData);

  const fetchUserDocuments = async (userId) => {
    try {
      // Adjust the document path based on your Firestore sole.log({ userId });structure
      const docRef = doc(db, "user", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocData({ id: docSnap.id, ...docSnap.data() });
      } else {
        setDocData(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDocuments(userId);
    }
  }, [userId]);
  return (
    <div className="w-full mx-auto flex flex-row items-center justify-between p-2 shadow-sm">
      <div className="flex gap-3">
        <div className="flex items-center">
          <FaFileAlt />
        </div>
        <div>
          <h2 className="text-xl">{docDataTitle}</h2>
          <ul className="flex  flex-row gap-3">
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </div>
      </div>
      <div className="rounded-full bg-slate-100 w-10 h-10 flex items-center justify-center">
        {docData.name[0]}
      </div>
    </div>
  );
};
