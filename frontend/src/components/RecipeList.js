import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeList({ recipes }) {
  const navigate = useNavigate();

  const handleViewDetail = (recipe) => {
    navigate(`/detail/${recipe.uniqueID}`, { state: { recipe } });
  };

  return (
    <div className="row">
      {recipes.length === 0 ? (
        <div className="col-12 text-center py-5">
          <h3>No recipes found</h3>
          <p>Try a different search or create your own recipe!</p>
        </div>
      ) : (
        recipes.map(recipe => (
          <div className="col-md-4" key={recipe.uniqueID}>
            <div className="card recipe-card">
              {recipe.imageURL && (
                <img
                  src={recipe.imageURL}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleViewDetail(recipe)}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
