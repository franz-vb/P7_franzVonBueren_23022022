/* LIBRAIRIES */ 
import React, {useState} from 'react'

/* CSS */
import './Post.css'

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';

//publication
function Post(props) {

    const [addMessage, setAddMessage] = useState('');
    
    function handleClick() {
        props.setPosts([...props.posts, addMessage])/*on récupère le Tab créer dans Forum pour y ajouter un objet/publication*/
    } 

    return (
        <div className='containerCenter'>
            <div className='headerCenter '>
                <div>
                    <MdAccountCircle className='iconCenter'/>
                </div>
                <input className='inputCenter' 
                        placeholder='Ecrivez quelque chose...' 
                        type="text" 
                        value={addMessage} 
                        onChange={(e) => setAddMessage(e.target.value)} />
            </div> 
            {
                addMessage.length > 0 &&
                <button onClick={handleClick}>Poster</button>
            }  
        </div>
  )
}

export default Post