import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../api/axio';
import ErrorHandler from '../error-handler/ErrorHandler';
import StudiosList from '../studios/StudioList';
import '../../style/profile.css'
const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const [studios, setStudios] = useState([]);

    useEffect(() => {
        fetchStudios();
    }, []);

    const fetchStudios = () => {
        axiosInstance.get('api/studios/', { params: { owner_profile: 'false' } })
            .then(response => {
                setStudios(response.data);
            })
            .catch(error => {
                console.error('Error fetching studios:', error);
            });
    }

    return (
        <Container className="profile-container">
            <Row>
                <Col md={8}>
                    <div className="user-info">
                        <h1>Welcome, {user.name}!</h1>
                        <p>Email: {user.email}</p>
                    </div>
                </Col>
                
            </Row>
           
                    <div className="studios-list">
                        <h2>Your Studios</h2>
                        <StudiosList studios={studios} />
                    </div>
              
        </Container>
    );
};

export default ErrorHandler(Profile, axiosInstance);
