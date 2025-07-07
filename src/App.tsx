import './App.css';
import { useState } from 'react';
import Weather from './components/Weather';
import Metrics from './components/Metrics';
import Header from './components/Header';
import { fetchCityCoordinates } from './services/data';

function App() {
  const [cityName, setCityName] = useState('Paris');
  const [coordinates, setCoordinates] = useState({ latitude: 48.8566, longitude: 2.3522 });

  // Fonction déclenchée par la barre de recherche
  async function handleSearch(city: string) {
    try {
      const { latitude, longitude } = await fetchCityCoordinates(city);
      setCityName(city);
      setCoordinates({ latitude, longitude });
    } catch (error) {
      console.error("Erreur lors de la recherche de la ville :", error);
      alert("Ville non trouvée. Veuillez réessayer.");
    }
  }

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <h2>Météo à {cityName}</h2>
      <Weather latitude={coordinates.latitude} longitude={coordinates.longitude} />
      <Metrics latitude={coordinates.latitude} longitude={coordinates.longitude} />
    </div>
  );
}

export default App;