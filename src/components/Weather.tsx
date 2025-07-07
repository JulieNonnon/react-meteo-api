import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/data';

type WeatherProps = {
  latitude: number;
  longitude: number;
};

const Weather: React.FC<WeatherProps> = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchWeatherData(latitude, longitude);
        setWeather(data);
      } catch (err) {
        setError('Impossible de charger les données météo');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [latitude, longitude]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Température actuelle : {weather.current.temperature_2m}°C</h2>
      {/* Autres infos météo ici */}
    </div>
  );
};

export default Weather;

