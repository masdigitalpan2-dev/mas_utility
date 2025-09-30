import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid } from '@mui/material';

const WhatsApp = () => {
  const [messageData, setMessageData] = useState({
    countryCode: '+91',
    phoneNumber: '',
    message: ''
  });

  const sendWhatsApp = () => {
    const { countryCode, phoneNumber, message } = messageData;
    const cleanCountryCode = countryCode.replace('+', '');
    const whatsappNumber = cleanCountryCode + phoneNumber;
    
    const thankYouMessage = `வணக்கம் ... 
◦•●◉ *மாஸ் டிஜிட்டல் சர்வீஸ்* ◉●•◦ உங்களை அன்போடு வரவேற்கின்றோம்...
𝕄𝔸𝕊 𝔻𝕚𝕘𝕚𝕥𝕒𝕝 𝕊𝕖𝕣𝕧𝕚𝕔𝕖𝔰 𝔎𝔬𝔬𝔳𝔞𝔱𝔥𝔲𝔯.
Cell: 8870920095`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message + thankYouMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Send WhatsApp Message</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Country Code"
              value={messageData.countryCode}
              onChange={(e) => setMessageData({...messageData, countryCode: e.target.value})}
              fullWidth
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="WhatsApp Number"
              value={messageData.phoneNumber}
              onChange={(e) => setMessageData({...messageData, phoneNumber: e.target.value})}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              value={messageData.message}
              onChange={(e) => setMessageData({...messageData, message: e.target.value})}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={sendWhatsApp} sx={{ mt: 2 }}>
          Send WhatsApp Message
        </Button>
      </Paper>
    </Container>
  );
};

export default WhatsApp;