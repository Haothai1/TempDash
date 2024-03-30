// ForecastTable.jsx
import React from 'react';

const ForecastTable = ({ forecast, metadata }) => { // Accept metadata as a prop
  
  return (
    <table className="forecast-table">
      
      <thead>
        <tr>
          <th>Day</th>
          <th>Date</th>
          <th>Average Temp (°C)</th>
          <th>Timezone</th>
          <th>City</th>
          <th>Country</th>
          <th>State</th>
          <th>Snowfall (mm)</th>
          <th>Snow Depth (mm)</th>
          <th>Humidity (%)</th>
          <th>Sunrise</th>
          <th>Sunset</th>
          <th>Weather</th>
        </tr>
      </thead>
      <tbody>
        {forecast.map((day, index) => {
          // Convert valid_date to a Date object
          const dateObject = new Date(day.valid_date);

          // Get the day of the week
          const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' });

          return (
            <tr key={index}>
              <td>{dayOfWeek}</td>
              <td>{day.valid_date}</td>
              <td>{day.temp}</td>
              <td>{metadata.timezone}</td>
              <td>{metadata.city_name}</td>
              <td>{metadata.country_code}</td>
              <td>{metadata.state_code}</td>
              <td>{day.snow}</td>
              <td>{day.snow_depth}</td>
              <td>{day.rh}</td>
              <td>{new Date(day.sunrise_ts * 1000).toLocaleTimeString()}</td>
              <td>{new Date(day.sunset_ts * 1000).toLocaleTimeString()}</td>
              <td>{day.weather.description} <img src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt="Weather Icon" /></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ForecastTable;
