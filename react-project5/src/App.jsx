/* App.jsx */
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const API_KEY = '1090611ebc8a470e81a9729c40dc981c';

const App = () => {
  const [forecastData, setForecastData] = useState({ data: [] });
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

  const fetchWeatherForecastByCity = async (city) => {
    const url = `${BASE_URL}?city=${encodeURIComponent(city)}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setForecastData(json); // Store the entire response for access to additional fields
      setError(null);
      console.log('Fetched data by city:', json); // Added console log for debugging
    } catch (error) {
      console.error('Failed to fetch weather forecast data:', error);
      setError('Failed to fetch weather forecast data');
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const fetchData = async () => {
        const url = `${BASE_URL}?lat=${location.latitude}&lon=${location.longitude}&key=${API_KEY}`;
        try {
          const response = await fetch(url);
          const json = await response.json();
          setForecastData(json); // Store the entire response for access to additional fields
          console.log('Fetched data by geolocation:', json); // Added console log for debugging
        } catch (error) {
          console.error('Failed to fetch weather data:', error);
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [location]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  return (
    <Dashboard
      forecastData={forecastData}
      error={error}
      onCitySearch={fetchWeatherForecastByCity}
    />
  );
};

export default App;