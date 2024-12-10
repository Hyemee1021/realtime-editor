import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from "./provider/UserProvider";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
export const UserOption = ({ docData }) => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful
        setUser(null);
        navigate("/");
      })

      .catch((error) => {
        // An error happened
        console.error("Error signing out: ", error.message);
      });
  };

  // Get user's name or fallback to email
  const userName = docData?.name[0] || user?.email[0]; // infoArr is now an object
  console.log(userName);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="hover:cursor-pointer rounded-full bg-white border w-10 h-10 flex items-center justify-center">
        {userName || "User"}
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleSignout}
              className={`${
                active ? "bg-gray-100" : ""
              } group flex w-full items-center px-4 py-2 text-sm`}
            >
              Sign Out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
