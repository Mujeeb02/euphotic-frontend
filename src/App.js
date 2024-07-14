// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(fetchDishes, 1000); 
    fetchDishes(); 
    return () => clearInterval(intervalId); 
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('https://euphotic-backend.onrender.com/api/dishes');
      console.log(response.data)
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const togglePublished = async (id) => {
    try {
      await axios.put(`https://euphotic-backend.onrender.com/api/dishes/${id}/toggle`);
      fetchDishes();
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">Dish Dashboard</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {dishes.map(dish => (
          <li key={dish.dishId} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src={dish.imageUrl} alt={dish.dishName} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{dish.dishName}</h2>
            <p className={`mb-4 ${dish.isPublished ? 'text-green-500' : 'text-red-500'}`}>
              {dish.isPublished ? 'Published' : 'Unpublished'}
            </p>
            <button
              onClick={() => togglePublished(dish._id)}
              className={`px-4 py-2 rounded text-white ${dish.isPublished ? 'bg-red-500' : 'bg-green-500'} hover:opacity-75`}
            >
              {dish.isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
