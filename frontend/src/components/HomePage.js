import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/api/fetch/recipes`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched recipes:", data);
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('Expected an array but got:', data);
          setRecipes([]);
        }
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      });
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="mb-4">Discover Delicious Recipes</h1>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search recipes..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}

export default HomePage;
