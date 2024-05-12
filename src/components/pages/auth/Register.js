import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axiosInstance from '../../api/axio';
function Register() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Customer'); // Default value for user type

  const handleRegister = () => {
    const formData = {
      email: email,
      name: fullName,
      password: password,
      user_type: userType
    };

    axiosInstance.post('api/users//', formData)
    .then(response => {
      console.log('User registered successfully:', response.data);
    })
    .catch(error => {
      console.error('Error registering user:', error);
    });
    console.log(formData);
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ffffff 50%, #007bff 50%)', minHeight: '100vh' }}>
      <Container fluid>
        <Row className='justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
          <Col xs={12} md={8} lg={6}>
            <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <Card.Body className='p-5 d-flex flex-column'>
                <h2 className="fw-bold mb-2 text-center">Register</h2>
                <Form.Group className='mb-4'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type='text' size="lg" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>User Type</Form.Label>
                  <Form.Control as='select' size="lg" value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value='Admin'>Admin</option>
                    <option value='Studio_owner'>Studio Owner</option>
                    <option value='Customer'>Customer</option>
                  </Form.Control>
                </Form.Group>
                <Button size='lg' block onClick={handleRegister}>
                  Register
                </Button>
                <hr className="my-4" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
