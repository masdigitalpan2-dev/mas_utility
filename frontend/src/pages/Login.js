import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Divider, InputAdornment } from '@mui/material';
import { Login as LoginIcon, Person, Lock } from '@mui/icons-material';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      alert('Please enter username and password');
      return;
    }
    // Add login logic here
    console.log('Login attempt:', credentials);
    window.open('/daysales?user=admin', '_blank');
  };

  const handleGuestLogin = () => {
    window.open('/daysales?user=guest', '_blank');
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: 'fit-content', maxHeight: '100%', overflow: 'hidden', background: 'linear-gradient(135deg, #f39ff5ff 0%, #6e91efff 100%)' }}>
      <CardContent sx={{ p: 2, overflow: 'hidden' }}>
        <Box id="login-header" sx={{ textAlign: 'center', mb: 2 }}>
          <LoginIcon sx={{ fontSize: 36, color: '#8B5CF6', mb: 1 }} />
          <Typography variant="h5" fontWeight={700} sx={{ color: '#1F2937' }}>
            MAS Login
          </Typography>
        </Box>
        
        <Box id="login-form" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <TextField
            label="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.83)'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: '#4F46E5', filter: 'brightness(1.3)' }} />
                </InputAdornment>
              ),
              sx: { pl: 2 }
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.83)'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#4F46E5', filter: 'brightness(1.3)' }} />
                </InputAdornment>
              ),
              sx: { pl: 2 }
            }}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            fullWidth
            sx={{ 
              mt: 1,
              bgcolor: '#8B5CF6',
              '&:hover': { bgcolor: '#7C3AED' }
            }}
          >
            Login
          </Button>
          
          <Divider sx={{ my: 2 }}>
            <Typography id="divider-text" variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Button
            variant="contained"
            onClick={handleGuestLogin}
            fullWidth
            startIcon={<Person />}
            sx={{ 
              bgcolor: '#A855F7',
              color: 'white',
              '&:hover': { 
                bgcolor: '#9333EA'
              }
            }}
          >
            Continue as Guest
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;