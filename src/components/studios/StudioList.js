import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StudioCard from './StudioCard'; 
import './list.css'; 
const StudiosList = ({ studios }) => {
    return (
        <Row className="studios-list">
            {studios.map(studio => (
                <Col key={studio.id} xs={12} sm={6} md={4} lg={3}>
                    <StudioCard studio={studio} />
                </Col>
            ))}
        </Row>
    );
};

export default StudiosList;

