import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import Slider from 'react-slick'; // Import slider component
import DatePicker from 'react-datepicker'; // Import date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles
import axiosInstance from '../api/axio';
import 'slick-carousel/slick/slick.css'; // Import slick carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick carousel theme styles
import '../../style/reservation.css'; // Import custom Reservation styles
import ErrorHandler from '../error-handler/ErrorHandler';
const Reservation = () => {
    const location = useLocation();

    // Retrieve studio data from location state
    const { studio } = location.state || {};

    // State variables for start and end dates
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Function to handle reservation submission
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    
    const handleSubmitReservation = async () => {
        try {
            // Format the start date and end date with correct formats
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
    
            // Send a POST request to the API endpoint with the formatted dates
            await axiosInstance.post('/api/reservations/', {
                studio: studio.id,
                start_date: formattedStartDate,
                end_date: formattedEndDate
            });
    
            // Handle success
            console.log('Reservation submitted successfully!');
        } catch (error) {
            // Handle errors
            console.error('Error submitting reservation:', error);
        }
    };
        
    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Container className="reservation-container">
            <h1>Reservation Page</h1>
            <div className="slider-container">
                {/* Render slider with all studio images */}
                <Slider {...sliderSettings}>
                    {studio && studio.images.map(image => (
                        <img key={image.id} src={image.image} alt="Studio" />
                    ))}
                </Slider>
            </div>
            <div className="studio-info">
                {/* Display studio data */}
                <Card>
                    <Card.Body>
                        <Card.Title>{studio && studio.name}</Card.Title>
                        <Card.Text>Address: {studio && studio.address}</Card.Text>
                        {/* Add more studio data fields as needed */}
                    </Card.Body>
                </Card>
            </div>
            <div className="date-picker">
                {/* Date picker for selecting start date */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="Select start date" />
                {/* Date picker for selecting end date */}
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} placeholderText="Select end date" />
            </div>
            <div className="submit-button">
                {/* Submit reservation button */}
                <Button variant="primary" onClick={handleSubmitReservation}>Submit Reservation</Button>
            </div>
        </Container>
    );
};

export default ErrorHandler(Reservation, axiosInstance);
