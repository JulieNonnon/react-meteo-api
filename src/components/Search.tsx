// import { fetchCityCoordinates } from '../services/data';
import React, { useState } from 'react';
import './Search.css';

type SearchProps = {
  //onCoordinatesFound: (latitude: number, longitude: number, cityName: string) => void;
  onSearch: (city: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

//const Search: React.FC<SearchProps>= ({ onCoordinatesFound }) => {
  //const [query, setQuery] = useState('');
  // const [city, setCity] = useState ('');
  // const [error, setError] = useState('');

//   const handleSearch = () => {
//     console.log("Ville recherchée :", query); // TODO: Appeler l’API géocodage → coordonnées
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const { latitude, longitude } = await fetchCityCoordinates(city);
//       onCoordinatesFound(latitude, longitude, city);
//     } catch (err: any) {
//       setError(err.message || 'Erreur de recherche');
//     }
//   };

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Rechercher une ville..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
      {/* {error && <p className="error">{error}</p>} */}
    </div>
  );
};

//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         placeholder="Entrez une ville"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Rechercher</button>
//     </div>
//   );
// };

export default Search;
