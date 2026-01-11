import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RecipeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <div className="container">
        <p>No recipe selected.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
        ← Back to Recipes
      </button>

      <div className="row">
        <div className="col-md-6 mb-4">
          {recipe.imageURL && (
            <img
              src={recipe.imageURL}
              alt={recipe.title}
              className="img-fluid recipe-detail-img w-100"
            />
          )}
        </div>
        <div className="col-md-6">
          <h1>{recipe.title}</h1>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          <div className="mb-3">
            <h5>Ingredients:</h5>
            <ul className="list-group">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item">{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
