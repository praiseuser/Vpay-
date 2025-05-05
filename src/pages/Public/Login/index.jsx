import { Box, Typography } from '@mui/material';
import React from 'react';
import { Email, Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { styles } from './styles';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <Box sx={styles.container}>
            <Box sx={styles.circleTopLeft} />
            <Box sx={styles.circleBottomRight} />

            <Box sx={styles.loginBox}>
                <img src="../image 5.png" alt="logo" style={styles.logo} />

                <Typography sx={styles.title}>
                    Enter your personal details
                </Typography>
                <Typography sx={styles.subtitle}>
                    We’re almost there, just input these final details.
                </Typography>

                <Box sx={styles.inputContainer}>
                    <Box sx={styles.inputField}>
                        <Email sx={styles.inputIcon} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </Box>
                    <Box sx={styles.inputField}>
                        <Person sx={styles.usernameIcon} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </Box>
                    <Box sx={styles.passwordField}>
                        <Box sx={styles.passwordInputWrapper}>
                            <Lock sx={styles.inputIcon} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                            />
                        </Box>
                        <Box
                            sx={styles.visibilityToggle}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <VisibilityOff sx={styles.visibilityIcon} />
                            ) : (
                                <Visibility sx={styles.visibilityIcon} />
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.signupButton}>
                    <Typography sx={styles.signupText}>
                        Sign Up
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;