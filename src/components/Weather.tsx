import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/data';
import MeteoCodeMapping from '../services/meteoCodeMapping';
import './Weather.css';

type WeatherProps = {
  latitude: number;
  longitude: number;
  city: string;
  countryCode: string;
};

const Weather: React.FC<WeatherProps> = ({ latitude, longitude, city, countryCode }) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(latitude, longitude);
        setTemperature(data.current.temperature_2m);
        setWeatherCode(data.current.weather_code);
      } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  const meteo = weatherCode !== null ? MeteoCodeMapping[weatherCode] : null;

return (
    <div className="weather-container">
      <h2>
        Météo à {city}, {countryCode}
      </h2>
      <p>Température actuelle : {temperature}°C</p>

      {meteo && (
        <div className="weather-details">
          <img
            // src={`/iconsMeteo/${meteo.icon}.svg`}
            src={`${import.meta.env.BASE_URL}iconsMeteo/${meteo.icon}.svg`}
            alt={meteo.desc}
            className="weather-icon"
          />
          <p className="weather-description">{meteo.desc}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
