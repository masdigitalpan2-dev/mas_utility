import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, MenuItem } from '@mui/material';
import QRCode from 'qrcode';

const UPIPayment = () => {
  const [paymentData, setPaymentData] = useState({
    upiId: 'masdigitalservices@oksbi',
    amount: '',
    message: '',
    bankUser: 'SBI Naveen'
  });
  const [qrCode, setQrCode] = useState('');

  const bankOptions = [
    { label: 'Indian Bank (K)', value: 'masdigitalservices-2@okicici' },
    { label: 'India Post', value: 'masdigitalservices-4@okicici' },
    { label: 'City Union', value: 'masdigitalservices-5@oksbi' },
    { label: 'SBI Naveen', value: 'masdigitalservices@oksbi' }
  ];

  const generateQR = async () => {
    const upiLink = `upi://pay?pa=${paymentData.upiId}&pn=MAS Digital Service&tn=${paymentData.message}&am=${paymentData.amount}&cu=INR`;
    const qr = await QRCode.toDataURL(upiLink);
    setQrCode(qr);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>UPI Payment</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Bank User"
              value={paymentData.bankUser}
              onChange={(e) => {
                const selected = bankOptions.find(b => b.label === e.target.value);
                setPaymentData({...paymentData, bankUser: e.target.value, upiId: selected?.value || ''});
              }}
              fullWidth
            >
              {bankOptions.map((bank) => (
                <MenuItem key={bank.label} value={bank.label}>{bank.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Amount"
              type="number"
              value={paymentData.amount}
              onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              value={paymentData.message}
              onChange={(e) => setPaymentData({...paymentData, message: e.target.value})}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={generateQR} sx={{ mt: 2 }}>
          Generate QR Code
        </Button>
        {qrCode && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src={qrCode} alt="UPI QR Code" />
            <Typography variant="body2" sx={{ mt: 1 }}>
              UPI ID: {paymentData.upiId}
            </Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default UPIPayment;