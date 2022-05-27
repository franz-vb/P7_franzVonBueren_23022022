/* LIBRAIRIES */ 
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

/* COMPONENTS */ 
import Settings from '../Settings/Settings';

/* IMAGES */
import Logo from '../../Images/icon.png';

/* ICONS */ 
import { AiFillHome } from 'react-icons/ai';
import { AiFillMessage } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiTwotoneBell } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineTwitter, AiFillFacebook, AiFillLinkedin } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';

/* CSS */ 
import './Navbar.css';

const Navbar = (props) => {

    const [settingMenuIsOpen, setSettingMenuIsOpen] = useState(false);
    const [modalSettingsIsOpen, setModalSettingsIsOpen] = useState(false);

    function handleClickLogout() {
        localStorage.clear();
    }

    function hancleClickModalSettings() {
        setSettingMenuIsOpen(settingMenuIsOpen);
        setModalSettingsIsOpen(!modalSettingsIsOpen);
    }

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
                    <img src='' alt=''/>
                </div>
                <div className='containerIconSettings'>
                    <AiFillMessage className='iconSettings'/>
                </div>
                <div className='containerIconSettings'>
                    <AiTwotoneBell className='iconSettings'/>
                </div>
                <div className='containerIconSettings' onClick={() => setSettingMenuIsOpen(!settingMenuIsOpen)}>
                    <AiFillCaretDown className='iconSettings'/>
                </div>
                <Link to='/'>
                    <div className='containerLogout' onClick={handleClickLogout}>
                        <FiLogOut className='iconLogout'/>
                    </div>
                </Link>
            </div>

            { settingMenuIsOpen &&
                <div className='modalMenuSettings'>
                    <div className='settingsRow' onClick={hancleClickModalSettings}>
                        <FiSettings className='iconLogout'/>
                        <p>Paramètres</p>
                    </div>
                    <Link to='/' className='NZ'>
                        <div className='settingsRow' onClick={handleClickLogout}>
                            <FiLogOut className='iconLogout' />
                            <p>Déconnexion</p>
                        </div>
                    </Link>
                    <div className='settingsRow'>
                        <BiHelpCircle className='iconLogout' />
                        <p>Aide</p>
                    </div>
                    <div className='settingsRS'>
                        <AiOutlineTwitter className='iconRS' />
                        <AiFillFacebook className='iconRS' />
                        <AiFillLinkedin className='iconRS' />
                    </div>
                </div>
            }
            {
                modalSettingsIsOpen &&
                <Settings commentsUpdated={props.commentsUpdated} setCommentsUpdated={props.setCommentsUpdated} membersUpdated={props.membersUpdated} setMembersUpdated={props.setMembersUpdated} modalSettingsIsOpen={modalSettingsIsOpen} setModalSettingsIsOpen={setModalSettingsIsOpen} isUpdated={props.isUpdated} setIsUpdated={props.setIsUpdated}/>
            }

        </div>
    )
}

export default Navbar;