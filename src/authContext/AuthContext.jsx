import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getProfileData(token);
    } else {
      setUserData(null);
    }
  }, [token]);
  async function getProfileData(token) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}users/profile-data`,
        {
          headers: { token },
        }
      );

      if (data.message === "success") {
        setUserData(data.user);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(token);

  return (
    <>
      <AuthContext.Provider
        value={{ token, setToken, userData, getProfileData }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthContextProvider;
