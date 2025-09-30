import React, { useState } from 'react';
import { Container, Paper, Button, Typography, Grid, Box } from '@mui/material';

const ImageProcessor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const processImage = async (type) => {
    if (!selectedFile) return;
    
    let processed;
    switch (type) {
      case 'resize':
        processed = await resizeImage(selectedFile, 800, 600);
        break;
      case 'compress':
        processed = await resizeImage(selectedFile, selectedFile.width, selectedFile.height);
        break;
      default:
        processed = selectedFile;
    }
    
    setProcessedImage(URL.createObjectURL(processed));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Image Processor</Typography>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ marginBottom: '20px' }}
        />
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item>
            <Button variant="contained" onClick={() => processImage('resize')}>
              Resize Image
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => processImage('compress')}>
              Compress Image
            </Button>
          </Grid>
        </Grid>

        {selectedFile && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Original Image:</Typography>
            <img 
              src={URL.createObjectURL(selectedFile)} 
              alt="Original" 
              style={{ maxWidth: '300px', maxHeight: '200px' }}
            />
          </Box>
        )}

        {processedImage && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Processed Image:</Typography>
            <img 
              src={processedImage} 
              alt="Processed" 
              style={{ maxWidth: '300px', maxHeight: '200px' }}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ImageProcessor;