/* LIBRAIRIES */ 
import React, {useState} from 'react'

/* COMPONENTS */
import Post from '../Post/Post';
import Thread from '../Thread/Thread';

/*CSS*/
import './Forum.css'

function Forum() {

    const [posts, setPosts] = useState([]);//tab/publication. récupère les infos de Post pour les envoyer à thread

    return (
        <div className='containerForum'>
            
            <Post posts={posts} setPosts={setPosts}/>
            <Thread posts={posts}/>

        </div> 
    )    
}

export default Forum