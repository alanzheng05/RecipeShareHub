import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RecipeEditForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  const [title, setTitle] = useState(recipe?.title || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients.join('\n') || '');
  const [instructions, setInstructions] = useState(recipe?.instructions || '');
  const [imageURL, setImageURL] = useState(recipe?.imageURL || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!recipe) {
      navigate('/');
    }
  }, [recipe, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/api/update/recipe`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id: recipe._id,
          title,
          ingredients: ingredients.split('\n').map(item => item.trim()).filter(item => item),
          instructions,
          imageURL,
        }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update recipe');
      }
    } catch (err) {
      console.error('Update recipe error:', err);
      setError('An error occurred while updating the recipe.');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Edit Recipe</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Recipe Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients (one per line)</label>
          <textarea
            className="form-control"
            rows="5"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            rows="5"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Recipe Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-primary me-2">Update Recipe</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default RecipeEditForm;