/* LIBRAIRIES */ 
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

/* CSS */
import './Inscription.css'

function Inscription(props) {

    let navigate = useNavigate();

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmation, setErrorConfirmation ] = useState('')


    function handleSubmit(e) {
        e.preventDefault();
        setPseudo('');
        setEmail('');
        setPassword('');
        setConfirmation('');
        const regexEmail = /^([a-z0-9.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        const regexPassword = /^[^\s][a-zA-ZÀ-ÖØ-öø-ÿ\s-]+[^\s]$/;

        if (!regexEmail.test(email)) {
            setErrorEmail("L'email n'est pas valide");
            } else {
                console.log('test1');
                setErrorEmail('');
                if (!regexPassword.test(password)) {
                    setErrorPassword("Le mot de passe n'est pas valide");
                } else {
                    if (password === confirmation) {

                        let credentials = {
                            pseudo, email, password
                        } 
            
                        fetch("http://localhost:3000/api/users/createUser", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*', 
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(credentials),
                        })
                        .then(response => response.json())
                        .then(data => {
                            localStorage.setItem("token", data.token);
                            navigate('/accueil');
                        })
                        .catch(error =>console.log(error))
            
                    } else {
                        setErrorConfirmation("password and confirmation are different")
                    } 
            
                }
            }
              
    }

  return (
    <div className='container_modal'>
       <form className='form_inscription' onSubmit={handleSubmit}>
            <div className='container_form'>
                <div className='header_inscritpion'>
                    <h1>S'inscrire</h1>
                    <h2>C'est rapide et facile</h2>
                    <div className='exit' onClick={() => props.setIsModalOpen(false)}>X</div>
                </div>
                <div className='container_inputs'>
                    <input className='pseudo_inscription' placeholder='Pseudo' type="text" onChange={(e) => setPseudo(e.target.value)}/>
                </div>
                
                <input className='email_inscription' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                {
                    errorEmail && <div style={{color: 'red'}}>{errorEmail}</div>
                }
                <div className='container_inputs'>
                    <input className='input_inscription' placeholder='Mot de passe' type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <input className='input_inscription' placeholder='Confirmation' type="password" onChange={(e) => setConfirmation(e.target.value)}/>
                </div>
                {
                    errorPassword && <div style={{color: 'red'}}>{errorPassword}</div>
                }
                {
                    errorConfirmation && <div style={{color: 'red'}}>{errorConfirmation}</div>
                }
                <button className='btn_inscription'>S'INSCRIRE</button>
                
            </div>
       </form>
    </div>

  )
}

export default Inscription