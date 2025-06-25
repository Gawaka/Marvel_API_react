import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
    <header className="header">
        <div className="header__wrapper">
            <div className="header__brand">
                <h1 className="header__title">MARVEL UNIVERSE</h1>
            </div>

            <nav className="header__nav">
                <ul>
                    <li href="#" className="header__link">Characters</li>
                    <li href="#" className="header__link">Comics</li>
                </ul>
            </nav>
        </div>
    </header>
    );
};

export default Header;
