'use strict';

import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';

export const loginContext = createContext();

export default function LoginProvider({ children }) {
  const [capabilities, setCapabilities] = useState([]);
  const [user, setUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const testUsers = {
    Administrator: {
      password: 'admin',
      name: 'Administrator',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
    },
    Editor: {
      password: 'editor',
      name: 'Editor',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
    },
    Writer: {
      password: 'writer',
      name: 'Writer',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
    },
    User: {
      password: 'user',
      name: 'User',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
    },
  };
  const can = (capability) => {
    return capabilities?.includes(capability);
  }
  const signin = async (username, password) => {
    let auth = testUsers[username];
    if (auth && auth.password === password) {
        console.log(auth);
      try {
        validateToken(auth.token,username);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const validateToken = (token,user) => {
    const authUser = jwt_decode(token);
    setLoggedIn(true);
    console.log(authUser);
    setUser(user)
    setCapabilities(authUser.capabilities);
    cookie.save('auth', token);
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
    } else {
      setLoggedIn(false)
    }
  }, [])

  return (
    <loginContext.Provider value={{ signin,loggedIn,logout ,can}}>
      {children}
    </loginContext.Provider>
  );
}
