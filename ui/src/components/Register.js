import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../css/register.css";
function Register() {
  const navigate = useNavigate();  
  const addUser = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data= Object.fromEntries(formData);
      const res=  await axios.post('http://localhost:8080/api/users', data); 
      if(res.status === 201){
        alert('Registration Successful');
        navigate('/login');
      }
      else{
        alert('Registration Failed');
      } 
    } catch (err) {
      console.log(err);
      alert('Error:'+ err);
    }   
 }
  return (
    <form onSubmit={addUser}>
    <label>First Name:
      <input type="text" name="firstName" maxLength={12} required/>
    </label>
    <br />
    <label>Username:
      <input type="text" name="username" maxLength={12} pattern="[a-zA-Z0-9]+" required/>
    </label>
    <br />
    <label> Password:
      <input type="password" name="password" maxLength={24} required/>
    </label>
    <br />
    <button type="submit">Register</button>
  </form>
  )
}

export default Register