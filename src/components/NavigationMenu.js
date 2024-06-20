import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/NavigationMenu.css';
import { UserContext } from '../UserContext';

const NavigationMenu = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="navigation-menu">
            <ul>
                <li>
                    <NavLink to="/home" activeClassName="active-link">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create-transaction" activeClassName="active-link">
                        Create Transaction
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/transactions" activeClassName="active-link">
                        Transaction List
                    </NavLink>
                </li>
            </ul>
            <div className="logout" onClick={handleLogout}>
                Logout
            </div>
        </div>
    );
};

export default NavigationMenu;
