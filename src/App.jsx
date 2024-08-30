/* App.jsx */
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';

// const API_KEY = import.meta.env.VITE_WEATHERBIT_API_KEY;
const API_KEY = 'a9a0f58f41804d2b945c920db5f378dc';

console.log('API Key:', API_KEY); // Add this line for debugging

if (!API_KEY) {
  console.error('API key is not defined. Make sure it is set in .env.local');
}

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
      if (response.status === 403) {
        throw new Error('Access forbidden. Please check your API key and usage limits.');
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setForecastData(json); // Store the entire response for access to additional fields
      setError(null);
      console.log('Fetched data by city:', json); // Added console log for debugging
    } catch (error) {
      console.error('Failed to fetch weather forecast data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const fetchData = async () => {
        const url = `${BASE_URL}?lat=${location.latitude}&lon=${location.longitude}&key=${API_KEY}`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          if (json.error) {
            throw new Error(json.error);
          }
          setForecastData(json); // Store the entire response for access to additional fields
          setError(null);
          console.log('Fetched data by geolocation:', JSON.stringify(json, null, 2)); // Added console log for debugging
        } catch (error) {
          console.error('Failed to fetch weather data:', error);
          setError(`Failed to fetch weather data: ${error.message}`);
          setForecastData({ data: [] }); // Reset forecast data on error
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