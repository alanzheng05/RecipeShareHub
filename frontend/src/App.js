import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import UserDashboard from './components/UserDashboard';
import RecipeEditForm from './components/RecipeEditForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/api/fetch/user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Not logged in');
    })
    .then(data => {
      setUser(data);
    })
    .catch(() => {
      setUser(null);
    });
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <RegisterPage setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/create" element={user ? <RecipeForm user={user} /> : <Navigate to="/login" />} />
        <Route path="/detail/:id" element={<RecipeDetail />} />
        <Route path="/dashboard" element={user ? <UserDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={user ? <RecipeEditForm /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
