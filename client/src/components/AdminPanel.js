import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState('');

  const STATIC_PASSWORD = 'admin123';

  const fetchRegistrations = async () => {
    const res = await axios.get(`http://localhost:5000/api/registrations?search=${search}`);
    setRegistrations(res.data);
  };

  useEffect(() => {
    if (loggedIn) fetchRegistrations();
  }, [loggedIn, search]);

  if (!loggedIn) {
    return (
      <div>
        <h3>Admin Login</h3>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={() => {
          if (password === STATIC_PASSWORD) setLoggedIn(true);
          else alert('Wrong password');
        }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>Registered Students</h3>
      <input
        placeholder="Search by name/email"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={fetchRegistrations}>Search</button>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Course</th><th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map(r => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.course}</td>
              <td>{r.completed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
