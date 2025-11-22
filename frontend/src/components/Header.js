import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import appConfig from '../config/appConfig';

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Contact Bar */}
       {/*
      <Box id="top-contact-bar" sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        py: 0.5
      }}>
       
        <Container id="contact-container" maxWidth="xl">
          <Box id="contact-wrapper" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box id="contact-info" sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography id="email-info" sx={{ 
                color: 'white', 
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                opacity: 0.9
              }}>
                <Email sx={{ fontSize: 16 }} /> {appConfig.header.email}
              </Typography>
              <Typography id="location-info" sx={{ 
                color: 'white', 
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                opacity: 0.9
              }}>
                <LocationOn sx={{ fontSize: 16 }} /> {appConfig.header.address}
              </Typography>
            </Box>
            <Box id="phone-container" sx={{ 
              background: 'white', 
              backdropFilter: 'blur(10px)',
              px: 3, 
              py: 0.8, 
              borderRadius: 25,
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography id="phone-info" sx={{ 
                color: '#12a4d9', 
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Phone sx={{ fontSize: 16 }} /> {appConfig.header.mobile}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      */}
      {/* Hero Section */}
      <Box id="hero-section" sx={{ 
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
        <Container id="hero-container" maxWidth="xl" sx={{ py: 2, position: 'relative', zIndex: 1 }}>
          <Box id="hero-content" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* CSC Logo Section */}
            <Box id="csc-section" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box id="csc-logo-container" sx={{
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
                  id="csc-logo"
                  src="/Images/CSC_Logo.png" 
                  alt="CSC Logo" 
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    objectFit: 'contain'
                  }} 
                />
              </Box>
              <Box id="esewa-logo-container" sx={{
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
                  id="esewa-logo"
                  src="/Images/TNESewaLogo.jpg" 
                  alt="TN E-Sewa Logo" 
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    objectFit: 'contain'
                  }} 
                />
              </Box>
            </Box>
            
            {/* Main Title */}
            <Box id="main-title-section" sx={{ textAlign: 'center', flex: 1, mx: 3, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}>
              <Typography id="main-title-text" sx={{ 
                fontSize: { xs: '28px', md: '36px' },
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 50%, #e8f4fd 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 6px 25px rgba(0,0,0,0.4)',
                lineHeight: 1.1,
                mb: 0.5,
                fontFamily: '"Poppins", "Arial Black", sans-serif',
                letterSpacing: '-0.5px',
                textTransform: 'uppercase'
              }}>
                {appConfig.header.name}
              </Typography>
              <Box id="csc-badge" sx={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: 20,
                px: 2,
                py: 0.5,
                display: 'inline-block',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                <Typography id="csc-badge-text" sx={{ 
                  fontWeight: '600',
                  color: 'white',
                  fontSize: '12px',
                  opacity: 0.95
                }}>
                  CSC & e-Sewa Center
                </Typography>
              </Box>
            </Box>
            
            {/* MAS Logo Section */}
            <Box id="mas-section" sx={{ display: 'flex', alignItems: 'center' }}>
             
             
              <Box id="mas-logo-container" onClick={() => navigate('/contact')} sx={{
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
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
                }
              }}>
                <img 
                  id="mas-logo"
                  src="/Images/MAS Logo Round.jpg" 
                  alt="MAS Logo" 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
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