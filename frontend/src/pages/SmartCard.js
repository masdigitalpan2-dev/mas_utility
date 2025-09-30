import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';

const SmartCard = () => {
  const [formData, setFormData] = useState({
    familyHead: '',
    husbandName: '',
    doorNo: '',
    address: '',
    pincode: '',
    cardNumber: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:5001/api/smartcard', formData);
      alert('Smart card data saved successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Smart Card Application</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Family Head Name"
                value={formData.familyHead}
                onChange={(e) => setFormData({...formData, familyHead: e.target.value})}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Husband/Father Name"
                value={formData.husbandName}
                onChange={(e) => setFormData({...formData, husbandName: e.target.value})}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Door Number"
                value={formData.doorNo}
                onChange={(e) => setFormData({...formData, doorNo: e.target.value})}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Card Number"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                fullWidth
                multiline
                rows={3}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit Application
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SmartCard;