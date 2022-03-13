/* LIBRAIRIES */
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

/* CSS */ 
import './Login.css'

const Login = (props) => {

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        if (email !== "" && password !== "") {
            
            fetch("http://localhost:3000/api/users/login", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*', 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                })
                .then(response => response.json())
                .then(data => {

                    if (data.success === 1) {
                        localStorage.setItem('token', data.token);
                        navigate('/accueil');   
                    }
                })
                .catch(error =>console.log(error))
        }
    }

    return (
        <div className='login'>
            <div className='container_login'>
                <form className='form_login' onSubmit={handleSubmit}>
                    <input className='input_login' type='text' placeholder='Adresse mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className='input_login' type='text' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className='button_login'>SE CONNECTER</button>
                    <div className='password_login'>Mot de passe oublié?</div>
                    <div className='create_login' onClick={() => props.setIsModalOpen(true)}>Créer un compte</div>
                </form>
            </div>
        </div>
        
    )
}

export default Login