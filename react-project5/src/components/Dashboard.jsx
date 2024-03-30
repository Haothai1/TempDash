// Dashboard.jsx
/* import WeatherList from './WeatherList'; */
import React, { useState } from 'react';
import Header from './Header';
import TopPanel from './TopPanel';
import Sidebar from './SideBar';
import SearchBar from './SearchBar';
import ForecastTable from './ForecastTable';
import TempRangeFilter from './TempRangeFilter';
import '../App.css';

const Dashboard = ({ forecastData, error, onCitySearch }) => {
    const [currentSection, setCurrentSection] = useState('dashboard');
    const [filterOption, setFilterOption] = useState('hottestTime');

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!forecastData || !forecastData.data || forecastData.data.length === 0) {
        return <div>Loading...</div>; // Or any other loading indicator.
    }

    let content;

    switch (currentSection) {
        case 'dashboard':
            content = (
                <>
                    <SearchBar onCitySearch={onCitySearch} />
                    <h2>Current Date</h2>
                    <TempRangeFilter onOptionChange={(value) => setFilterOption(value)} />
                    <TopPanel summaryData={forecastData.data[0]} metadata={forecastData} />
                    <h2>16 Days from Current Date</h2>
                    <ForecastTable forecast={forecastData.data} metadata={forecastData} />
                </>
            );
            break;
        case 'search':
            content = (
                <>
                    <h2>Under Maintenance: Be back Soon!...</h2>
                    <p>Sorry for the inconvience. Please be Patient with Us!</p>
                </>
            );
            break;
        case 'about':
            content = (
                <>
                    <div class="features-container">
                        <h2>About TempDash</h2>
                        <p>TempDash is a comprehensive weather dashboard designed to provide accurate and up-to-date weather forecasts for a span of 16 days. Our goal is to help users plan their activities and stay prepared for various weather conditions.</p>

                        <h3>Features:</h3>
                        <div class="features-list">
                            <ul>
                                <li>Detailed 16-day weather forecast</li>
                                <li>Temperature range filtering for personalized weather insights</li>
                                <li>Options to view the hottest and coldest days within the forecast period</li>
                                <li>Interactive search functionality to explore weather forecasts for different cities around the globe</li>
                                <li>User-friendly interface with a focus on clarity and ease of use</li>
                            </ul>
                        </div>
                        <p>TempDash is a weather dashboard that is developed by Hao.</p>
                    </div>
                </>
            );
            break;
        default:
            content = <div>404 Not Found</div>;
    }
    /* Filtered Data  */
    let filteredData = forecastData.data;

    if (filterOption === 'showHottestDay') {
        const hottestDay = filteredData.reduce((prev, curr) => (curr.max_temp > prev.max_temp ? curr : prev));
        filteredData = [hottestDay];
    } else if (filterOption === 'showColdestDay') {
        const coldestDay = filteredData.reduce((prev, curr) => (curr.min_temp < prev.min_temp ? curr : prev));
        filteredData = [coldestDay];
    }


    return (
        <div className="dashboard-container">
            <Sidebar onSectionChange={setCurrentSection} />
            <div className="main-content">
                <Header />
                {content}
                {currentSection === 'dashboard' && (
                    <>
                        <SearchBar onCitySearch={onCitySearch} />
                        <h2>Current Date</h2>
                        <TempRangeFilter
                            onOptionChange={(value) => setFilterOption(value)}
                        />
                        <TopPanel summaryData={filteredData[0]} metadata={forecastData} />
                        <h2>16 Days from Current Date</h2>
                        <ForecastTable forecast={filteredData} metadata={forecastData} />
                    </>
                )}
            </div>
        </div>
    );

};

export default Dashboard;