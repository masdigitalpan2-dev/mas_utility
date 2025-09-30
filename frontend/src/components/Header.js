import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import Navigation from './Navigation';

const Header = () => {
  return (
    <>
      {/* Top Contact Bar */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        py: 0.5
      }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography sx={{ 
                color: 'white', 
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                opacity: 0.9
              }}>
                <Email sx={{ fontSize: 16 }} /> masdigitalservices@gmail.com
              </Typography>
              <Typography sx={{ 
                color: 'white', 
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                opacity: 0.9
              }}>
                <LocationOn sx={{ fontSize: 16 }} /> Koovathur, Andimadam, Ariyalur
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'rgba(255,255,255,0.2)', 
              backdropFilter: 'blur(10px)',
              px: 3, 
              py: 0.8, 
              borderRadius: 25,
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography sx={{ 
                color: 'white', 
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Phone sx={{ fontSize: 16 }} /> 88 70 92 00 95
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }
      }}>
        <Container maxWidth="xl" sx={{ py: 2, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* CSC Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                mr: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
                }
              }}>
                <img 
                  src="/Images/CSC_Logo.png" 
                  alt="CSC Logo" 
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    objectFit: 'contain'
                  }} 
                />
              </Box>
              <Box>
                <Typography sx={{ 
                  fontSize: '14px', 
                  fontWeight: '700',
                  color: 'white',
                  lineHeight: 1.2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  Common Service
                </Typography>
                <Typography sx={{ 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.2,
                  fontWeight: '500'
                }}>
                  Centre
                </Typography>
              </Box>
            </Box>
            
            {/* Main Title */}
            <Box sx={{ textAlign: 'center', flex: 1, mx: 3 }}>
              <Typography sx={{ 
                fontSize: { xs: '24px', md: '32px' },
                fontWeight: '800',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: 1.2,
                mb: 0.5,
                fontFamily: '"Inter", "Roboto", sans-serif'
              }}>
                MAS Digital Service
              </Typography>
              <Box sx={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: 20,
                px: 2,
                py: 0.5,
                display: 'inline-block',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                <Typography sx={{ 
                  fontWeight: '600',
                  color: 'white',
                  fontSize: '12px',
                  opacity: 0.95
                }}>
                  Private CSC e-Sewa Center
                </Typography>
              </Box>
            </Box>
            
            {/* MAS Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Typography sx={{ 
                  fontSize: '14px', 
                  fontWeight: '700',
                  color: 'white',
                  lineHeight: 1.2,
                  textAlign: 'right',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  Digital
                </Typography>
                <Typography sx={{ 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.2,
                  fontWeight: '500',
                  textAlign: 'right'
                }}>
                  Services
                </Typography>
              </Box>
              <Box sx={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                ml: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
                }
              }}>
                <img 
                  src="/Images/MAS_Logo.png" 
                  alt="MAS Logo" 
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    objectFit: 'contain'
                  }} 
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Navigation Menu */}
      <Navigation />
    </>
  );
};

export default Header;