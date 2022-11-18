import React from 'react';
import logo from '../../assets/img/logo.png';
import Toggle from 'react-toggle';  
import '../../assets/css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={logo} id="logo" alt="logo" />
            </div>
            <div className="navbar__buttons">
                <button className="saved_locations_button">Saved Locations</button>
                <div className="navbar__toggle">
                    <label>
                    <span>°C </span>
                    <Toggle
                        defaultChecked={false}
                        icons={false} />
                    <span> °F</span>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
