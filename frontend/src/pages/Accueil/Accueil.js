/* LIBRAIRIES */
import React from 'react';

/* COMPONENTS */ 
import Navbar from '../../components/Navbar/Navbar';
import Forum from '../../components/Forum/Forum';

/* CSS */
import './Accueil.css'; 

const Accueil = () => {
    return (
        <div>
            <Navbar />
            <Forum />
        </div>
    )
}

export default Accueil;