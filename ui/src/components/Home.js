import React from 'react'
import { useState , useEffect} from 'react'
import axios from "axios";
import EmptyState from './EmptyState';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users`,{withCredentials: true});
      const data = await res.data;
      setUsers(data);
    } catch (err) {
      console.error(err.response.data);
      navigate("/login");
    }
  }

  useEffect(() => {
   getUsers();
   }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  };

  const tdStyle = {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  };

  return (
    <div>
      
      <h1 >Home Page</h1>
      <br />
    <h2>welcome</h2>
    {users.length <= 0 ? (
        <EmptyState />
      ) : (
        <div>
    <h3>

            There are {users.length} users registered to this website! 
          </h3>
    <br />
    <h4>User List</h4>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.firstName}</td>
              <td style={tdStyle}>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
       )}
    </div>
  )
}

export default Home