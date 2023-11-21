import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
    <form
    onSubmit={addUser}
    style={{
      maxWidth: '400px',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      textAlign: 'left',
    }}
  >
    <label style={{ display: 'block', marginBottom: '10px' }}>
      First Name:
      <input
        type="text"
        name="firstName"
        maxLength={12}
        required
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
    </label>
    <br />
    <label style={{ display: 'block', marginBottom: '10px' }}>
      Username:
      <input
        type="text"
        name="username"
        maxLength={12}
        pattern="[a-zA-Z0-9]+"
        required
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
    </label>
    <br />
    <label style={{ display: 'block', marginBottom: '10px' }}>
      Password:
      <input
        type="password"
        name="password"
        maxLength={24}
        required
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
    </label>
    <br />
    <button
      type="submit"
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Register
    </button>
  </form>
  )
}

export default Register