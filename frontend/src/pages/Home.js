import React, { useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { AccountBox, AccountBalance, ElectricBolt, Computer, Payment, Star } from '@mui/icons-material';
import Login from './Login';

const Home = () => {
  const services = [
    { name: 'Aadhar Login', icon: AccountBox },
    { name: 'Revenue', icon: AccountBalance },
    { name: 'Online EB Payment', icon: ElectricBolt },
    { name: 'Digital Sewa', icon: Computer },
    { name: 'DigiPay', icon: Payment },
    { name: 'StarEC', icon: Star }
  ];

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);

  return (
    <Container id="home-container" maxWidth="xl" sx={{ height: '100vh', overflow: 'hidden', p: 0, m: 0, maxWidth: '100%' }}>
      <Box id="home-layout" sx={{ display: 'flex', gap: 3, height: '100%', overflow: 'hidden' }}>
        {/* Main Content - 75% */}
        <Box id="main-content-area" sx={{ width: '75%', overflow: 'hidden', p: 2 }}>

          
          <Grid id="services-grid" container spacing={3} sx={{ mt: 3 }}>
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Grid item xs={12} md={4} key={index} id={`service-item-${index}`}>
                  <Card 
                    id={`service-card-${index}`}
                    onClick={() => {
                      if (service.name === 'Aadhar Login') {
                        window.open('https://myaadhaar.uidai.gov.in/', '_blank');
                      } else if (service.name === 'Revenue') {
                        window.open('https://eservices.tn.gov.in/eservicesnew/home.html', '_blank');
                      } else if (service.name === 'Digital Sewa') {
                        window.open('https://digitalseva.csc.gov.in/dashboard', '_blank');
                      } else if (service.name === 'DigiPay') {
                        window.open('https://agent.paycsc.in/', '_blank');
                      } else if (service.name === 'Online EB Payment') {
                        window.open('https://www.tnebnet.org/awp/login', '_blank');
                      } else if (service.name === 'StarEC') {
                        window.open('https://www.mystarec.com/#', '_blank');
                      }
                    }}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        backgroundColor: '#e3f2fd'
                      }
                    }}
                  >
                    <CardContent id={`service-content-${index}`} sx={{ textAlign: 'center', py: 1.5 }}>
                      {service.name === 'StarEC' ? (
                        <img src="/Images/StarEC.jpg" alt="StarEC" style={{ width: '36px', height: '36px', marginBottom: '8px' }} />
                      ) : service.name === 'DigiPay' ? (
                        <img src="/Images/digipay.png" alt="DigiPay" style={{ width: '36px', height: '36px', marginBottom: '8px' }} />
                      ) : service.name === 'Aadhar Login' ? (
                        <img src="/Images/aadhar.png" alt="Aadhar Login" style={{ width: '56px', height: '36px', marginBottom: '8px' }} />
                      ) : service.name === 'Revenue' ? (
                        <img src="/Images/TamilNadu_Logo.png" alt="Revenue" style={{ width: '36px', height: '36px', marginBottom: '8px' }} />
                      ) : service.name === 'Online EB Payment' ? (
                        <img src="/Images/TNEB.png" alt="Online EB Payment" style={{ width: '36px', height: '36px', marginBottom: '8px' }} />
                      ) : service.name === 'Digital Sewa' ? (
                        <img src="/Images/CSC_Logo.png" alt="Digital Sewa" style={{ width: '36px', height: '36px', marginBottom: '8px' }} />
                      ) : (
                        <IconComponent sx={{ fontSize: 36, color: '#12a4d9', mb: 1 }} />
                      )}
                      <Typography variant="h6" id={`service-title-${index}`}>{service.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          

        </Box>
        
        {/* Login Section - 25% */}
        <Box id="login-section" sx={{ width: '25%', height: '100%', overflow: 'hidden', p: 2 }}>
          <Login />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;