import React from 'react';
import { NavLink } from "react-router-dom"

const Navigation = () => {


    const clearStorage = () => localStorage.clear()

    return (
        <div className='navigation'>
            <ul>
                <NavLink to="/auth" onClick={clearStorage}>
                    <li className='deconnexion'> Déconnexion </li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;