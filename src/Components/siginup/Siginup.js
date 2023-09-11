'use strict'
import axios from "axios"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const [data, setData] = useState()
    const navigate = useNavigate();
    async function signUp(e) {
        try {
            e.preventDefault();
            let obj = {
                username: e.target.userName.value,
                password: e.target.password.value,
                role:e.target.Role.value
            }
            console.log(obj);
            const data = await axios.post(`http://localhost:3001/signup`, obj)
            setData(data)
            console.log(data);

            if (data) {
                navigate('/');
            }
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <>
            <form onSubmit={signUp}>
                <label htmlFor="firstName">user name:</label>
                <input type="text" id="firstName" name="userName" required />

                <label htmlFor="role">Role:</label>
                <input type="text" id="Role" name="Role" required />
                
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}