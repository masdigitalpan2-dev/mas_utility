import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Refresh, AccountBalance, LocalPostOffice, Business } from '@mui/icons-material';
import QRCode from 'qrcode';
import appConfig from '../config/appConfig';

const IndianBankLogo = () => (
  <img 
    src="/Images/ib_logo.png" 
    alt="Indian Bank" 
    style={{ width: 24, height: 24, objectFit: 'contain' }} 
  />
);

const SBILogo = () => (
  <img 
    src="/Images/SBI_Logo.png" 
    alt="SBI" 
    style={{ width: 24, height: 24, objectFit: 'contain' }} 
  />
);

const IndiaPostLogo = () => (
  <img 
    src="/Images/ippb_logo.png" 
    alt="India Post" 
    style={{ width: 24, height: 24, objectFit: 'contain' }} 
  />
);

const UPIPayment = () => {
  const [paymentData, setPaymentData] = useState({
    upiId: 'masdigitalservices@oksbi',
    amount: '',
    message: `Payment for ${appConfig.header.name}`,
    bankUser: 'SBI Naveen'
  });
  const [qrCode, setQrCode] = useState('');

  const bankOptions = [
    { label: 'Indian Bank (K)', value: 'masdigitalservices-2@okicici', icon: <IndianBankLogo /> },
    { label: 'Indian Bank (A)', value: 'masdigitalservices1-1@oksbi', icon: <IndianBankLogo /> },
    { label: 'India Post', value: 'masdigitalservices-4@okicici', icon: <IndiaPostLogo /> },
    { label: 'City Union', value: 'masdigitalservices-5@oksbi', icon: <Business sx={{ color: '#2196f3' }} /> },
    { label: 'SBI (Naveen)', value: 'masdigitalservices@oksbi', icon: <SBILogo /> },
    { label: 'SBI (Jeeva)', value: 'masdigitalservices1-2@oksbi', icon: <SBILogo /> }
  ];

  const generateQR = async () => {
    const upiLink = `upi://pay?pa=${paymentData.upiId}&pn=${appConfig.header.name}&tn=${paymentData.message}&am=${paymentData.amount}&cu=INR`;
    const qr = await QRCode.toDataURL(upiLink);
    setQrCode(qr);
  };

  const resetForm = () => {
    setPaymentData({
      upiId: 'masdigitalservices@oksbi',
      amount: '',
      message: `Payment for ${appConfig.header.name}`,
      bankUser: 'SBI Naveen'
    });
    setQrCode('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #bbdefb 0%, #e1bee7 100%)', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>UPI Payment</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Bank User"
                  value={paymentData.bankUser}
                  onChange={(e) => {
                    const selected = bankOptions.find(b => b.label === e.target.value);
                    setPaymentData({...paymentData, bankUser: e.target.value, upiId: selected?.value || ''});
                  }}
                  fullWidth
                  size="small"
                  SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 200 } } } }}
                  sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
                >
                  {bankOptions.map((bank) => (
                    <MenuItem key={bank.label} value={bank.label} sx={{ display: 'flex', alignItems: 'center', minHeight: 'auto', py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>{bank.icon}</ListItemIcon>
                      <ListItemText primary={bank.label} sx={{ margin: 0 }} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount"
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                  fullWidth
                  required
                  sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
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
                  sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={generateQR} fullWidth>
                  Generate QR Code
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" onClick={resetForm} fullWidth sx={{ background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)', color: 'white', borderColor: '#f44336' }} startIcon={<Refresh />}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {qrCode && (
              <div style={{ textAlign: 'center' }}>
                <img src={qrCode} alt="UPI QR Code" />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  UPI ID: {paymentData.upiId}
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UPIPayment;