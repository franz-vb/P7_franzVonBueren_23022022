import React, {useState} from 'react'
import './Login.css'

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [credential, setCredential] = useState({email: '', password: ''});

    function handleSubmit(e) {
        e.preventDefault();
        setCredential({...credential, email: email, password:password});
    }

  return (
      <div className='login'>
          <div className='container_login'>
            <form className='form_login' onSubmit={handleSubmit}>
                <input className='input_login' type='text' placeholder='Adresse mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className='input_login' type='text' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className='input_login button_login'>SE CONNECTER</button>
                <div className='password_login'>Mot de passe oublié?</div>
                <div className='create_login' onClick={() => props.setIsModalOpen(true)}>Créer un compte</div>
            </form>
         </div>
      </div>
    
  )
}

export default Login