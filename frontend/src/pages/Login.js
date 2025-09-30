import React, { useState } from 'react';
import { Box, Card, TextField, Button, Typography, Container } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple authentication - in real app, use proper auth
    const users = {
      'admin': { password: 'admin123', role: 'admin', name: 'Administrator' },
      'user': { password: 'user123', role: 'user', name: 'User' }
    };
    
    const user = users[credentials.username];
    if (user && user.password === credentials.password) {
      onLogin({ ...user, username: credentials.username });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ p: 4, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold">Login</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            sx={{ mb: 3 }}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ py: 1.5, borderRadius: 3 }}
          >
            Login
          </Button>
        </form>
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="caption" display="block">Demo Credentials:</Typography>
          <Typography variant="caption">Admin: admin / admin123</Typography><br/>
          <Typography variant="caption">User: user / user123</Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;