import React from 'react'
import { useState , useEffect} from 'react'

function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch users from the API
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
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
    <br />
    <h1>User List</h1>
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
  )
}

export default Home