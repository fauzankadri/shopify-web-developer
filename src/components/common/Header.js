/*
* Simple header component to display app title
*/

import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
        <h1 className="Header-title">My Github Favorites</h1>
    </div>
  );
}

export default Header;