import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
    <header className="header">
        <div className="header__wrapper">
            <div className="header__brand">
                <h1 className="header__title"><Link to='/'>MARVEL UNIVERSE portal</Link></h1>
            </div>
            <nav className="header__nav">
                <ul className='header__nav-link-container'>
                    <li className="header__link"><Link to='/'>Characters </Link></li>
                    <span className='header__link'>|</span>
                    <li className="header__link"><Link to='/comics'>Comics</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    );
};

export default Header;
