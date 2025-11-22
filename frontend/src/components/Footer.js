import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import appConfig from '../config/appConfig';

const Footer = () => {
  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #063547 0%, #0a4a5c 100%)',
      color: 'white',
      py: 1,
      boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {appConfig.footer.year} MAS Digital Service. All rights reserved. 
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;