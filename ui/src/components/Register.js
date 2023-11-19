import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
          firstName: '',
          username: '',
          password: '',
        });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value, });
    };
      
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=  await axios.post('http://localhost:8080/api/users/add', formData); 
      const data = await res.data;
      console.log(formData);    
      setFormData({ firstName: '', username: '', password: '',  });
      console.log(formData);   
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert('Error:'+ err);
    }   
 }
      
  return (
    <form
    onSubmit={handleSubmit}
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
        value={formData.firstName}
        onChange={handleChange}
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
        value={formData.username}
        onChange={handleChange}
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
        value={formData.password}
        onChange={handleChange}
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