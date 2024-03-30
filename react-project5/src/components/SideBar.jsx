/* SideBar.jsx */
import React from 'react';

const Sidebar = ({ onSectionChange }) => {
  return (
    <div className="sidebar">
    <h1>TempDash</h1>
      <button onClick={() => onSectionChange('dashboard')}>Dashboard</button>
      <button onClick={() => onSectionChange('search')}>Search</button>
      <button onClick={() => onSectionChange('about')}>About</button>
    </div>
  );
};

export default Sidebar;