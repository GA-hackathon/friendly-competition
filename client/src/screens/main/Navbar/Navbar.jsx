import React, { Fragment } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <>
        <ul className='navbar'>
             <li className='nav-block'><Link to='/' >Home</Link></li>
             <li className='nav-block'><Link to='/' >Available Contest</Link></li>
             <li className='nav-block'><Link to='/' >My Contests</Link></li>
             <ul className='navbar-img'>
                <li className='img'></li>
                <li className='text'>User</li>
             </ul>
        </ul>
        </>
    )
}

export default Navbar;