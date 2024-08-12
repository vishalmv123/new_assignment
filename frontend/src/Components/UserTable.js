import React, { useEffect, useState } from 'react';
import './UserTable.css';
import { Link } from 'react-router-dom';

const UserTable = () => {
  const [users, setUsers] = useState([]); 

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    try {
      const resp = await fetch(`http://localhost:5000/api/v1/deleteUser/${user.name}`, {
        method: 'DELETE',
      });
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await resp.json();
      console.log('Delete result:', result);
      setUsers(users.filter((u) => u.name !== user.name));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid date';   
    return date.toISOString().split('T')[0]; 
  };
  

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Gender</th>
            <th>About</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{user.name}</td>
              <td className="table-cell">{formatDate(user.dob)}</td> {/* Format the DOB */}
              <td className="table-cell">{user.age}</td>
              <td className="table-cell">{user.gender}</td>
              <td className="table-cell">
                <textarea
                  value={user.about}
                  readOnly
                  className="about-textarea"
                />
              </td>
              <td className="table-cell action-buttons">
                <Link to={`/update/${user.name}`}>
                  <button className="update-button">Update</button>
                </Link>
                <button
                  onClick={() => handleDelete(user)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
