// APPEL DE L'API GEOCODING POUR LA GEOLOCALISATION DE LA VILLE

export const fetchCityCoordinates = async (city: string) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des coordonnées');
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('Ville non trouvée');
  }

  const { latitude, longitude, country_code } = data.results[0];

  return { 
    latitude, 
    longitude, 
    countryCode: country_code
  };
};

// APPEL DE L'API OPEN METEO POUR RECUPERATION DES DONNEES DE LA VILLE LOCALISEE

export const fetchWeatherData = async (latitude: number, longitude: number) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,wind_direction_10m,is_day&hourly=visibility,precipitation_probability,uv_index&daily=sunrise,sunset&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données météo');
  }

  const data = await response.json();
  return data;

  //return response.json();
  // return {
  //   temperature: data.current.temperature_2m,
  //   weatherCode: data.current.weather_code,
  //   humidity: data.current.relative_humidity_2m,
  //   windSpeed: data.current.wind_speed_10m,
  //   windDirection: data.current.wind_direction_10m,
  //   isDay: data.current.is_day,

  //   // données horaires
  //   hourly: {
  //     visibility: data.hourly.visibility,
  //     uvIndex: data.hourly.uv_index,
  //     precipitationProbability: data.hourly.precipitation_probability,
  //     time: data.hourly.time
  //   },

  //   // données journalières
  //   daily: {
  //     sunrise: data.daily.sunrise,
  //     sunset: data.daily.sunset
  //   }
  // };
};
