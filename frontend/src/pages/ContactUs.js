import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import appConfig from '../config/appConfig';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 2 }}>
      <Container maxWidth="lg">


        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                  Get in Touch
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, mr: 2 }}>
                      <Phone sx={{ color: '#12a4d9', mr: 2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Phone</Typography>
                        <Typography variant="body1" color="text.secondary">
                          {appConfig.header.mobile}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <Email sx={{ color: '#12a4d9', mr: 2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email</Typography>
                        <Typography variant="body1" color="text.secondary">
                          {appConfig.header.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <LocationOn sx={{ color: '#12a4d9', mr: 2, fontSize: 24, mt: 0.5 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Address</Typography>
                      <Typography variant="body1" color="text.secondary">
                        {appConfig.header.address}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ 
                  p: 3, 
                  bgcolor: '#f8f9fa', 
                  borderRadius: 2,
                  border: '1px solid #e9ecef'
                }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                    Business Hours
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>{appConfig.businessHours.weekdays}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>{appConfig.businessHours.saturday}</strong>
                  </Typography>
                  <Typography variant="body2">
                    <strong>{appConfig.businessHours.sunday}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                  Send us a Message
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                    
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                    
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Send />}
                        fullWidth
                        sx={{
                          bgcolor: '#12a4d9',
                          '&:hover': { bgcolor: '#0e8bb8' },
                          py: 1,
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;