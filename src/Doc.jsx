import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./provider/UserProvider";
import { Header } from "./Header";
import { Timestamp } from "firebase/firestore";
import { db } from "./firebase"; // Ensure db is imported from your Firebase setup
import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { FaRegFileAlt } from "react-icons/fa";
import { PlusSign } from "./PlusSign";
import { CiMenuKebab } from "react-icons/ci";
import { SideBar } from "./SideBar";
import { EditDoc } from "./EditDoc";

export const Doc = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const userId = user?.uid;
  const [docArr, setDocArr] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [openEditDoc, setOpenEditDoc] = useState(false);
  console.log(openEditDoc);

  const [selectedDocId, setSelectedDocId] = useState(null); // Track the selected doc for editing
  console.log(selectedDocId);
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

  const handleDelete = async (docId) => {
    try {
      // Reference the document to be deleted
      const docRef = doc(db, `user/${user.uid}/documents`, docId);

      // Delete the document
      await deleteDoc(docRef);

      // Optionally, update your UI
      setDocArr((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle edit modal
  const handleEditModal = (docId) => {
    setSelectedDocId(docId);
    setOpenEditDoc(!openEditDoc);
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
          {/* Render EditDoc modal if open */}
          {openEditDoc && selectedDocId && (
            <EditDoc
              selectedDocId={selectedDocId}
              handleDelete={handleDelete}
            />
          )}
          <table className="w-[90%] mx-auto text-center">
            <thead>
              <tr>
                <th> </th>
                <th>Name</th>

                <th>Location</th>
                <th>Resaon Suggested</th>
                <th className="w-8 h-8 flex justify-center items-center">
                  <CiMenuKebab />
                </th>
              </tr>
            </thead>
            <tbody>
              {docArr.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-y-2 hover:cursor-pointer hover:bg-slate-100 "
                >
                  <td
                    className="py-1"
                    onClick={() => navigate(`/doc/${doc.id}`)}
                  >
                    <FaRegFileAlt />
                  </td>
                  <td
                    className="py-1"
                    onClick={() => navigate(`/doc/${doc.id}`)}
                  >
                    {doc.title}
                  </td>
                  <td
                    className="py-1"
                    onClick={() => navigate(`/doc/${doc.id}`)}
                  >
                    {doc.location || "N/A"}
                  </td>
                  <td className="py-1">
                    {doc.createdAt?.toDate().toLocaleString() || "N/A"}
                  </td>
                  <td className="w-8 h-8 flex justify-center items-center hover:bg-blue-100 rounded-full clicked:bg-blue-100">
                    <button onClick={() => handleEditModal(doc.id)}>
                      <CiMenuKebab />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
