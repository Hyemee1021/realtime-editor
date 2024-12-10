import React, { useContext, useState } from "react";
import { db } from "./firebase"; // Ensure db is imported from your Firebase setup
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { UserContext } from "./provider/UserProvider";
import { useNavigate } from "react-router-dom";

export const AddDoc = () => {
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  const [successMeg, setSuccessMeg] = useState("");
  const [ErrorMeg, setErrorMeg] = useState("");

  const navigate = useNavigate();
  // setting a form
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Add a new document to Firestore
  const handleNewDoc = async () => {
    const { title, body } = form;

    if (!title.trim() || !body.trim()) {
      alert("Document title and body cannot be empty.");
      return;
    }

    try {
      // Reference the user's subcollection path
      const subCollectionRef = collection(db, `user/${user.uid}/documents`);

      // Add document to the user's subcollection
      const docRef = await addDoc(subCollectionRef, {
        title: title.trim(),
        body: body.trim(),
        userId: user.uid, // Associate document with the user
        createdAt: Timestamp.now(), // Optional: Add timestamp
      });

      console.log("Document added with ID:", docRef.id); // Log the ID of the added document

      // Clear form after adding
      setForm({ title: "", body: "" });
      setSuccessMeg("New document is created.");
      navigate("/");
    } catch (error) {
      setErrorMeg(setErrorMeg(error.message));
    }
  };
  return (
    <div className=" w-4/5 sm:w-2/3 md:w-1/2 mx-auto   ">
      <div className="w-full flex-col flex justify-center gap-1">
        <h1 className=" text-center text-2xl my-3">Add a new document</h1>
        <input
          name="title"
          type="text"
          className="border"
          placeholder="Document Title"
          value={form.title}
          onChange={handleForm} // Corrected handler
        />
        <input
          name="body"
          type="text"
          className="border"
          placeholder="Document Body"
          value={form.body}
          onChange={handleForm} // Corrected handler
        />
        <button className="border hover:cursor-pointer" onClick={handleNewDoc}>
          Add
        </button>
      </div>
    </div>
  );
};
