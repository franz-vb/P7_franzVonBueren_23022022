import React from 'react'
import './Header.css'
import Logo from '../../Images/icon.png'

const Header = () => {
  return (
    <div className='container_header'>
        <img className='logo_header' src={Logo}/>
        <h1 className='title_header'>Groupomania</h1>
        <h2 className='under_title_header'>Avec Groupomania, partagez et restez en contact avec vos collègues.</h2>
    </div>
  )
}

export default Header