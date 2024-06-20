import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../services/api';
import { UserContext } from '../UserContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(userId, password);
            const { accessToken, ...userData } = response.data;
            setUser(userData);
            localStorage.setItem('token', accessToken);
            navigate('/home');
            
            console.log('token:', accessToken);
            console.log('userData:', userData);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Card className="container">
            <CardContent>
                <div className="login">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            variant="filled"
                            fullWidth
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            margin="normal"
                        />
                        {/* <TextField
                            label="Password"
                            variant="filled"
                            fullWidth
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                        /> */}
                        <TextField
                            label="Password"
                            variant="filled"
                            fullWidth
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            style={{ marginTop: '20px' }}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginPage;
