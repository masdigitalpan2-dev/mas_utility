import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid } from '@mui/material';

const Calculator = () => {
  const [values, setValues] = useState({
    hect1: 0, are1: 0, hect2: 0, are2: 0,
    hect3: 0, are3: 0, hect4: 0, are4: 0
  });
  const [result, setResult] = useState({ hectares: 0, acres: 0 });

  const handleCalculate = () => {
    const totalHec = values.hect1 + values.hect2 + values.hect3 + values.hect4;
    const totalAre = values.are1 + values.are2 + values.are3 + values.are4;
    const totalInAcres = (totalHec * 2.471) + (totalAre * 2.471 / 100);
    
    setResult({
      hectares: totalHec + totalAre,
      acres: totalInAcres.toFixed(3)
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Area Calculator</Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map(num => (
            <Grid item xs={6} key={num}>
              <TextField
                label={`Hectare ${num}`}
                type="number"
                value={values[`hect${num}`]}
                onChange={(e) => setValues({...values, [`hect${num}`]: +e.target.value})}
                fullWidth
                margin="normal"
              />
              <TextField
                label={`Are ${num}`}
                type="number"
                value={values[`are${num}`]}
                onChange={(e) => setValues({...values, [`are${num}`]: +e.target.value})}
                fullWidth
                margin="normal"
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" onClick={handleCalculate} sx={{ mt: 2 }}>
          Calculate
        </Button>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: {result.hectares} Hectares = {result.acres} Acres
        </Typography>
      </Paper>
    </Container>
  );
};

export default Calculator;