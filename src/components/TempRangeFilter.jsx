import React from 'react';
const TempRangeFilter = ({ onMinTempChange, onMaxTempChange, onOptionChange }) => {
    return (
        <div className="temperature-range-filter">
            <label>
                Options:
                <select onChange={(e) => onOptionChange(e.target.value)}>
                    {/* <option value="hottestTime">Hottest Time of the Day</option>
                    <option value="coldestTime">Coldest Time of the Day</option> */}
                    <option value="allDays">Show All Days</option>
                    <option value="showHottestDay">Show Hottest Day</option>
                    <option value="showColdestDay">Show Coldest Day</option>
                </select>
            </label>
            
        </div>
    );
};

export default TempRangeFilter;