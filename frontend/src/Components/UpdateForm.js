import React, { useEffect, useState } from 'react';
import './UpdateForm.css';
import { useParams ,useNavigate} from 'react-router-dom';

const UpdateUserForm = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const [details, setDetails] = useState({
        age: "",
        gender: "",
        about: "",
        dob : "" 
    });

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/getuser/${name}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
          
            setDetails(data.user || {}); 
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(`http://localhost:5000/api/v1/updateUser/${name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(details)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log('Update result:', data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
        navigate('/showAll')
    };

    return (
        <div className="update-form-container">
            <form onSubmit={handleSubmit} className="update-form">
          
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={details.age || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={details.gender || ''}
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
                    <label htmlFor="dob">DOB:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={details.dob || ''}
                        onChange={handleChange}
                       
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="about">About:</label>
                    <textarea
                        id="about"
                        name="about"
                        rows="5"
                        placeholder="Write something about yourself..."
                        value={details.about || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Update Info</button>
            </form>
        </div>
    );
};

export default UpdateUserForm;
