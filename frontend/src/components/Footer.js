import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #063547 0%, #0a4a5c 100%)',
      color: 'white',
      py: 2,
      boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 MAS Digital Service. All rights reserved. | Powered by React & .NET
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;