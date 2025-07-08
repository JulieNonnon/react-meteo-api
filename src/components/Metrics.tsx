import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/data';
import MetricsCard from './MetricsCard';
import './Metrics.css';

type MetricsProps = {
    latitude: number;
    longitude: number;
};

// type WeatherData = {
//   current: {
//     relative_humidity_2m: number;
//     wind_speed_10m: number;
//     wind_direction_10m: number;
//   };
//   hourly: {
//     visibility: number[];
//   };
//   daily: {
//     sunrise: string[];
//     sunset: string[];
//   };
// };
    
// const Metrics: React.FC<MetricsProps> = ({ latitude, longitude }) => {
//     const [weather, setWeather] = useState<WeatherData | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

const Metrics = ({ latitude, longitude }: MetricsProps) => {
  const [data, setData] = useState<any>(null);

// useEffect(() => {
//     const getData = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const data = await fetchWeatherData(latitude, longitude);
//         setWeather(data);
//       } catch (err) {
//         setError('Erreur lors du chargement des données météo');
//       } finally {
//         setLoading(false);
//       }
//     };

useEffect(() => {
    const getMetrics = async () => {
      try {
        const response = await fetchWeatherData(latitude, longitude);
        setData(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo:', error);
      }
    };

  getMetrics();
  }, [latitude, longitude]);

  if (!data || !data.current) return <p>Chargement des métriques...</p>;

  const humidity = data.current.relative_humidity_2m;
  const windSpeed = data.current.wind_speed_10m;
  const windDirection = data.current.wind_direction_10m;
  const visibility = data.hourly?.visibility?.[0];
  const sunrise = data.daily?.sunrise?.[0];
  const sunset = data.daily?.sunset?.[0];

  const metricsList = [
    { icon: "💧", label: 'Humidité', value: `${humidity}%` },
    { icon: "💨", label: 'Vent', value: `${windSpeed} km/h` },
    { icon: "🧭", label: 'Direction du vent', value: `${windDirection}°` },
    { icon: "👀", label: 'Visibilité', value: visibility ? `${visibility} m` : 'N/A' },
    { icon: "🌅", label: 'Lever du soleil', value: sunrise ? new Date(sunrise).toLocaleTimeString() : 'N/A' },
    { icon: "🌇", label: 'Coucher du soleil', value: sunset ? new Date(sunset).toLocaleTimeString() : 'N/A'},
  ];

  return (
    <div className="metrics-grid">
      {metricsList.map((metric, index) => (
        <MetricsCard 
          key={index} 
          icon={metric.icon} 
          label={metric.label} 
          value={metric.value} 
        />
      ))}
    </div>
  );
};

export default Metrics;
