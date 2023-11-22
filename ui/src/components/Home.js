import React from 'react'
import { useState , useEffect} from 'react'
import axios from "axios";
import EmptyState from './EmptyState';
import { useNavigate } from "react-router-dom";
import "../css/home.css";

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

  return (
    <div>
      <h1>welcome</h1>
    {users.length <= 0 ? (
        <EmptyState />
      ) : (
        <div>
    <h2>There are {users.length} users registered to this website!  </h2>
    <h2>User List:</h2>
      <table>
        <thead>
          <tr>
            <th >First Name</th>
            <th >Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td >{user.username}</td>
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