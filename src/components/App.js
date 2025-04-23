// create your App component here
import React, { useState, useEffect } from 'react';

function App() {
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDogImage(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dog image:', error);
        setError('Failed to fetch dog image.');
        setLoading(false);
      });
  }, []); //This effect runs only once after the initial render

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>A Random Dog</h2>
      {dogImage && <img src={dogImage} alt="A Random Dog" style={{ maxWidth: '500px' }} />}
    </div>
  );
}

export default App;