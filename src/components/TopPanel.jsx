/* TopPanel.jsx */
import React from 'react';

const TopPanel = ({ summaryData, metadata }) => {
  // Convert valid_date to a Date object
  const dateObject = new Date(summaryData.valid_date);

  // Get the day of the week
  const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
  return (
    <div className="top-panel">
      <div>Date: {summaryData.valid_date} ({dayOfWeek})</div>
      <div>Avg Temp: {summaryData.temp}°C</div>
      <div>Latitude: {metadata.lat}</div>
      <div>Longitude: {metadata.lon}</div>
      <div>Timezone: {metadata.timezone}</div>
      <div>City: {metadata.city_name}</div>
      <div>Country: {metadata.country_code}</div>
      <div>State: {metadata.state_code}</div>
      <div>Sunrise: {new Date(summaryData.sunrise_ts * 1000).toLocaleTimeString()}</div>
      <div>Sunset: {new Date(summaryData.sunset_ts * 1000).toLocaleTimeString()}</div>
      <div>Weather: {summaryData.weather.description} <img src={`https://www.weatherbit.io/static/img/icons/${summaryData.weather.icon}.png`} alt="Weather Icon" /></div>
    </div>
  );
};

export default TopPanel;