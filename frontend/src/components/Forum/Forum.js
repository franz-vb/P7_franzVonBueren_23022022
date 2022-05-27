/* LIBRAIRIES */ 
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

/* COMPONENTS */
import Post from '../Post/Post';
import Thread from '../Thread/Thread';

/*CSS*/
import './Forum.css'

function Forum(props) {

    const userId = JSON.parse(localStorage.getItem('user'));

    const [posts, setPosts] = useState([]);
    const [datas, setDatas] = useState([]);
    const [postsLiked, setPostsLiked] = useState([]);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/users', {
            method: 'GET', 
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })           
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === 0) {
                localStorage.removeItem('token');
                <Navigate to="/accueil" />
            } else {
                setUsers(data)
            }
        })
        .catch(err => setError(err))
    }, [props.membersUpdated])

    /* HOOK qui éxécute du code en fonction du cycle de vie du composant */ 
    /* Ce useEffect éxécute le code QUAND le composant forum est monté MAIS AUSSI quand la valeur du state isUpdated est modifié */ 
    /* Le useEffect à une dépendance qui est un tableau vide (pour quand l'élément est monté). Si on met quelque chose dans ce tableau,
        cela signifie que le state va contrôler si l'élément mit dans le tableau a changé ou non. Si il a changé, il rééxute le code. */

    useEffect(() => {

        /* Ce premier fetch récupère la liste de tous les posts qui ont été likés par l'utilisateur en cours */ 
        /* Ce tableau est stocjé dans setPostsLiked() */ 
        /* J'envoie dans le body le userId */
        fetch('http://localhost:3000/api/posts/getLikes', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    userId: userId[0]
                })
            })
            .then(res => res.json())
            .then(data =>  setPostsLiked(data))
            .catch(err => console.log(err))

        fetch('http://localhost:3000/api/posts', {
            method: 'GET', 
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })           
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === 0) {
                localStorage.removeItem('token');
                <Navigate to="/accueil" />
            } else {
                setDatas(data.data)
            }
        })
        .catch(err => setError(err))

    }, [props.isUpdated])  

    function hancleClickDeleteMember(id, pseudo) {
        
        fetch("http://localhost:3000/api/users/deleteUser", {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }),
                body: JSON.stringify({
                    pseudo,
                    userId: id
                })
            })
            .then(res => res.json())
            .then(data => {
                props.setMembersUpdated(!props.membersUpdated);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='containerForum'> 
            <div className='nameUser'>Bonjour <span style={{color: "orangered"}}>{userId[1]}</span></div>
            <div className='containerMembres'>
            <h1 className='titleMembres'>Membres <span style={{color: "orangered"}}>Groupomania</span></h1>
            {
                users.data && users.data.map((user, index) => {

                    return (
                        userId[0] == 64 ?
                        <div className='containerMembre' key={index}>
                            🟢{user.pseudo} {user.id !== 64 && <span className='deleteMembers' onClick={() => hancleClickDeleteMember(user.id, user.pseudo)}> X </span>}
                        </div>
                        :
                        <div className='containerMembre' key={index}>
                            🟢{user.pseudo}
                        </div>
                    )
                })
            }
            </div>
            
            <Post isUpdated={props.isUpdated} setIsUpdated={props.setIsUpdated} posts={posts} setPosts={setPosts} setError={setError}/>
            {
                error !== '' &&
                <div style={{marginTop: "20px", color: "red", fontSize: "1.3rem"}}>{error}</div> 
            }
            { datas && postsLiked && <Thread posts={datas} postsLiked={postsLiked} isUpdated={props.isUpdated} setIsUpdated={props.setIsUpdated} commentsUpdated={props.commentsUpdated} setCommentsUpdated={props.setCommentsUpdated}/> }

        </div> 
    )    
}

export default Forum;