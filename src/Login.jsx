import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

function Login({onLogin}) { // Poprawka tutaj: destrukturyzacja props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('handleLogin called');
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setErrorMessage('');
                console.log('Login successful');
                onLogin(); // Wywołanie funkcji przekazanej jako prop
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData);
            }
        } catch (error) {
            setErrorMessage('Error logging in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                <FormControl
                        sx={{
                            m: 1,
                            width: '25ch'
                        }}
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type= 'text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            endAdornment={<InputAdornment position = "end" > 
                        </InputAdornment>}
                            label="Username"
                            required="required"/>
                    </FormControl>
                </div>
                <div>
                    <FormControl
                        sx={{
                            m: 1,
                            width: '25ch'
                        }}
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword
                                ? 'text'
                                : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={<InputAdornment position = "end" > <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {
                                    showPassword
                                        ? <VisibilityOff/>
                                        : <Visibility/>
                                }
                            </IconButton>
                        </InputAdornment>}
                            label="Password"
                            required="required"/>
                    </FormControl>
                </div>
                <Button type="submit" variant="contained">Log In</Button>
            </form>
            {
                errorMessage && <p style={{
                            color: 'red'
                        }}>{errorMessage}</p>
            }
        </div>
    );
}

export default Login;