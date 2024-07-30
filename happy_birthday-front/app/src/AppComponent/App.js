import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login.js';
import Home from './Home'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path="/login" Component={Login} />
            </Routes>
        </Router>
    );
};

export default App;