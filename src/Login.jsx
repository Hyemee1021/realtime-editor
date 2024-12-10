import React, { useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext, UserProvider } from "./provider/UserProvider";
import { useNavigate } from "react-router-dom";
import { useEditor } from "@tiptap/react";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate inputs
    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Name and Password are needed");
      return;
    }
    setErrorMessage("");
    setLoading(true);
    // Sign in with Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully logged in

        setUser(userCredential.user);
        navigate("/doc"); // Move this here after `setUser`
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("No user found with this email.");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect password.");
            break;
          default:
            setErrorMessage("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        // Always reset loading state
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/doc");
    }
  }, [user, navigate]);

  return (
    <div className="mx-auto text-center my-5">
      <h1 className="text-2xl my-3">Log In</h1>
      {errorMessage && <div>{errorMessage}</div>}
      {loading && <p>Loading...</p>}
      <div className="">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-4/5 mx-auto sm:w-3/5 gap-3"
        >
          <input
            placeholder="Enter your email"
            className="border pl-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter your password"
            className="border pl-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="border py-1 hover:cursor-pointer hover:font-bold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};
