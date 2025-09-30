import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const Home = () => {
  const services = [
    'Community Certificate', 'Income Certificate', 'Online EB Payment',
    'Mobile Recharge', 'Mini ATM', 'Document Scanning'
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        MAS Digital Service
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Koovathur, Andimadam (Taluk), Ariyalur (DT)
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;