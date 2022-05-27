/* LIBRAIRIES */
import React, { useState } from 'react';

/* COMPONENTS */ 
import Navbar from '../../components/Navbar/Navbar';
import Forum from '../../components/Forum/Forum';

/* CSS */
import './Accueil.css'; 

const Accueil = () => {

    const [isUpdated, setIsUpdated] = useState(false);
    const [membersUpdated, setMembersUpdated] = useState(false);
    const [commentsUpdated, setCommentsUpdated] = useState(false);

    return (
        <div>
            <Navbar commentsUpdated={commentsUpdated} setCommentsUpdated={setCommentsUpdated} isUpdated={isUpdated} setIsUpdated={setIsUpdated} membersUpdated={membersUpdated} setMembersUpdated={setMembersUpdated}/>
            <Forum commentsUpdated={commentsUpdated} setCommentsUpdated={setCommentsUpdated} isUpdated={isUpdated} setIsUpdated={setIsUpdated} membersUpdated={membersUpdated} setMembersUpdated={setMembersUpdated}/>
        </div>
    )
}

export default Accueil;