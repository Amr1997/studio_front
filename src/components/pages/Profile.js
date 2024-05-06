import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axio';
const Profile = () => {
    const user = useSelector(state => state.auth.user);

    const handleGetStudios = () => {
        axiosInstance.get('api/studios/')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.code === "token_not_valid") {
                // Token is invalid or expired, handle the error accordingly
                console.error('Access token is invalid or expired. Redirecting to login page...');
                // Redirect the user to the login page or refresh the token
            } else {
                console.error('Error fetching studios:', error);
            }
        });
    }
    return (
        <div>
            <h1>Welcome {user.name}!</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={handleGetStudios}>Get Studios</button>
        </div>
    );
};

export default Profile;
