import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard({ user }) {
  const [userRecipes, setUserRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/api/fetch/user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.recipes) {
          setUserRecipes(data.recipes);
        }
      })
      .catch(error => console.error('Error fetching user recipes:', error));
  }, []);

  const handleDelete = async (recipe) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/api/delete/recipe`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uniqueID: recipe._id }),
      });

      if (response.ok) {
        setUserRecipes(userRecipes.filter(r => r._id !== recipe._id));
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">My Recipes</h2>

      <div className="mb-4">
        <button className="btn btn-primary" onClick={() => navigate('/create')}>
          Create New Recipe
        </button>
      </div>

      {userRecipes.length === 0 ? (
        <div className="text-center py-5">
          <h3>You haven't created any recipes yet</h3>
          <p>Start sharing your culinary creations with the world!</p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/create')}>
            Create Your First Recipe
          </button>
        </div>
      ) : (
        <div className="row">
          {userRecipes.map(recipe => (
            <div className="col-md-6 mb-4" key={recipe.uniqueID}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.instructions}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/detail/${recipe.uniqueID}`, { state: { recipe } })}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => navigate(`/edit/${recipe.uniqueID}`, { state: { recipe } })}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(recipe)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
