import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #063547 0%, #0a4a5c 100%)',
      color: 'white',
      py: 4,
      mt: 'auto',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.15)'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              MAS Digital Service
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Private CSC e-Sewa Center providing government and digital services
              to the community of Koovathur and surrounding areas.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📍 Koovathur, Andimadam (Taluk)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📍 Ariyalur District, Tamil Nadu
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              📞 88 70 92 00 95
            </Typography>
            <Typography variant="body2">
              ✉ masdigitalservices@gmail.com
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Services
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Government Certificates
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Aadhar Services
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Banking Services
            </Typography>
            <Typography variant="body2">
              • Digital Payments
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ 
          borderTop: '1px solid rgba(255,255,255,0.2)', 
          mt: 3, 
          pt: 3, 
          textAlign: 'center' 
        }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 MAS Digital Service. All rights reserved. | Powered by React & .NET
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;