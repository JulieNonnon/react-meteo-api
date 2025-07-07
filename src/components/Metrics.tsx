import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/data';
import MetricsCard from './MetricsCard';
import './Metrics.css';
//import Header from './Header';

type MetricsProps = {
    latitude: number;
    longitude: number;
};

type WeatherData = {
  current: {
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  hourly: {
    visibility: number[];
  };
  daily: {
    sunrise: string[];
    sunset: string[];
  };
};
    
const Metrics: React.FC<MetricsProps> = ({ latitude, longitude }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchWeatherData(latitude, longitude);
        setWeather(data);
      } catch (err) {
        setError('Erreur lors du chargement des données météo');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [latitude, longitude]);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return null;

  // Exemple de valeurs extraites
  const humidity = weather.current.relative_humidity_2m;
  const windSpeed = weather.current.wind_speed_10m;
  const windDirection = weather.current.wind_direction_10m;
  const visibility = weather.hourly.visibility[0]; // première heure
  const sunrise = weather.daily.sunrise[0];
  const sunset = weather.daily.sunset[0];

  const metrics = [
    { icon: "💧", label: 'Humidité', value: `${humidity} %` },
    { icon: "💨", label: 'Vent', value: `${windSpeed} km/h` },
    { icon: "🧭", label: 'Direction du vent', value: `${windDirection}°` },
    { icon: "👀", label: 'Visibilité', value: `${visibility} m` },
    { icon: "🌅", label: 'Lever du soleil', value: new Date(sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { icon: "🌇", label: 'Coucher du soleil', value: new Date(sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ];
    
  return (
    <div className="metrics-container">
      {metrics.map((metric, index) => (
        <MetricsCard key={index} icon={metric.icon} label={metric.label} value={metric.value} />
      ))}
    </div>
  );
};

//   const metrics = [
//     { label: "Humidité", value: "60%", icon: "💧" },
//     { label: "Vent", value: "12 km/h", icon: "💨" },
//     { label: "Direction du vent", value: "Nord-Est", icon: "🧭" },
//     { label: "Visibilité", value: "10 km", icon: "👀" },
//     { label: "Lever du soleil", value: "06:12", icon: "🌅" },
//     { label: "Coucher du soleil", value: "21:47", icon: "🌇" },
//   ];

//   return (
//     <div className="metrics-container">
//       <Header />
//       <div className="metrics-grid">
//         {metrics.map((metric, index) => (
//           <MetricsCard key={index} {...metric} />
//         ))}
//       </div>
//     </div>
//   );
//};

export default Metrics;
