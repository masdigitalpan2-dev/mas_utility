import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid } from '@mui/material';

const VoterCard = () => {
  const [voterData, setVoterData] = useState({
    voterName: '',
    fatherName: '',
    address: '',
    epicNumber: '',
    assemblyConstituency: '',
    partNumber: '',
    serialNumber: ''
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Voter Card Print</Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Voter Name"
              value={voterData.voterName}
              onChange={(e) => setVoterData({...voterData, voterName: e.target.value})}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Father's Name"
              value={voterData.fatherName}
              onChange={(e) => setVoterData({...voterData, fatherName: e.target.value})}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="EPIC Number"
              value={voterData.epicNumber}
              onChange={(e) => setVoterData({...voterData, epicNumber: e.target.value})}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Assembly Constituency"
              value={voterData.assemblyConstituency}
              onChange={(e) => setVoterData({...voterData, assemblyConstituency: e.target.value})}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={voterData.address}
              onChange={(e) => setVoterData({...voterData, address: e.target.value})}
              fullWidth
              multiline
              rows={3}
              required
            />
          </Grid>
        </Grid>

        <Button variant="contained" onClick={handlePrint} sx={{ mt: 2 }}>
          Print Voter Card
        </Button>

        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}>
          <Typography variant="h6" gutterBottom>Voter Card Preview</Typography>
          <Typography><strong>Name:</strong> {voterData.voterName}</Typography>
          <Typography><strong>Father's Name:</strong> {voterData.fatherName}</Typography>
          <Typography><strong>EPIC No:</strong> {voterData.epicNumber}</Typography>
          <Typography><strong>Address:</strong> {voterData.address}</Typography>
          <Typography><strong>Assembly Constituency:</strong> {voterData.assemblyConstituency}</Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default VoterCard;