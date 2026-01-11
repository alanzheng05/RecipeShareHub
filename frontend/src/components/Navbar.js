import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookie by hitting a logout endpoint (not built yet)
    document.cookie = 'auth=; Max-Age=0; path=/;';
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Recipe Share Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">New Recipe</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">My Recipes</Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/register" className="btn btn-signup">Sign Up</Link>
              </>
            ) : (
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
