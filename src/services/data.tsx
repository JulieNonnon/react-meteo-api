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

  const { latitude, longitude } = data.results[0];
  return { latitude, longitude };
};

// APPEL DE L'API OPEN METEO POUR RECUPERATION DES DONNEES DE LA VILLE LOCALISEE

export const fetchWeatherData = async (latitude: number, longitude: number) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,is_day&hourly=visibility,precipitation_probability,uv_index&daily=sunrise,sunset&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données météo');
  }

  return response.json();
};
