import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

function MyTeam({onLogOut}) {
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const handleLogOut = (e) => {
        e.preventDefault();
        console.log('handleLogOut called');
        ['teamid', 'username', 'token'].forEach(item => localStorage.removeItem(item));
        console.log('local storage deleted');
        onLogOut();
        navigate('/');
        
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const teamId = localStorage.getItem('teamid');
            if (!token || !teamId) {
                navigate('/');
                return;
            }
            const savedTeamData = localStorage.getItem('teamData');
            if (savedTeamData) {
                setTeamData(JSON.parse(savedTeamData));
                setLoading(false)
            } else {
                
                try {
                    const response = await fetch(`${apiUrl}/get-user-team`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({username: localStorage.getItem('username'), teamId})
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Fetched data:', data);
                        setTeamData(data.fplData);
                        localStorage.setItem('teamData', JSON.stringify(data.fplData));
                    } else {
                        setError('Failed to fetch data from server');
                    }
                } catch (error) {
                    setError('Error fetching data from server');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [navigate, apiUrl]);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div>
            <Button variant='contained' onClick={handleLogOut}>LOG OUT</Button>
            <div className='centered-container'>
                {
                    teamData
                        ? (<pre>{JSON.stringify(teamData, null, 2)}</pre>)
                        : (<p>No team data available</p>)
                }
            </div>
        </div>
    );
}

export default MyTeam;
