import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useSelector} from 'react-redux';
const StudioCard = ({ studio, userRole }) => {
    const user = useSelector(state => state.auth.user);
    const { id , name, address, images, rate } = studio;
    const navigate = useNavigate(); // Initialize the navigate function


    // Function to generate star icons based on the rate value
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rate) {
                stars.push(<FaStar key={i} color="#ffc107" />);
            } else {
                stars.push(<FaRegStar key={i} color="#ced4da" />);
            }
        }
        return stars;
    };


     const handleReservationClick = () => {
        navigate('/reservation', { state: { studio } });
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={images.length > 0 ? images[0].image : 'placeholder_image_url'} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    Address: {address}
                </Card.Text>
                <div>
                    Rate: {renderStars()}
                </div>
                {user.role === 'Customer' && (
                <Button variant="primary" onClick={handleReservationClick}>Reservation</Button>
            )}

            </Card.Body>
        </Card>
    );
};

export default StudioCard;
