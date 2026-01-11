import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeForm({ user }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/api/create/recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
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
        setError(data.message || 'Failed to create recipe');
      }
    } catch (err) {
      console.error('Create recipe error:', err);
      setError('An error occurred while creating the recipe.');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Create New Recipe</h2>
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
          <button type="submit" className="btn btn-primary me-2">Create Recipe</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
