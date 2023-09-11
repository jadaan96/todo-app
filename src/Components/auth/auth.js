import React, { useContext } from 'react'
import { loginContext } from '../../Context/AuthContext/AuthContext';

function Auth(props) {
    const {can ,loggedIn} = useContext(loginContext); 

  const canDo = props.capability ? can(props.capability) : true;
  const authinticated = canDo && loggedIn;

  return (
    authinticated &&
    <div>
      {props.children}
    </div>
  )
}

export default Auth