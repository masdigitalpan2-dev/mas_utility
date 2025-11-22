import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, Card, CardContent, Grid, Slider } from '@mui/material';
import { CloudUpload, Clear, Refresh, Save, RotateLeft, RotateRight, AutoFixHigh, Image, ViewModule, MergeType, CallSplit, Compress } from '@mui/icons-material';

const MASResizer = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [appType, setAppType] = useState('Custom');
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const [quality, setQuality] = useState(90);
  const [dpi, setDpi] = useState(96);
  const [scale, setScale] = useState(100);
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [outputFileName, setOutputFileName] = useState('');
  const [outputFileType, setOutputFileType] = useState('jpg');
  const [originalFileSize, setOriginalFileSize] = useState('-');
  const [newFileSize, setNewFileSize] = useState('-');
  const [originalDimensions, setOriginalDimensions] = useState('-');
  const [currentDimensions, setCurrentDimensions] = useState('-');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/Images/PreviewImage.jpg');
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [rotationScale, setRotationScale] = useState(0);
  const [combineImages, setCombineImages] = useState([]);
  const [combineLayout, setCombineLayout] = useState('horizontal');
  const [combineSpacing, setCombineSpacing] = useState(10);
  const [isRemovingBackground, setIsRemovingBackground] = useState(false);
  const [pdfMergeFiles, setPdfMergeFiles] = useState([]);
  const [pdfSplitFile, setPdfSplitFile] = useState(null);
  const [pdfResizeFile, setPdfResizeFile] = useState(null);
  const [pdfQuality, setPdfQuality] = useState(80);
  const [pdfNewSize, setPdfNewSize] = useState('-');
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [pdfPageCount, setPdfPageCount] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [pdfSplitPreviewUrl, setPdfSplitPreviewUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);
  const cropImageRef = useRef(null);

  const handleAppTypeChange = (type) => {
    setAppType(type);
    switch (type) {
      case 'panphoto':
        setDimensions({ width: 213, height: 213 });
        setDpi(300);
        setOutputFileName('PAN_Photo');
        setOutputFileType('jpg');
        break;
      case 'pansignature':
        setDimensions({ width: 400, height: 200 });
        setDpi(600);
        setOutputFileName('PAN_Signature');
        setOutputFileType('jpg');
        break;
      case 'ESewa':
        setDimensions({ width: 120, height: 120 });
        setDpi(200);
        setOutputFileName('TNeGA_Photo');
        setOutputFileType('jpg');
        break;
      default:
        setDimensions({ width: 300, height: 300 });
        setDpi(96);
        break;
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileName = file.name.split('.');
      const name = fileName[0];
      const type = fileName[1].toLowerCase();
      
      setOutputFileName(`MAS_${name}`);
      setOutputFileType(type);
      setOriginalFileSize((file.size / 1024).toFixed(2) + ' KB');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewUrl(imageUrl);
        setOriginalImageUrl(imageUrl);
        
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions(`${img.width} x ${img.height}`);
          setCurrentDimensions(`${dimensions.width} x ${dimensions.height}`);
        };
        img.src = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAs = async () => {
    if (!selectedFile) {
      alert('Please select an image file first');
      return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = async () => {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      
      ctx.fillStyle = selectedColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const sourceImage = croppedImageUrl ? croppedImageUrl : (originalImageUrl || previewUrl);
      const sourceImg = new Image();
      
      sourceImg.onload = async () => {
        // Apply rotation if needed
        if (rotation !== 0) {
          const centerX = dimensions.width / 2;
          const centerY = dimensions.height / 2;
          ctx.translate(centerX, centerY);
          ctx.rotate(((rotation + rotationScale) * Math.PI) / 180);
          ctx.drawImage(sourceImg, -centerX, -centerY, dimensions.width, dimensions.height);
          ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        } else {
          ctx.drawImage(sourceImg, 0, 0, dimensions.width, dimensions.height);
        }
        
        canvas.toBlob(async (blob) => {
          setNewFileSize((blob.size / 1024).toFixed(2) + ' KB');
          
          try {
            // Check if File System Access API is supported
            if ('showSaveFilePicker' in window) {
              const fileHandle = await window.showSaveFilePicker({
                suggestedName: `${outputFileName}.${outputFileType}`,
                types: [{
                  description: 'Images',
                  accept: {
                    'image/jpeg': ['.jpg', '.jpeg'],
                    'image/png': ['.png']
                  }
                }]
              });
              
              const writable = await fileHandle.createWritable();
              await writable.write(blob);
              await writable.close();
              
              if (!window.Swal) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
                document.head.appendChild(script);
                await new Promise(resolve => script.onload = resolve);
              }
              await window.Swal.fire({
                title: 'Success!',
                text: 'File saved successfully!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              });
            } else {
              // Fallback to download for unsupported browsers
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${outputFileName}.${outputFileType}`;
              link.click();
              URL.revokeObjectURL(url);
            }
          } catch (error) {
            if (error.name !== 'AbortError') {
              console.error('Error saving file:', error);
              // Fallback to download on error
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${outputFileName}.${outputFileType}`;
              link.click();
              URL.revokeObjectURL(url);
            }
          }
        }, `image/${outputFileType}`, quality / 100);
      };
      
      sourceImg.src = sourceImage;
    };
    
    img.src = originalImageUrl || previewUrl;
  };



  const handleUndo = () => {
    setCroppedImageUrl(null);
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
  };

  const handleClear = () => {
    setSelectedFile(null);
    setOutputFileName('');
    setPreviewUrl('/Images/PreviewImage.jpg');
    setOriginalImageUrl(null);
    setOriginalFileSize('-');
    setNewFileSize('-');
    setOriginalDimensions('-');
    setCurrentDimensions('-');
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    setCroppedImageUrl(null);
    setRotation(0);
    setRotationScale(0);
    setAppType('Custom');
    handleAppTypeChange('Custom');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCombineFileSelect = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCombineImages(prev => [...prev, { url: e.target.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeCombineImage = (index) => {
    setCombineImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCombineClear = () => {
    setCombineImages([]);
    setOutputFileName('Combined_Image');
  };

  const handlePdfMergeFileSelect = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const pdfData = { file, name: file.name, pages: null };
      setPdfMergeFiles(prev => [...prev, pdfData]);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          if (!window.PDFLib) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
          }
          
          const { PDFDocument } = window.PDFLib;
          const arrayBuffer = e.target.result;
          const pdf = await PDFDocument.load(arrayBuffer);
          const pageCount = pdf.getPageCount();
          
          setPdfMergeFiles(prev => prev.map(pdfFile => 
            pdfFile.name === file.name ? { ...pdfFile, pages: pageCount } : pdfFile
          ));
        } catch (error) {
          console.error('Error reading PDF:', error);
          setPdfMergeFiles(prev => prev.map(pdfFile => 
            pdfFile.name === file.name ? { ...pdfFile, pages: 1 } : pdfFile
          ));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handlePdfSplitFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const pdfData = { file, name: file.name, pages: null };
      setPdfSplitFile(pdfData);
      
      // Generate PDF preview
      const fileUrl = URL.createObjectURL(file);
      setPdfSplitPreviewUrl(fileUrl);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          if (!window.PDFLib) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
          }
          
          const { PDFDocument } = window.PDFLib;
          const arrayBuffer = e.target.result;
          const pdf = await PDFDocument.load(arrayBuffer);
          const pageCount = pdf.getPageCount();
          
          setPdfSplitFile(prev => ({ ...prev, pages: pageCount }));
          setSelectedPages([]);
        } catch (error) {
          console.error('Error reading PDF:', error);
          setPdfSplitFile(prev => ({ ...prev, pages: 1 }));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const removePdfMergeFile = (index) => {
    setPdfMergeFiles(prev => prev.filter((_, i) => i !== index));
  };

  const movePdfMergeFile = (index, direction) => {
    setPdfMergeFiles(prev => {
      const newFiles = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < newFiles.length) {
        [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      }
      return newFiles;
    });
  };

  const handlePdfMergeClear = () => {
    setPdfMergeFiles([]);
    setOutputFileName('Merged_PDF');
  };

  const handlePdfSplitClear = () => {
    setPdfSplitFile(null);
    setOutputFileName('Split_PDF');
    setSelectedPages([]);
    setCurrentPage(1);
    if (pdfSplitPreviewUrl) {
      URL.revokeObjectURL(pdfSplitPreviewUrl);
      setPdfSplitPreviewUrl(null);
    }
  };

  const handlePdfResizeFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfResizeFile(file);
      const fileName = file.name.split('.')[0];
      setOutputFileName(`${fileName}_resized`);
      
      // Generate PDF preview
      const fileUrl = URL.createObjectURL(file);
      setPdfPreviewUrl(fileUrl);
      
      // Get page count
      try {
        if (!window.PDFLib) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        
        const { PDFDocument } = window.PDFLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        setPdfPageCount(pageCount);
      } catch (error) {
        console.error('Error reading PDF:', error);
        setPdfPageCount(1);
      }
    }
  };

  const handlePdfResizeClear = () => {
    setPdfResizeFile(null);
    setOutputFileName('Resized_PDF');
    setPdfNewSize('-');
    setPdfPageCount(null);
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
  };

  const handlePdfResize = async (type) => {
    if (!pdfResizeFile) return;
    
    try {
      if (!window.PDFLib) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      const { PDFDocument } = window.PDFLib;
      const arrayBuffer = await pdfResizeFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: type === 'compress',
        addDefaultPage: false
      });
      
      const originalSize = pdfResizeFile.size;
      const newSize = pdfBytes.length;
      const reductionPercent = Math.round(((originalSize - newSize) / originalSize) * 100);
      
      setPdfNewSize((newSize / 1024).toFixed(2) + ' KB');
      
      if (!window.Swal) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      await window.Swal.fire({
        title: 'Success!',
        text: `PDF ${type}ed! Original: ${(originalSize/1024).toFixed(2)} KB → New: ${(newSize/1024).toFixed(2)} KB (${reductionPercent}% reduction)`,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      });
      
    } catch (error) {
      console.error('Error resizing PDF:', error);
    }
  };

  const handlePdfResizeSave = async () => {
    if (!pdfResizeFile) return;
    
    try {
      if (!window.PDFLib) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      const { PDFDocument } = window.PDFLib;
      const arrayBuffer = await pdfResizeFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      
      if ('showSaveFilePicker' in window) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: `${outputFileName || 'Resized_PDF'}.pdf`,
          types: [{
            description: 'PDF Files',
            accept: {
              'application/pdf': ['.pdf']
            }
          }]
        });
        
        const writable = await fileHandle.createWritable();
        await writable.write(pdfBytes);
        await writable.close();
        
        if (!window.Swal) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        await window.Swal.fire({
          title: 'Success!',
          text: 'PDF saved successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error saving PDF:', error);
      }
    }
  };

  const handlePdfMerge = async () => {
    if (pdfMergeFiles.length === 0) return;
    
    try {
      // Load PDF-lib
      if (!window.PDFLib) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      const { PDFDocument } = window.PDFLib;
      const mergedPdf = await PDFDocument.create();
      
      // Merge all PDFs
      for (const pdfFile of pdfMergeFiles) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      
      const pdfBytes = await mergedPdf.save();
      const mergedPdfName = `${outputFileName || 'Merged_PDF'}.pdf`;
      
      if ('showSaveFilePicker' in window) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: mergedPdfName,
          types: [{
            description: 'PDF Files',
            accept: {
              'application/pdf': ['.pdf']
            }
          }]
        });
        
        const writable = await fileHandle.createWritable();
        await writable.write(pdfBytes);
        await writable.close();
        
        if (!window.Swal) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        await window.Swal.fire({
          title: 'Success!',
          text: 'PDF merged successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error merging PDF:', error);
      }
    }
  };

  const handlePdfSplit = async () => {
    if (!pdfSplitFile) return;
    
    try {
      const pdf = pdfSplitFile;
      const totalPages = pdf.pages || 1;
      
      if (totalPages === 1) {
        if (!window.Swal) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        await window.Swal.fire({
          title: 'Cannot Split PDF',
          text: 'This PDF has only 1 page and cannot be split.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }
      
      // Check if specific pages are selected (for PDFs with 1-10 pages)
      let pagesToSplit = [];
      if (totalPages >= 1 && totalPages <= 10) {
        if (selectedPages.length === 0) {
          if (!window.Swal) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
          }
          await window.Swal.fire({
            title: 'No Pages Selected',
            text: 'Please select at least one page to split.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }
        pagesToSplit = selectedPages;
      } else {
        // For PDFs with more than 10 pages, split all pages
        pagesToSplit = Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      
      // Load PDF-lib
      if (!window.PDFLib) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      const { PDFDocument } = window.PDFLib;
      
      // Read the PDF file
      const arrayBuffer = await pdf.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      if ('showDirectoryPicker' in window) {
        const dirHandle = await window.showDirectoryPicker();
        
        // Split selected pages into separate PDFs
        for (const pageNum of pagesToSplit) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]); // Convert to 0-based index
          newPdf.addPage(copiedPage);
          
          const pdfBytes = await newPdf.save();
          const fileName = `${outputFileName || 'Split_PDF'}_page_${pageNum}.pdf`;
          
          const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(pdfBytes);
          await writable.close();
        }
        
        if (!window.Swal) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        await window.Swal.fire({
          title: 'Success!',
          text: `PDF split into ${pagesToSplit.length} files!`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error splitting PDF:', error);
      }
    }
  };

  const handleCombineSave = async () => {
    if (combineImages.length === 0) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const images = await Promise.all(
      combineImages.map(img => {
        return new Promise(resolve => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.src = img.url;
        });
      })
    );
    
    if (combineLayout === 'horizontal') {
      const totalWidth = images.reduce((sum, img) => sum + img.width, 0) + (combineSpacing * (images.length - 1));
      const maxHeight = Math.max(...images.map(img => img.height));
      canvas.width = totalWidth;
      canvas.height = maxHeight;
      
      let x = 0;
      images.forEach(img => {
        ctx.drawImage(img, x, (maxHeight - img.height) / 2);
        x += img.width + combineSpacing;
      });
    } else {
      const maxWidth = Math.max(...images.map(img => img.width));
      const totalHeight = images.reduce((sum, img) => sum + img.height, 0) + (combineSpacing * (images.length - 1));
      canvas.width = maxWidth;
      canvas.height = totalHeight;
      
      let y = 0;
      images.forEach(img => {
        ctx.drawImage(img, (maxWidth - img.width) / 2, y);
        y += img.height + combineSpacing;
      });
    }
    
    canvas.toBlob(async (blob) => {
      try {
        if ('showSaveFilePicker' in window) {
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: `${outputFileName || 'Combined_Image'}.${outputFileType}`,
            types: outputFileType === 'pdf' ? [{
              description: 'All Types',
              accept: {
                'application/pdf': ['.pdf']
              }
            }] : [{
              description: 'Images',
              accept: {
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png']
              }
            }]
          });
          
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
          
          if (!window.Swal) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
          }
          await window.Swal.fire({
            title: 'Success!',
            text: 'Combined image saved successfully!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${outputFileName || 'Combined_Image'}.${outputFileType}`;
          link.click();
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error saving file:', error);
        }
      }
    }, `image/${outputFileType}`, quality / 100);
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;
    
    setIsRemovingBackground(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Simple background removal (remove white/light backgrounds)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // If pixel is close to white, make it transparent
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        const processedImageUrl = canvas.toDataURL('image/png');
        setPreviewUrl(processedImageUrl);
        setOriginalImageUrl(processedImageUrl);
        setOutputFileType('png'); // Change to PNG to preserve transparency
        
        setIsRemovingBackground(false);
      };
      
      img.src = originalImageUrl || previewUrl;
    } catch (error) {
      console.error('Error removing background:', error);
      setIsRemovingBackground(false);
    }
  };

  const handleMouseDown = (e) => {
    const containerRect = e.currentTarget.parentElement.getBoundingClientRect();
    const x = e.clientX - containerRect.left - 8; // Account for padding
    const y = e.clientY - containerRect.top - 8; // Account for padding
    setStartPoint({ x, y });
    setIsSelecting(true);
    setCropArea({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isSelecting) return;
    const containerRect = e.currentTarget.parentElement.getBoundingClientRect();
    const x = e.clientX - containerRect.left - 8; // Account for padding
    const y = e.clientY - containerRect.top - 8; // Account for padding
    setCropArea({
      x: Math.min(startPoint.x, x),
      y: Math.min(startPoint.y, y),
      width: Math.abs(x - startPoint.x),
      height: Math.abs(y - startPoint.y)
    });
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    if (cropArea.width > 10 && cropArea.height > 10) {
      generateCroppedImage();
    }
  };

  const generateCroppedImage = () => {
    if (!cropImageRef.current || !selectedFile) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const imageElement = cropImageRef.current;
      
      // Get displayed image dimensions
      const displayWidth = imageElement.offsetWidth;
      const displayHeight = imageElement.offsetHeight;
      
      // Calculate actual image display area (accounting for object-fit: contain)
      const imageAspect = img.naturalWidth / img.naturalHeight;
      const displayAspect = displayWidth / displayHeight;
      
      let actualDisplayWidth, actualDisplayHeight, offsetX = 0, offsetY = 0;
      
      if (imageAspect > displayAspect) {
        // Image is wider - width fills container, height is scaled
        actualDisplayWidth = displayWidth;
        actualDisplayHeight = displayWidth / imageAspect;
        offsetY = (displayHeight - actualDisplayHeight) / 2;
      } else {
        // Image is taller - height fills container, width is scaled
        actualDisplayHeight = displayHeight;
        actualDisplayWidth = displayHeight * imageAspect;
        offsetX = (displayWidth - actualDisplayWidth) / 2;
      }
      
      // Calculate scale factors from display to natural size
      const scaleX = img.naturalWidth / actualDisplayWidth;
      const scaleY = img.naturalHeight / actualDisplayHeight;
      
      // Adjust crop coordinates
      const adjustedX = Math.max(0, (cropArea.x - offsetX) * scaleX);
      const adjustedY = Math.max(0, (cropArea.y - offsetY) * scaleY);
      const adjustedWidth = Math.min(cropArea.width * scaleX, img.naturalWidth - adjustedX);
      const adjustedHeight = Math.min(cropArea.height * scaleY, img.naturalHeight - adjustedY);
      
      canvas.width = adjustedWidth;
      canvas.height = adjustedHeight;
      
      ctx.drawImage(
        img,
        adjustedX,
        adjustedY,
        adjustedWidth,
        adjustedHeight,
        0,
        0,
        adjustedWidth,
        adjustedHeight
      );
      
      setCroppedImageUrl(canvas.toDataURL());
    };
    
    img.crossOrigin = 'anonymous';
    img.src = originalImageUrl || previewUrl;
  };

  useEffect(() => {
    setCurrentDimensions(`${dimensions.width} x ${dimensions.height}`);
  }, [dimensions]);

  useEffect(() => {
    if (selectedFile && scale) {
      const scaleFactor = scale / 100;
      const estimatedSize = (selectedFile.size * scaleFactor * scaleFactor) / 1024;
      setNewFileSize(estimatedSize.toFixed(2) + ' KB');
    }
  }, [scale, selectedFile]);

  useEffect(() => {
    if (combineImages.length > 0 && previewRef.current && activeTab === 'combine') {
      const canvas = previewRef.current;
      const ctx = canvas.getContext('2d');
      
      Promise.all(
        combineImages.map(img => {
          return new Promise(resolve => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.src = img.url;
          });
        })
      ).then(images => {
        if (combineLayout === 'horizontal') {
          const totalWidth = images.reduce((sum, img) => sum + img.width, 0) + (combineSpacing * (images.length - 1));
          const maxHeight = Math.max(...images.map(img => img.height));
          const scale = Math.min(200 / totalWidth, 200 / maxHeight);
          
          canvas.width = totalWidth * scale;
          canvas.height = maxHeight * scale;
          
          let x = 0;
          images.forEach(img => {
            ctx.drawImage(img, x, (canvas.height - img.height * scale) / 2, img.width * scale, img.height * scale);
            x += (img.width + combineSpacing) * scale;
          });
        } else {
          const maxWidth = Math.max(...images.map(img => img.width));
          const totalHeight = images.reduce((sum, img) => sum + img.height, 0) + (combineSpacing * (images.length - 1));
          const scale = Math.min(200 / maxWidth, 200 / totalHeight);
          
          canvas.width = maxWidth * scale;
          canvas.height = totalHeight * scale;
          
          let y = 0;
          images.forEach(img => {
            ctx.drawImage(img, (canvas.width - img.width * scale) / 2, y, img.width * scale, img.height * scale);
            y += (img.height + combineSpacing) * scale;
          });
        }
      });
    }
  }, [combineImages, combineLayout, combineSpacing, activeTab]);

  return (
    <Box id="mas-resizer-container" sx={{ display: 'flex', bgcolor: '#FAFAFA' }}>
      {/* Left Sidebar */}
      <Box sx={{ 
        width: '250px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        p: 2,
        borderRadius: '0 12px 12px 0',
        height: '100vh',
        minHeight: '100vh'
      }}>
        <Typography variant="h6" sx={{ color: '#FFD700', mb: 3, textAlign: 'center' }}>
          MAS Resizer
        </Typography>
        
        {/* Navigation Menu */}
        <Box sx={{ mb: 3 }}>
          <Button 
            variant={activeTab === 'image' ? 'contained' : 'text'}
            onClick={() => setActiveTab('image')}
            fullWidth
            startIcon={<Image sx={{ color: '#FFD700' }} />}
            sx={{ 
              mb: 1, 
              color: 'white', 
              bgcolor: activeTab === 'image' ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            Image Resizer
          </Button>
          <Button 
            variant={activeTab === 'combine' ? 'contained' : 'text'}
            onClick={() => setActiveTab('combine')}
            fullWidth
            startIcon={<ViewModule sx={{ color: '#4CAF50' }} />}
            sx={{ 
              mb: 1,
              color: 'white', 
              bgcolor: activeTab === 'combine' ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            Image Combine
          </Button>
          <Button 
            variant={activeTab === 'pdfMerge' ? 'contained' : 'text'}
            onClick={() => setActiveTab('pdfMerge')}
            fullWidth
            startIcon={<MergeType sx={{ color: '#2196F3' }} />}
            sx={{ 
              mb: 1,
              color: 'white', 
              bgcolor: activeTab === 'pdfMerge' ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            PDF Merge
          </Button>
          <Button 
            variant={activeTab === 'pdfSplit' ? 'contained' : 'text'}
            onClick={() => setActiveTab('pdfSplit')}
            fullWidth
            startIcon={<CallSplit sx={{ color: '#FF5722' }} />}
            sx={{ 
              mb: 1,
              color: 'white', 
              bgcolor: activeTab === 'pdfSplit' ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            PDF Split
          </Button>
          <Button 
            variant={activeTab === 'pdfResize' ? 'contained' : 'text'}
            onClick={() => setActiveTab('pdfResize')}
            fullWidth
            startIcon={<Compress sx={{ color: '#9C27B0' }} />}
            sx={{ 
              color: 'white', 
              bgcolor: activeTab === 'pdfResize' ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            PDF Resizer
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 0 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={3}>
              {/* Left Panel - Controls */}
              <Grid item xs={12} md={4}>
                {activeTab === 'image' && (
                  <>
                    <Box sx={{ mb: 1 }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        Select Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                        />
                      </Button>
                    </Box>

                    {/* Selected Image Preview */}
                    {selectedFile && (
                      <Box sx={{ mb: 2, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Selected Image:</Typography>
                        <Box sx={{ border: '1px solid #ddd', p: 1, borderRadius: 2, bgcolor: '#f9f9f9', position: 'relative' }}>
                          <img
                            ref={cropImageRef}
                            src={previewUrl}
                            alt="Selected"
                            style={{ 
                              maxWidth: '100%', 
                              maxHeight: '150px', 
                              objectFit: 'contain', 
                              cursor: 'crosshair',
                              transform: `rotate(${rotation + rotationScale}deg)`,
                              transition: 'transform 0.3s ease'
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                          />
                          {croppedImageUrl && (
                            <Box
                              onClick={handleUndo}
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255,255,255,0.9)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                              }}
                            >
                              <Refresh sx={{ fontSize: 16, color: '#666' }} />
                            </Box>
                          )}
                          {cropArea.width > 0 && cropArea.height > 0 && (
                            <div
                              style={{
                                position: 'absolute',
                                left: cropArea.x,
                                top: cropArea.y,
                                width: cropArea.width,
                                height: cropArea.height,
                                border: '2px dashed #007bff',
                                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                pointerEvents: 'none',
                                zIndex: 10
                              }}
                            />
                          )}
                        </Box>
                        
                        {/* Crop Instruction */}
                        <Box sx={{ mt: 1, p: 0.5, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                            Click and drag on the image above to select crop area
                          </Typography>
                        </Box>
                        
                        {/* File Info */}
                        <Box sx={{ mt: 1, p: 0.5, bgcolor: '#f0f0f0', borderRadius: 1 }}>
                          <Typography variant="caption" display="block">File Size: {originalFileSize}</Typography>
                          <Typography variant="caption" display="block">New Size: {newFileSize}</Typography>
                          <Typography variant="caption" display="block">Dimension: {originalDimensions}</Typography>
                          <Typography variant="caption" display="block">New Dim: {currentDimensions}</Typography>
                          <Typography variant="caption" display="block">Rotation: {rotation + rotationScale}°</Typography>
                        </Box>
                        
                        {/* Remove Background */}
                        <Box sx={{ mt: 1 }}>
                          <Button
                            variant="contained"
                            startIcon={<AutoFixHigh />}
                            onClick={handleRemoveBackground}
                            fullWidth
                            disabled={!selectedFile || isRemovingBackground}
                            sx={{ 
                              bgcolor: '#a255f5ff', 
                              '&:hover': { bgcolor: '#7b1fa2' }
                            }}
                          >
                            {isRemovingBackground ? 'Processing...' : 'Remove Background'}
                          </Button>
                        </Box>
                        

                        

                      </Box>
                    )}


                  </>
                )}

                {activeTab === 'combine' && (
                  <>
                    <Box sx={{ mb: 1 }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        Add Images
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          multiple
                          onChange={handleCombineFileSelect}
                        />
                      </Button>
                    </Box>

                    {combineImages.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Selected Images ({combineImages.length}):</Typography>
                        <Box sx={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: 1, p: 1 }}>
                          {combineImages.map((img, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, p: 0.5, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                              <img src={img.url} alt={`Image ${index + 1}`} style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '8px' }} />
                              <Typography variant="caption" sx={{ flex: 1 }}>{img.name}</Typography>
                              <Button size="small" onClick={() => removeCombineImage(index)} sx={{ minWidth: 'auto', p: 0.5 }}>×</Button>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </>
                )}

                {activeTab === 'pdfResize' && (
                  <>
                    <Box sx={{ mb: 1 }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        Select PDF
                        <input
                          type="file"
                          hidden
                          accept=".pdf"
                          onChange={handlePdfResizeFileSelect}
                        />
                      </Button>
                    </Box>

                    {pdfResizeFile && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Selected PDF:</Typography>
                        <Box sx={{ p: 1, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                          <Typography variant="caption" display="block">{pdfResizeFile.name}</Typography>
                          <Typography variant="caption" display="block" color="text.secondary">
                            Original: {(pdfResizeFile.size / 1024).toFixed(2)} KB | Pages: {pdfPageCount || 'Loading...'}
                          </Typography>
                          <Typography variant="caption" display="block" color="text.secondary">
                            New Size: {pdfNewSize}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </>
                )}

                {activeTab === 'pdfMerge' && (
                  <>
                    <Box sx={{ mb: 1 }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        Add PDFs
                        <input
                          type="file"
                          hidden
                          accept=".pdf"
                          multiple
                          onChange={handlePdfMergeFileSelect}
                        />
                      </Button>
                    </Box>

                    {pdfMergeFiles.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Selected PDFs ({pdfMergeFiles.length}):</Typography>
                        <Box sx={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: 1, p: 1 }}>
                          {pdfMergeFiles.map((pdf, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, p: 0.5, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" display="block">{pdf.name}</Typography>
                                <Typography variant="caption" display="block" color="text.secondary">
                                  Size: {(pdf.file.size / 1024).toFixed(2)} KB | Pages: {pdf.pages || 'Loading...'}
                                </Typography>
                              </Box>
                              {pdfMergeFiles.length > 1 && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', mr: 0.5 }}>
                                  <Button 
                                    size="small" 
                                    onClick={() => movePdfMergeFile(index, 'up')}
                                    disabled={index === 0}
                                    sx={{ minWidth: 'auto', p: 0.2, fontSize: '10px' }}
                                  >
                                    ↑
                                  </Button>
                                  <Button 
                                    size="small" 
                                    onClick={() => movePdfMergeFile(index, 'down')}
                                    disabled={index === pdfMergeFiles.length - 1}
                                    sx={{ minWidth: 'auto', p: 0.2, fontSize: '10px' }}
                                  >
                                    ↓
                                  </Button>
                                </Box>
                              )}
                              <Button size="small" onClick={() => removePdfMergeFile(index)} sx={{ minWidth: 'auto', p: 0.5 }}>×</Button>
                            </Box>
                          ))}
                        </Box>
                        
                        <Box sx={{ mt: 1, p: 0.5, bgcolor: '#f0f0f0', borderRadius: 1 }}>
                          <Typography variant="caption" display="block">Total Files: {pdfMergeFiles.length}</Typography>
                          <Typography variant="caption" display="block">Total Size: {(pdfMergeFiles.reduce((sum, pdf) => sum + pdf.file.size, 0) / 1024).toFixed(2)} KB</Typography>
                          <Typography variant="caption" display="block">Total Pages: {pdfMergeFiles.reduce((sum, pdf) => sum + (pdf.pages || 0), 0)}</Typography>
                        </Box>
                      </Box>
                    )}
                  </>
                )}

                {activeTab === 'pdfSplit' && (
                  <>
                    <Box sx={{ mb: 1 }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUpload />}
                        fullWidth
                      >
                        Select PDF
                        <input
                          type="file"
                          hidden
                          accept=".pdf"
                          onChange={handlePdfSplitFileSelect}
                        />
                      </Button>
                    </Box>

                    {pdfSplitFile && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Selected PDF:</Typography>
                        <Box sx={{ p: 1, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                          <Typography variant="caption" display="block">{pdfSplitFile.name}</Typography>
                          <Typography variant="caption" display="block" color="text.secondary">
                            Size: {(pdfSplitFile.file.size / 1024).toFixed(2)} KB | Pages: {pdfSplitFile.pages || 'Loading...'}
                          </Typography>
                        </Box>
                        
                        {pdfSplitFile.pages && pdfSplitFile.pages >= 1 && pdfSplitFile.pages <= 10 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Select Pages to Split:</Typography>
                            <Box sx={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: 1, p: 1 }}>
                              {Array.from({ length: pdfSplitFile.pages }, (_, i) => i + 1).map(pageNum => (
                                <Box key={pageNum} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                  <input
                                    type="checkbox"
                                    id={`page-${pageNum}`}
                                    checked={selectedPages.includes(pageNum)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedPages(prev => [...prev, pageNum]);
                                      } else {
                                        setSelectedPages(prev => prev.filter(p => p !== pageNum));
                                      }
                                    }}
                                    style={{ marginRight: '8px' }}
                                  />
                                  <label htmlFor={`page-${pageNum}`} style={{ fontSize: '14px', cursor: 'pointer' }}>
                                    Page {pageNum}
                                  </label>
                                </Box>
                              ))}
                            </Box>
                            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setSelectedPages(Array.from({ length: pdfSplitFile.pages }, (_, i) => i + 1))}
                                sx={{ fontSize: '0.75rem' }}
                              >
                                Select All
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setSelectedPages([])}
                                sx={{ fontSize: '0.75rem' }}
                              >
                                Clear All
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}
                  </>
                )}
              </Grid>

              {/* Center Panel - Controls */}
              {activeTab === 'pdfResize' && (
                <Grid item xs={12} md={4}>
                  {/* PDF Quality */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>Quality: {pdfQuality}%</Typography>
                    <Slider
                      value={pdfQuality}
                      onChange={(e, value) => setPdfQuality(value)}
                      min={10}
                      max={100}
                      step={5}
                    />
                  </Box>

                  {/* Resize Options */}
                  <Card sx={{ mb: 2, p: 1.5, bgcolor: '#f5f5f5' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Resize Options</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          size="small"
                          fullWidth
                          onClick={() => handlePdfResize('compress')}
                          disabled={!pdfResizeFile}
                          sx={{ mb: 1 }}
                        >
                          Compress
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          size="small"
                          fullWidth
                          onClick={() => handlePdfResize('optimize')}
                          disabled={!pdfResizeFile}
                          sx={{ mb: 1, bgcolor: '#9c27b0', '&:hover': { bgcolor: '#7b1fa2' } }}
                        >
                          Optimize
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )}





              {activeTab === 'combine' && (
                <Grid item xs={12} md={4}>
                  {/* Layout Options */}
                  <Card sx={{ mb: 2, p: 1.5, bgcolor: '#f5f5f5' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Layout</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button
                          variant={combineLayout === 'horizontal' ? 'contained' : 'outlined'}
                          size="small"
                          fullWidth
                          onClick={() => setCombineLayout('horizontal')}
                        >
                          Horizontal
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant={combineLayout === 'vertical' ? 'contained' : 'outlined'}
                          size="small"
                          fullWidth
                          onClick={() => setCombineLayout('vertical')}
                        >
                          Vertical
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>

                  {/* Spacing */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>Spacing: {combineSpacing}px</Typography>
                    <Slider
                      value={combineSpacing}
                      onChange={(e, value) => setCombineSpacing(value)}
                      min={0}
                      max={50}
                    />
                  </Box>

                  {/* Output Settings */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        label="Width"
                        type="number"
                        value={dimensions.width}
                        onChange={(e) => setDimensions(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                        fullWidth
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Height"
                        type="number"
                        value={dimensions.height}
                        onChange={(e) => setDimensions(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                        fullWidth
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {activeTab === 'image' && (
                <Grid item xs={12} md={4}>
                  {/* Application Type */}
                  <Card sx={{ mb: 2, p: 1.5, bgcolor: '#f5f5f5' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Application Type</Typography>
                    <Grid container spacing={1}>
                      {[
                        { id: 'Custom', label: 'Custom' },
                        { id: 'ESewa', label: 'E-Sewa' },
                        { id: 'panphoto', label: 'PAN Photo' },
                        { id: 'pansignature', label: 'PAN Sign' }
                      ].map((type) => (
                        <Grid item xs={6} key={type.id}>
                          <Button
                            variant={appType === type.id ? 'contained' : 'outlined'}
                            size="small"
                            fullWidth
                            onClick={() => handleAppTypeChange(type.id)}
                          >
                            {type.label}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Card>

                  {/* Dimensions */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        label="Width"
                        type="number"
                        value={dimensions.width}
                        onChange={(e) => setDimensions(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                        fullWidth
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Height"
                        type="number"
                        value={dimensions.height}
                        onChange={(e) => setDimensions(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                        fullWidth
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                  </Grid>

                  {/* Quality and DPI */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        label="Quality"
                        type="number"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value) || 90)}
                        inputProps={{ min: 1, max: 100 }}
                        fullWidth
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="DPI"
                        type="number"
                        value={dpi}
                        onChange={(e) => setDpi(parseInt(e.target.value) || 96)}
                        inputProps={{ min: 72, max: 300 }}
                        fullWidth
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                      />
                    </Grid>
                  </Grid>

                  {/* Scale and Fine Rotation */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ mb: 1 }}>Scale: {scale}%</Typography>
                      <Slider
                        value={scale}
                        onChange={(e, value) => setScale(value)}
                        min={10}
                        max={100}
                        disabled={appType !== 'Custom'}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ mb: 1 }}>Fine Rotation: {rotationScale}°</Typography>
                      <Slider
                        value={rotationScale}
                        onChange={(e, value) => setRotationScale(value)}
                        min={-5}
                        max={5}
                        step={0.1}
                        marks={[
                          { value: -5, label: '-5°' },
                          { value: 0, label: '0°' },
                          { value: 5, label: '+5°' }
                        ]}
                      />
                    </Grid>
                  </Grid>

                  {/* Rotation Controls */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>Rotation: {rotation}°</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<RotateLeft />}
                        onClick={() => setRotation(prev => prev - 90)}
                        fullWidth
                        sx={{ fontSize: '0.75rem' }}
                      >
                        Left
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<RotateRight />}
                        onClick={() => setRotation(prev => prev + 90)}
                        fullWidth
                        sx={{ fontSize: '0.75rem' }}
                      >
                        Right
                      </Button>
                    </Box>
                  </Box>



                </Grid>
              )}

              {/* Right Panel - Preview */}
              {activeTab === 'pdfResize' && (
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>PDF Preview</Typography>
                    <Box sx={{ border: '2px solid #ddd', p: 1, borderRadius: 2, bgcolor: '#f8f9fa', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {pdfPreviewUrl ? (
                        <iframe
                          src={pdfPreviewUrl}
                          style={{
                            width: '100%',
                            height: '180px',
                            border: 'none',
                            borderRadius: '4px'
                          }}
                          title="PDF Preview"
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Select a PDF to preview
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            label="Output File"
                            value={outputFileName || 'Resized_PDF'}
                            onChange={(e) => setOutputFileName(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handlePdfResizeSave}
                            fullWidth
                            disabled={!pdfResizeFile}
                            sx={{ 
                              bgcolor: '#4caf50', 
                              '&:hover': { bgcolor: '#45a049' }
                            }}
                          >
                            Save PDF
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="outlined"
                            startIcon={<Clear />}
                            onClick={handlePdfResizeClear}
                            fullWidth
                            sx={{ bgcolor: '#085784ff', '&:hover': { bgcolor: '#e927c2ff' }, color: 'white', borderColor: '#032e47ff' }}
                          >
                            Clear
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              )}

              {activeTab === 'pdfMerge' && (
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>Merge Output</Typography>
                    <Box sx={{ border: '2px solid #ddd', p: 2, borderRadius: 2, bgcolor: '#f8f9fa', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {pdfMergeFiles.length > 0 ? `${pdfMergeFiles.length} PDF(s) selected` : 'Add PDFs to merge'}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            label="Output File"
                            value={outputFileName || 'Merged_PDF'}
                            onChange={(e) => setOutputFileName(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handlePdfMerge}
                            fullWidth
                            disabled={pdfMergeFiles.length <= 1}
                            sx={{ 
                              bgcolor: '#4caf50', 
                              '&:hover': { bgcolor: '#45a049' }
                            }}
                          >
                            Merge & Save
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="outlined"
                            startIcon={<Clear />}
                            onClick={handlePdfMergeClear}
                            fullWidth
                            sx={{ bgcolor: '#085784ff', '&:hover': { bgcolor: '#e927c2ff' }, color: 'white', borderColor: '#032e47ff' }}
                          >
                            Clear
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              )}

              {activeTab === 'pdfSplit' && (
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>PDF Preview</Typography>
                    <Box sx={{ border: '2px solid #ddd', p: 1, borderRadius: 2, bgcolor: '#f8f9fa', minHeight: '400px', position: 'relative' }}>
                      {pdfSplitPreviewUrl ? (
                        <>
                          <iframe
                            src={`${pdfSplitPreviewUrl}#page=${currentPage}`}
                            style={{
                              width: '100%',
                              height: '380px',
                              border: 'none',
                              borderRadius: '4px'
                            }}
                            title="PDF Preview"
                          />
                          <Box sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.9)', p: 1, borderRadius: 1 }}>
                            <Button
                              size="small"
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              disabled={currentPage <= 1}
                              sx={{ minWidth: 'auto', p: 0.5 }}
                            >
                              ←
                            </Button>
                            <Typography variant="caption" sx={{ mx: 1 }}>
                              {currentPage} / {pdfSplitFile?.pages || 1}
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => setCurrentPage(prev => Math.min(pdfSplitFile?.pages || 1, prev + 1))}
                              disabled={currentPage >= (pdfSplitFile?.pages || 1)}
                              sx={{ minWidth: 'auto', p: 0.5 }}
                            >
                              →
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                          <Typography variant="body2" color="text.secondary">
                            Select a PDF to preview
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              )}



              {activeTab === 'pdfSplit' && (
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>Split Output</Typography>
                    <Box sx={{ border: '2px solid #ddd', p: 2, borderRadius: 2, bgcolor: '#f8f9fa', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {pdfSplitFile ? 'PDF ready to split' : 'Select a PDF to split'}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            label="Output File Prefix"
                            value={outputFileName || 'Split_PDF'}
                            onChange={(e) => setOutputFileName(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handlePdfSplit}
                            fullWidth
                            disabled={!pdfSplitFile}
                            sx={{ 
                              bgcolor: '#8B5CF6', 
                              '&:hover': { bgcolor: '#7C3AED' }
                            }}
                          >
                            Split PDF
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="outlined"
                            startIcon={<Clear />}
                            onClick={handlePdfSplitClear}
                            fullWidth
                            sx={{ bgcolor: '#085784ff', '&:hover': { bgcolor: '#e927c2ff' }, color: 'white', borderColor: '#032e47ff' }}
                          >
                            Clear
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              )}

              {activeTab === 'combine' && (
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>Preview</Typography>
                    <Box sx={{ border: '2px solid #ddd', p: 2, borderRadius: 2, bgcolor: '#f8f9fa', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {combineImages.length > 0 ? (
                        <canvas ref={previewRef} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                      ) : (
                        <Typography variant="body2" color="text.secondary">Add images to see preview</Typography>
                      )}
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          <TextField
                            label="Output File"
                            value={outputFileName || 'Combined_Image'}
                            onChange={(e) => setOutputFileName(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}>
                            <Select
                              value={outputFileType}
                              onChange={(e) => setOutputFileType(e.target.value)}
                            >
                              <MenuItem value="jpg">jpg</MenuItem>
                              <MenuItem value="jpeg">jpeg</MenuItem>
                              <MenuItem value="png">png</MenuItem>
                              <MenuItem value="pdf">pdf</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      
                      <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleCombineSave}
                            fullWidth
                            disabled={combineImages.length === 0}
                            sx={{ 
                              bgcolor: '#4caf50', 
                              '&:hover': { bgcolor: '#45a049' }
                            }}
                          >
                            Save As
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="outlined"
                            startIcon={<Clear />}
                            onClick={handleCombineClear}
                            fullWidth
                            sx={{ bgcolor: '#085784ff', '&:hover': { bgcolor: '#e927c2ff' }, color: 'white', borderColor: '#032e47ff' }}
                          >
                            Clear
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              )}

              {activeTab === 'image' && (
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>Preview</Typography>
                    <Box sx={{ border: '2px solid #ddd', p: 2, borderRadius: 2, bgcolor: '#f8f9fa' }}>
                      <img
                        ref={previewRef}
                        src={croppedImageUrl || previewUrl}
                        alt="Preview"
                        style={{ 
                          width: '200px', 
                          height: '200px',
                          objectFit: 'contain',
                          transform: `rotate(${rotation + rotationScale}deg)`,
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          <TextField
                            label="Output File"
                            value={outputFileName}
                            onChange={(e) => setOutputFileName(e.target.value)}
                            fullWidth
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#12a4d9' } } }}>
                            <Select
                              value={outputFileType}
                              onChange={(e) => setOutputFileType(e.target.value)}
                            >
                              <MenuItem value="jpg">jpg</MenuItem>
                              <MenuItem value="jpeg">jpeg</MenuItem>
                              <MenuItem value="png">png</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      
                      <Grid container spacing={1} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSaveAs}
                            fullWidth
                            sx={{ 
                              bgcolor: '#4caf50', 
                              '&:hover': { bgcolor: '#45a049' }
                            }}
                          >
                            Save As
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="outlined"
                            startIcon={<Clear />}
                            onClick={handleClear}
                            fullWidth
                            sx={{ bgcolor: '#085784ff', '&:hover': { bgcolor: '#e927c2ff' }, color: 'white', borderColor: '#032e47ff' }}
                          >
                            Clear
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>


          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MASResizer;