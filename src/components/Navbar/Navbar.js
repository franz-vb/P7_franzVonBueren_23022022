/* LIBRAIRIES */ 
import React from 'react';
import { Link } from 'react-router-dom';

/* IMAGES */
import Logo from '../../Images/icon.png';

/* ICONS */ 
import { AiFillHome } from 'react-icons/ai';
import { AiFillMessage } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiTwotoneBell } from 'react-icons/ai';

/* CSS */ 
import './Navbar.css';

const Navbar = () => {

    return (
        <div className='containerNavbar'>
            <div className='navbarResearch'>
                <Link to='/'><img className='navbarLogo' src={Logo} alt="" /></Link>
                <input className='navbarInput' type="text" placeholder="Rechercher quelqu'un" />
            </div>
            <div className='containerIcon'>
                <AiFillHome className='icon'/>
            </div>
            <div className='navbarSettings'>
                <div className='containerIconSettings'>
                    <AiFillMessage className='iconSettings'/>
                </div>
                <div className='containerIconSettings'>
                    <AiTwotoneBell className='iconSettings'/>
                </div>
                <div className='containerIconSettings'>
                    <AiFillCaretDown className='iconSettings'/>
                </div>               
            </div>

        </div>
    )
}

export default Navbar;