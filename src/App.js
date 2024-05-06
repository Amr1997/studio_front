import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Profile from './components/pages/Profile';
function App() {
  const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.accessToken !== null);
    console.log(isAuthenticated);
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
