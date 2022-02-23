/*Librairies*/
import React, {useState} from 'react'

/*Components*/
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'
import Inscription from '../../components/Inscription/Inscription'

/*CSS*/
import './Home.css'


const Home = () => {

const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
       <Header /> 
       <Login setIsModalOpen={setIsModalOpen} />
        {/*si isModalOpen is true alors envoi Inscription*/ }
        { isModalOpen &&
           <Inscription setIsModalOpen={setIsModalOpen}/>
        }
    </div>
  )
}

export default Home