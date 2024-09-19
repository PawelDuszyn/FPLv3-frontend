import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

function Home() {
    useEffect(() => {
        console.log('Home component rendered');
    }, []);
    const navigate = useNavigate();
    const teamId = localStorage.getItem('teamid');

    const handleLogOut = (e) => {
      e.preventDefault();
      console.log('handleLogOut called');
      ['teamid', 'username', 'token'].forEach(item => localStorage.removeItem(item));
      console.log('local storage deleted');
      navigate('/');
  };
  useEffect(() => {
    console.log("Token in useEffect:", localStorage.getItem('token')); // Dodaj ten log
    if (!localStorage.getItem('token')) {
        navigate('/'); 
    }
}, [navigate]);
    return (
        <div>
            <Button variant='contained' onClick={handleLogOut}>LOG OUT</Button>
            <div className='centered-container'>
                {teamId}
            </div>
        </div>
    );
}
export default Home;