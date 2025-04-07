import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    location: "",
    name: "",
    email: "",
    image: "",
    interests: [],
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};