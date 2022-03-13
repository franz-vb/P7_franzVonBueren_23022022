/* LIBRAIRIES */ 
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* PAGES */ 
import Home from './pages/Home/Home';
import Accueil from './pages/Accueil/Accueil';

/* COMPONENTS */
import PrivateRouteHome from './components/PrivateRoute/PrivateRouteHome';
import PrivateRouteAccueil from './components/PrivateRoute/PrivateRouteAccueil';

/* CSS */ 
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PrivateRouteHome/>}>
                        <Route exact path='/' element={<Home />}/>   
                    </Route>
                    <Route path="/accueil" element={<PrivateRouteAccueil />}>
                        <Route exact path='/accueil' element={<Accueil />}/>   
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;