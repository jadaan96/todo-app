'use strict';

import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';

export const loginContext = createContext();

export default function LoginProvider({ children }) {
  const [capabilities, setCapabilities] = useState([]);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [refresh,setRefresh]=useState(false)
  const can = (capability) => {
    return capabilities?.includes(capability);
  }


  const validateToken = (data) => {
    console.log(data);
    const authUser = jwt_decode(data.token);
    setLoggedIn(true);
    console.log(authUser);
    setUser(authUser.username)
    setCapabilities(data.Capabilities);
    cookie.save('auth', data.token);
  };
  const logout=()=>{
    setLoggedIn(false);
    setUser({})
    cookie.remove('auth')
  }
  useEffect(()=> {
    const authCookie = cookie.load('auth');
    if(authCookie) {
        validateToken(authCookie)
        setRefresh(true)
    } 
  }, [refresh])

  return (
    <loginContext.Provider value={{ loggedIn,logout ,can,validateToken,setData}}>
      {children}
    </loginContext.Provider>
  );
}
