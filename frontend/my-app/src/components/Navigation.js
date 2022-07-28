import React from 'react';
import { NavLink } from "react-router-dom"

const Navigation = () => {


    const clearStorage = () => localStorage.clear()

    return (
        <div className='navigation'>
            <ul>
                <NavLink to="/" onClick={clearStorage}>
                    <li> Signup et loggin </li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;