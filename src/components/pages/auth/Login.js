import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authActions';
import { useNavigate } from 'react-router-dom'; 

function Login() { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(credentials);
    dispatch(login(credentials));
    navigate('/profile');
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ffffff 50%, #007bff 50%)', minHeight: '100vh' }}>
      <Container fluid>
        <Row className='justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
          <Col xs={12} md={8} lg={6}>
            <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <Card.Body className='p-5 d-flex flex-column'>
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                <p className="text-muted mb-3 text-center">Please enter your login and password!</p>
                <Form onSubmit={handleLogin}>
                  <Form.Group className='mb-4'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' name="email" value={credentials.email} onChange={handleChange} size="lg" />
                  </Form.Group>
                  <Form.Group className='mb-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name="password" value={credentials.password} onChange={handleChange} size="lg" />
                  </Form.Group>
                  <Button type="submit" size='lg' block>
                    Login
                  </Button>
                </Form>
                <hr className="my-4" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login; 
