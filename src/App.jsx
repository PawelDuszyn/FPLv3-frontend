import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Home from './Home';
import Welcome from './Welcome';
import TeamID from './TeamID';
import MyTeam from './MyTeam';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
        setCheckingAuth(false);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');  
        setIsLoggedIn(!!token);
    }, []);

    if (checkingAuth) {
        return <div className='centered-container'>Loading...</div>;
    }

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogOut = () => {
        ['teamid', 'username', 'token'].forEach(item => localStorage.removeItem(item));
        setIsLoggedIn(false); 
    };

    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={!isLoggedIn
                        ? <Welcome onLogin={handleLogin}/>
                        : <Home onLogOut={handleLogOut}/> 
                    }
                />
                <Route path='/team-id' element={<TeamID/>}/>
                <Route path="/my-team" element={isLoggedIn ? <MyTeam onLogOut={handleLogOut} /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
