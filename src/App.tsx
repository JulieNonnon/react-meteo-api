import './App.css';
import { useState } from 'react';
import Weather from './components/Weather';
import Metrics from './components/Metrics';
import Header from './components/Header';
import { fetchCityCoordinates } from './services/data';

function App() {
  const [cityName, setCityName] = useState('Paris');
  const [coordinates, setCoordinates] = useState({ latitude: 48.8566, longitude: 2.3522 });
  const [countryCode, setCountrycode] =useState('FR')

  //Fonction pour que la ville retournée ait sa première lettre en majuscule par défaut (idem pour ville ayant un nom composé (ex: "Baton Rouge"))
  function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }
  // Fonction déclenchée par la barre de recherche
  async function handleSearch(city: string) {
    try {
      const { latitude, longitude, countryCode } = await fetchCityCoordinates(city);
      setCityName(capitalizeWords(city)); // ville avec majuscule
      setCoordinates({ latitude, longitude });
      setCountrycode(countryCode)
    } catch (error) {
      console.error("Erreur lors de la recherche de la ville :", error);
      alert("Ville non trouvée. Veuillez réessayer.");
    }
  }

  return (
    <div className="app-container">
      <Header onSearch={handleSearch} />
      <div className="component-container">
        <Weather
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          city={cityName}
          countryCode={countryCode}
        />
        <Metrics latitude={coordinates.latitude} longitude={coordinates.longitude} />
      </div>
    </div>
  );
}

export default App;