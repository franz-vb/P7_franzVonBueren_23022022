/* LIBRAIRIES */ 
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* PAGES */ 
import Home from './pages/Home/Home';
import Accueil from './pages/Accueil/Accueil';

/* CSS */ 
import './App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/accueil' element={<Accueil />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;