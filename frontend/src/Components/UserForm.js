import React, {  useState} from "react";

import { Link } from "react-router-dom";
const UserForm = () => {


  const [formData, setFormData] = useState({
    name: "",
    dob : "",
    age: "",
    password: "",
    gender: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
 
    
    
   const resp = await fetch('http://localhost:5000/api/v1/register' ,{
      body : JSON.stringify(formData) ,
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      }
    })

    if(resp.ok){
      alert('User created successfully')
    }
   setFormData({
    name: "",
    dob:"" ,
    age: "",
    password: "",
    gender: "",
    about: "",
   })
  };

  return (
    <div className="form-container">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">DOB:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="form-group">
        <Link to="/showAll">
          <button type="">Show All Users</button>
          </Link>
        </div>
    </div>
  );
};

export default UserForm;
