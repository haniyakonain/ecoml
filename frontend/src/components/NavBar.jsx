import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/navbar.css';
import logo from '/public/logo.jpg'; 

const NavBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/" onClick={closeMenu}>
                    <img src={logo} alt="EcoMl Logo" className="nav-logo" />
                    EcoMl
                </Link>
            </div>
            
            <button 
                className={`menu-icon ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link 
                    to="/"
                    className={currentPath === '/' ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Remedies
                </Link>
                <Link 
                    to="/health"
                    className={currentPath.includes('/health') ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Health
                </Link>
                <Link 
                    to="/blog"
                    className={currentPath === '/blog' ? 'active' : ''}
                    onClick={closeMenu}
                >
                    Blog
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;