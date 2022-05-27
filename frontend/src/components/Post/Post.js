/* LIBRAIRIES */ 
import React, { useState, useEffect } from 'react'

/* CSS */
import './Post.css'

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';
import { BiImageAdd } from 'react-icons/bi';

//publication
function Post(props) {

    const [addMessage, setAddMessage] = useState('');
    const [uploadImage, setUploadImage] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        addMessage.length < 1 && setUploadImage(false);
    }, [addMessage])
    
    function handleClick() {

        if (addMessage.length < 250) { 

            let user = JSON.parse(localStorage.getItem("user"));
            const formData = new FormData();

            formData.append('postImg', image);
            formData.append('userId', user[0]);
            formData.append('date', new Date().toDateString());
            formData.append('message', addMessage);
            formData.append('pseudo', user[1]);


            fetch('http://localhost:3000/api/posts/createPost', { 
                method: 'POST', 
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    /*'Accept': 'application/json, text/plain, *',
                    'Content-Type': 'multipart/form-data'*/
                }),
                body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success === 1) {
                        props.setIsUpdated(!props.isUpdated);
                        setImage('');
                    }
                })
                .catch(err => console.log(err))

            props.setError('');
            setAddMessage('');

        }
        else {
            props.setError('Votre message doit faire moins de 250 caractères');
        }
    } 

    return (
        <>
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
                    
                {/*si il y un mot, le boutton Poster apparait */}
                {
                    addMessage.length > 0 &&
                    <>
                        <button className='buttonPost' onClick={handleClick}>Poster</button>
                        <BiImageAdd onClick={() => setUploadImage(!uploadImage)} style={{width: "50px", height: "50px", color: "orangered", marginLeft: "10px", cursor: "pointer"}}/>
                    </>
                }  
            </div>
            {   
                uploadImage && addMessage.length > 0 && 
                
                <input  className='inputFile' type="file" name='postImg' onChange={(e) => setImage(e.target.files[0])}/>
            }
        </>
  )
}

export default Post