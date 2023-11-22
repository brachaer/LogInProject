import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../css/login.css";

function Login() {
  const navigate = useNavigate();

  const login = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log(`form data: ${formData}`);
      const data= Object.fromEntries(formData);
      console.log(data);
      const res= await axios.post(`http://localhost:8080/api/users/login`, data,{withCredentials: true});

      if(res.status === 200){
        navigate('/');
      }
      else{
        alert('Login Failed');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error:'+ error);   
    }
  };
 
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>
          Username: <input type="text" name="username" required/> 
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
