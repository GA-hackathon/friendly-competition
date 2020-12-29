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
             <li className='img'></li>
             <li className='text'>My name</li>
        </ul>
        </>
    )
}

export default Navbar;