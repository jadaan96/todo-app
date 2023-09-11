import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { When } from 'react-if';
import { loginContext } from '../../Context/AuthContext/AuthContext';

function NavTool() {
  const { signin, loggedIn, logout } = useContext(loginContext); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(username, password);
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" style={{ color: 'white' }}>Home</Navbar.Brand>
          <Navbar.Brand href="/setting" style={{ color: 'white' }}>setting</Navbar.Brand>
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
