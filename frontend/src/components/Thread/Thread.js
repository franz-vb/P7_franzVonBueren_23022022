/* LIBRAIRIES */ 
import React, { useState } from 'react'

/* COMPONENTS */
import Comments from '../Comments/Comments';

/* CSS */
import './Thread.css'

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';

function Thread(props) {

    const [commentPost, setCommentPost] = useState([]);
    const [disableClick, setDisableClick] = useState(true);

    /* Cette fonction va push dans le tableau commentPost l'id du post surlequel on a clické. Si l'Id se trouve déjà dans le tableau alors on l'efface */ 
    /* CAR ensuite côté front, on va checker si l'ID du post EST dans ce tableau. Si il l'est, cela signifie qu'il faut afficher les commentaires */ 
    function handleClickComments(postId) {

        let newArray = [...commentPost];
        if (newArray.includes(postId)) {
            let index = newArray.indexOf(postId);
            newArray[index] = '';
        
        } else {
            newArray.push(postId);
        }
        setCommentPost(newArray);
    }

    /* Ce function est appelée à chaque création de post (dans le .map se trouvant dans le jsx) */ 
    /* Elle va vérifier si le postId est présent dans le tableau (reçu en props) qui contient tous les postId que l'utilisateur à liké */ 
    /* Si il y a match alors la fonction return TRUE sinon elle retourne FALSE */ 
    function checkIfLikedPost(postId) {

        if (props.postsLiked.data) {

            for (let i = 0; i < props.postsLiked.data.length; i++) {
                if (postId == props.postsLiked.data[i].postId) {
                    return true;
                } 
            }
        }
        return false;
    }

    const userId = JSON.parse(localStorage.getItem('user'));

    /* Cette action trie le tableau des posts des plus récents au moins récents */ 
    props.posts && props.posts.sort(function compare(a, b) {
        if (a.ID > b.ID)
            return -1;
        if (a.ID < b.ID )
            return 1;
        return 0;
    });    

    async function handleClickLike(likes, postId, uuid) {

        console.log(uuid)

        if (disableClick) {

            setDisableClick(false);

            /* La fonction vérifie si postId est présent ou non dans le tableau qui contient tous les postId likés par l'user */ 
            if (checkIfLikedPost(postId)) {
                const response = await fetch('http://localhost:3000/api/posts/deleteLike', {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }),
                    body: JSON.stringify({
                        likes: likes,
                        postId: postId,
                        uuid: uuid
                    })
                })
        
                if (response.ok) {
                    setDisableClick(true);
                    props.setIsUpdated(!props.isUpdated);
                } else {
                    setDisableClick(true);
                }
            } else {
                const response = await fetch('http://localhost:3000/api/posts/addLike', {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }),
                    body: JSON.stringify({
                        likes: likes,
                        postId: postId,
                        uuid: uuid
                    })
                })
        
                /* disableClick permet d'éviter de pouvoir clicker plusieurs fois de suite et provoquer plusieurs call API afin d'éviter les bugs incrémentations */ 
                if (response.ok) {
                    setDisableClick(true);
                    props.setIsUpdated(!props.isUpdated);
                } else {
                    setDisableClick(true);
                }
            }     
        }   
    }

    function hancleClickDelete(postId, userId) {

        fetch('http://localhost:3000/api/posts/deletePost', {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }),
            body: JSON.stringify({
                postId: postId,
                status: 1,
                userId: userId
            })
        })
        .then(res => res.json())
        .then(data => props.setIsUpdated(!props.isUpdated))
        .catch(err => console.log(err))
    }
    
    return (
        <div className='container'>
            { props.posts && props.posts.map((post, index) => {

                return (
                    <div key={index} className='containerThread'>
                        <div className='headerThread'>
                            <MdAccountCircle className='iconCenter'/>
                            <div className='containerPseudo'>
                                <div className='pseudoThread'>{post.pseudo}</div>
                                <div style={{fontSize: "0.7rem"}}>{post.date}</div>
                            </div>
                            {
                                (userId[0] == post.idUser || userId[0] === 64 ) &&
                                <span className='deletePost' onClick={() => hancleClickDelete(post.ID, post.idUser)}>X</span>
                            }
                        </div>
                        <p className='threadMessage'>{post.message}</p>
                            {/* Ici on injecte l'image du poste en passant par l'url qui donne acces au dossier "images" de notre back */ }
                        {post.image && <img className='postImage' src={`http://localhost:3000/images/${post.image}`} alt='postImage'/> }

                        <div className='containerLikesComments'>
                            <div className='headerLikesComments'>
                                {/* Ici on utilise la fonction pour vérifier si l'utilisateur à déjà liké ou non le post */ 
                                /* Si il a liké alors la fonction retourne TRUE et donc le HTML va afficher la zone like en Orange. Sinon en noir */ 
                                    checkIfLikedPost(post.ID) ? 
                                    <div className='jaimeThread' style={{color: 'orangered'}} onClick={() => handleClickLike(post.likes, post.ID, userId[0])}>{post.likes} <AiOutlineLike style={{color: "orangered"}} /> J'aime</div>
                                    :
                                    <div className='jaimeThread' onClick={() => handleClickLike(post.likes, post.ID, userId[0])}>{post.likes} <AiOutlineLike /> J'aime</div>
                                }
                                <div className='commentairesThread' onClick={() => handleClickComments(post.ID)}> {post.comments} Commentaires</div>
                            </div>
                            {/* On vérifie ici si le post.ID est inclu dans le tableau commentPost. Si oui alors il affiche le composant Comments, si non il affiche rien */
                                commentPost.includes(post.ID) &&
                                    <Comments commentsUpdated={props.commentsUpdated} setCommentsUpdated={props.setCommentsUpdated} postId={post.ID} nbrComments={post.comments} isUpdated={props.isUpdated} setIsUpdated={props.setIsUpdated}/>
                            }
                        </div>
                    </div>
                )
            })   
            }
        </div>
        
    )
}

export default Thread