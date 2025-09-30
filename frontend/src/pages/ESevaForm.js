import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, MenuItem } from '@mui/material';

const ESevaForm = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    fatherName: '',
    address: '',
    certificateType: '',
    purpose: ''
  });

  const certificateTypes = [
    'Community Certificate',
    'Income Certificate', 
    'Native Certificate',
    'Widow Certificate',
    'Legal Heir Certificate'
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>E-Seva Certificate Application</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Applicant Name"
              value={formData.applicantName}
              onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Father/Husband Name"
              value={formData.fatherName}
              onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Certificate Type"
              value={formData.certificateType}
              onChange={(e) => setFormData({...formData, certificateType: e.target.value})}
              fullWidth
              required
            >
              {certificateTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
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
        <Button variant="contained" sx={{ mt: 2 }}>Submit Application</Button>
      </Paper>
    </Container>
  );
};

export default ESevaForm;