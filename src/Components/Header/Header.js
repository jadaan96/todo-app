import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { When } from 'react-if';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

import { loginContext } from '../../Context/AuthContext/AuthContext';
import cookie from 'react-cookies';

function NavTool() {
  const {  loggedIn, logout,validateToken ,setData} = useContext(loginContext); 
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      let obj = {
          username: username,
          password: password,
      }

      const headers = {
        Authorization: `Basic ${btoa(`${obj.username}:${obj.password}`)}`,
    };
    const response = await axios.post(`http://localhost:3001/signin`, null, {
        headers: headers,
    });
    setData(response.data);
    validateToken(response.data) // Store the response data
    if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          cookie.save('auth', token);
        }
    }} catch (e) {
      console.log(e.message);
  }
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" style={{ color: 'white' }}>Home</Navbar.Brand>
          <Navbar.Brand href="/setting" style={{ color: 'white' }}>setting</Navbar.Brand>
          <Navbar.Brand href="/signup" style={{ color: 'white' }}>signup</Navbar.Brand>

          <When condition={loggedIn}>
            <button onClick={logout}>Log Out</button>
          </When>

          <When condition={!loggedIn}>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="UserName"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                placeholder="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button>Login</button>
            </form>
          </When>
        </Container>
      </Navbar>
    </>
  );
}

export default NavTool;
