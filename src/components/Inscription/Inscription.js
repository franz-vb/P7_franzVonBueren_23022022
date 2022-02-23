import React, { useState } from 'react'
import './Inscription.css'

function Inscription(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [createAccount, setCreateAccount] = useState({})

    function handleSubmit(e) {
        e.preventDefault();
        setCreateAccount({firstName: firstName, lastName: lastName, email: email, password: password, confirmation: confirmation});
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setConfirmation('')
        props.setIsModalOpen(false)
    }
    console.log(createAccount);

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
                    <input className='input_inscription' placeholder='Prénom' type="text" onChange={(e) => setFirstName(e.target.value)}/>
                    <input className='input_inscription' placeholder='Nom' type="text" onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <input className='email_inscription' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <div className='container_inputs'>
                    <input className='input_inscription' placeholder='Mot de passe' type="text" onChange={(e) => setPassword(e.target.value)}/>
                    <input className='input_inscription' placeholder='Confirmation' type="text" onChange={(e) => setConfirmation(e.target.value)}/>
                </div>
                <button className='btn_inscription'>S'INSCRIRE</button>
            </div>
       </form>
    </div>

  )
}

export default Inscription