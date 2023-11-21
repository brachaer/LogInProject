import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
  const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  form: {
    maxWidth: '300px',
    margin: 'auto',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={login} style={styles.form}>
        <label>
          Username: <input type="text" name="username" required style={styles.input}/> 
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" required style={styles.input}/>
        </label>
        <br />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
