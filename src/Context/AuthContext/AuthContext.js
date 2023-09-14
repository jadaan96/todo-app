'use strict';

import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';
import axios from "axios";

export const loginContext = createContext();

export default function LoginProvider({ children }) {
  const [capabilities, setCapabilities] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const can = (capability) => {
    return capabilities.includes(capability);
  }
  const signin = async (username, password) => {
    try {
      const headers = {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      };
      const response = await axios.post(`https://sample-back-end.onrender.com/signin`, null, {
        headers: headers,
      });
      if (response.status === 200) {
        const token = response.data.token;
        console.log(token);
        if (token) {
          cookie.save('auth', token);
        }
      }
      validateToken(response.data.token);
    } catch (e) {
      console.error(e);
    }

  };

  const validateToken = (token) => {
    const authUser = jwt_decode(token);
    console.log(authUser);
    setLoggedIn(true);
    setCapabilities(authUser.capabilities);
    cookie.save('auth', token);
  };

  const logout = () => {
    setLoggedIn(false);
    cookie.remove('auth')
  }
  useEffect(() => {
    const authCookie = cookie.load('auth');
    if (authCookie) {
      validateToken(authCookie)
    } else {
      setLoggedIn(false)
    }
  }, [])

  return (
    <loginContext.Provider value={{ signin, loggedIn, logout, can }}>
      {children}
    </loginContext.Provider>
  );
}