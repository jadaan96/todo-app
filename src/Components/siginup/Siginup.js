import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
  from 'mdb-react-ui-kit';
import axios from "axios"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [data, setData] = useState()
  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let obj = {
        username: e.target.userName.value,
        password: e.target.password.value,
        role: e.target.form4.value,
      }
      const data = await axios.post(`https://sample-back-end.onrender.com/signup`, obj)
      setData(data)
      if (data) {
        navigate('/');
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <MDBContainer
      fluid
      className='d-flex align-items-center justify-content-center bg-image'
      style={{
        backgroundImage:
          'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)',
      }}
    >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <h2 className='text-uppercase text-center mb-5'>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' name='userName' type='text' />
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' name='password' type='password' />

            <div className='mb-4'>
              <label htmlFor='form4' className='form-label'>
                Role
              </label>
              <select className='form-select' id='form4' name='role'>
                <option value='User'>User</option>
                <option value='writer'>writer</option>
                <option value='Editor'>Editor</option>
                <option value='admin'>admin</option>
              </select>
            </div>

            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>
              Register
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;