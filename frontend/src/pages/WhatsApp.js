import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, InputAdornment } from '@mui/material';
import appConfig from '../config/appConfig';

const WhatsApp = () => {
  const [messageData, setMessageData] = useState({
    countryCode: '+91',
    phoneNumber: '',
    welcomeMessage: '',
    message: ''
  });

  useEffect(() => {
    setMessageData(prev => ({
      ...prev,
      welcomeMessage: appConfig.welcomemessage.notes
    }));
  }, []);

  const sendWhatsApp = () => {
    const { countryCode, phoneNumber, message } = messageData;
    
    // Validate phone number
    if (!phoneNumber.trim()) {
      alert('Please enter a phone number');
      return;
    }
    
    if (countryCode === '+91' && phoneNumber.length !== 10) {
      alert('Indian mobile number must be 10 digits');
      return;
    }
    
    if (!/^\d+$/.test(phoneNumber)) {
      alert('Phone number must contain only digits');
      return;
    }
    
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    
    const cleanCountryCode = countryCode.replace('+', '');
    const whatsappNumber = cleanCountryCode + phoneNumber;
    
    const thankYouMessage = `வணக்கம் ... 
◦•●◉ *மாஸ் டிஜிட்டல் சர்வீஸ்* ◉●•◦ உங்களை அன்போடு வரவேற்கின்றோம்...
𝕄𝔸𝕊 𝔻𝕚𝕘𝕚𝕥𝕒𝕝 𝕊𝕖𝕣𝕧𝕚𝕔𝕖𝔰 𝔎𝔬𝔬𝔳𝔞𝔱𝔥𝔲𝔯.
Cell: 8870920095`;

    const finalMessage = messageData.welcomeMessage ? messageData.welcomeMessage + '\n\n' + message : message;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage + thankYouMessage)}`;
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ fontSize: '20px' }}>🇮🇳</span>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#25d366' },
                  '&:hover fieldset': { borderColor: '#128c7e' },
                  '&.Mui-focused fieldset': { borderColor: '#075e54' }
                }
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="WhatsApp Number"
              value={messageData.phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (messageData.countryCode === '+91' && value.length <= 10) {
                  setMessageData({...messageData, phoneNumber: value});
                } else if (messageData.countryCode !== '+91') {
                  setMessageData({...messageData, phoneNumber: value});
                }
              }}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  '& fieldset': { borderColor: '#25d366' },
                  '&:hover fieldset': { borderColor: '#128c7e' },
                  '&.Mui-focused fieldset': { borderColor: '#075e54' }
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Welcome Message"
              value={messageData.welcomeMessage}
              onChange={(e) => setMessageData({...messageData, welcomeMessage: e.target.value})}
              fullWidth
              placeholder="Enter your welcome message..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#25d366' },
                  '&:hover fieldset': { borderColor: '#128c7e' },
                  '&.Mui-focused fieldset': { borderColor: '#075e54' }
                }
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#25d366' },
                  '&:hover fieldset': { borderColor: '#128c7e' },
                  '&.Mui-focused fieldset': { borderColor: '#075e54' }
                }
              }}
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