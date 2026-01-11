import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/api/fetch/user`, {
          method: 'GET',
          credentials: 'include',
        });
        const userData = await userResponse.json();
        setUser(userData);
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Create Account</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account? <span style={{ cursor: 'pointer', color: '#004aad' }} onClick={() => navigate('/login')}>Login</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
