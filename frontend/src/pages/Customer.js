import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem, FormControl, InputLabel, Autocomplete, InputAdornment, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import { Add, Edit, Delete, Search, Clear, Refresh, Person, Phone, LocationOn, Bolt, Tv, Badge, PhotoCamera, Visibility, AccountCircle } from '@mui/icons-material';
import MASAnalyticsSidebar from '../components/MASAnalyticsSidebar';
import appConfig from '../config/appConfig';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:52550/api';

const Customer = ({ onNavigate }) => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [focusedField, setFocusedField] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [userRole, setUserRole] = useState('guest');
  const [formData, setFormData] = useState({
    name: '',
    fatherHusbandName: '',
    place: '',
    phone: '',
    ebNumber: '',
    dthNumber: '',
    dthProvider: '',
    aadhar: '',
    notes: '',
    photo: null
  });

  useEffect(() => {
    fetchCustomers();
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user') || 'guest';
    setUserRole(user);
  }, []);

  const fetchCustomers = async () => {
    try {
      console.log('Fetching customers from:', `${API_BASE_URL}/customer`);
      const response = await axios.get(`${API_BASE_URL}/customer`);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      // Fallback to empty array if backend is not available
      setCustomers([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['phone', 'ebNumber', 'dthNumber', 'aadhar'];
    const textOnlyFields = ['name', 'fatherHusbandName'];
    
    if (numericFields.includes(name)) {
      let numericValue = value.replace(/[^0-9]/g, '');
      if (name === 'phone') {
        if (numericValue.length > 10) {
          numericValue = numericValue.slice(0, 10);
        }
        if (numericValue.length > 0 && !['6', '7', '8', '9'].includes(numericValue[0])) {
          numericValue = '';
        }
      } else if (name === 'aadhar' && numericValue.length > 12) {
        numericValue = numericValue.slice(0, 12);
      }
      setFormData({
        ...formData,
        [name]: numericValue
      });
      
      // Check for duplicate phone number
      if (name === 'phone' && numericValue.length >= 10 && !editingId) {
        const existingCustomer = customers.find(c => c.phone && c.phone.toString() === numericValue);
        if (existingCustomer) {
          if (!window.Swal) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            document.head.appendChild(script);
            script.onload = () => {
              window.Swal.fire({
                title: 'Duplicate Phone!',
                html: `Phone number already exists for:<br><b>${existingCustomer.name}</b>`,
                icon: 'warning',
                confirmButtonText: 'OK'
              });
            };
          } else {
            window.Swal.fire({
              title: 'Duplicate Phone!',
              html: `Phone number already exists for:<br><b>${existingCustomer.name}</b>`,
              icon: 'warning',
              confirmButtonText: 'OK'
            });
          }
        }
      }
    } else if (textOnlyFields.includes(name)) {
      const textValue = value.replace(/[^a-zA-Z\s.]/g, '');
      const capitalizedValue = textValue.replace(/\b\w/g, l => l.toUpperCase());
      setFormData({
        ...formData,
        [name]: capitalizedValue
      });
      
      // Check for duplicate name
      if (name === 'name' && textValue.length >= 3 && !editingId) {
        const existingCustomer = customers.find(c => c.name && c.name.toLowerCase() === textValue.toLowerCase());
        if (existingCustomer) {
          if (!window.Swal) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            document.head.appendChild(script);
            script.onload = () => {
              window.Swal.fire({
                title: 'Duplicate Name!',
                html: `Customer name already exists:<br><b>${existingCustomer.name}</b><br>Phone: <b>${existingCustomer.phone || 'N/A'}</b>`,
                icon: 'warning',
                confirmButtonText: 'OK'
              });
            };
          } else {
            window.Swal.fire({
              title: 'Duplicate Name!',
              html: `Customer name already exists:<br><b>${existingCustomer.name}</b><br>Phone: <b>${existingCustomer.phone || 'N/A'}</b>`,
              icon: 'warning',
              confirmButtonText: 'OK'
            });
          }
        }
      }
    } else if (name === 'place') {
      const textValue = value.replace(/[^a-zA-Z\s.]/g, '');
      const capitalizedValue = textValue.replace(/\b\w/g, l => l.toUpperCase());
      setFormData({
        ...formData,
        [name]: capitalizedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddCustomer = async () => {
    if (!formData.name || !formData.phone || !formData.place) {
      return;
    }
    
    // Check for duplicate phone (excluding shop cell number)
    if (!editingId && formData.phone !== appConfig.shop.cell) {
      const duplicateCustomer = customers.find(c => 
        c.phone && c.phone.toString() === formData.phone
      );
      
      if (duplicateCustomer) {
        if (!window.Swal) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        await window.Swal.fire({
          title: 'Duplicate Phone!',
          html: `Phone number already exists for:<br><b>${duplicateCustomer.name}</b><br>Phone: <b>${duplicateCustomer.phone}</b>`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
    }
    
    setLoading(true);
    try {
      const customerData = {
        name: formData.name,
        phone: formData.phone ? parseInt(formData.phone) : null,
        fatherHusbandName: formData.fatherHusbandName,
        place: formData.place,
        ebNumber: formData.ebNumber ? parseInt(formData.ebNumber) : null,
        dthNumber: formData.dthNumber ? parseInt(formData.dthNumber) : null,
        dthProvider: formData.dthProvider,
        aadhar: formData.aadhar ? parseInt(formData.aadhar) : null,
        notes: formData.notes,
        photo: formData.photo,
        createdBy: editingId ? 
          (customers.find(c => c.customerId === editingId)?.createdBy || 'Unknown User') : 
          (userRole === 'admin' ? appConfig.user.name : 'Guest User')
      };
      
      if (editingId) {
        const response = await axios.put(`${API_BASE_URL}/customer/${editingId}`, customerData);
        if (response.status === 200) {
          if (!window.Swal) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
          }
          await window.Swal.fire({
            title: 'Updated!',
            text: 'Customer has been updated successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          fetchCustomers();
          setEditingId(null);
        }
      } else {
        const response = await axios.post(`${API_BASE_URL}/customer`, customerData);
        if (response.status === 201) {
          if (!window.Swal) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
          }
          await window.Swal.fire({
            title: 'Saved!',
            html: `Customer saved successfully!<br><b>${formData.name}</b><br>Phone: <b>${formData.phone}</b>`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          fetchCustomers();
        }
      }
      setFormData({ name: '', fatherHusbandName: '', place: '', phone: '', ebNumber: '', dthNumber: '', dthProvider: '', aadhar: '', notes: '', photo: null });
    } catch (error) {
      console.error('Error saving customer:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
      if (!window.Swal) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      const errorMsg = error.code === 'ERR_NETWORK' ? 
        'Backend server is not running. Please start the server on port 52550.' :
        `Failed to save customer: ${error.response?.data || error.message}`;
      await window.Swal.fire('Error!', errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCustomer = (customer) => {
    setFormData({
      name: customer.name || '',
      fatherHusbandName: customer.fatherHusbandName || '',
      place: customer.place || '',
      phone: customer.phone ? customer.phone.toString() : '',
      ebNumber: customer.ebNumber ? customer.ebNumber.toString() : '',
      dthNumber: customer.dthNumber ? customer.dthNumber.toString() : '',
      dthProvider: customer.dthProvider || '',
      aadhar: customer.aadhar ? customer.aadhar.toString() : '',
      notes: customer.notes || '',
      photo: customer.photo || null
    });
    setEditingId(customer.customerId);
  };

  const handleDeleteCustomer = async (id) => {
    const customer = customers.find(c => c.customerId === id);
    
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }
    
    const result = await window.Swal.fire({
      title: 'Delete Customer?',
      html: `Name: <b>${customer?.name}</b><br>Phone: <b>${customer?.phone || 'N/A'}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      position: 'center'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/customer/${id}`);
        if (response.status === 204) {
          await window.Swal.fire({
            title: 'Deleted!',
            text: 'Customer has been deleted.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          fetchCustomers();
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
        await window.Swal.fire('Error!', 'Failed to delete customer.', 'error');
      }
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, photo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', fatherHusbandName: '', place: '', phone: '', ebNumber: '', dthNumber: '', dthProvider: '', aadhar: '', notes: '', photo: null });
    setEditingId(null);
  };

  const handleViewCustomer = (customer) => {
    console.log('Opening customer view for:', customer);
    setViewCustomer(customer);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toString().includes(searchTerm);
    
    const matchesFormPhone = !formData.phone || formData.phone.length < 3 || 
      customer.phone?.toString().includes(formData.phone);
    
    return matchesSearch && matchesFormPhone;
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FAFAFA', overflow: 'hidden' }}>
      <MASAnalyticsSidebar activeItem="Customer" onNavigate={onNavigate} />

      <Box sx={{ flex: 1, p: 2 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#1F2937' }}>
            Customer Management
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: userRole === 'admin' ? appConfig.user.color : '#6B7280', width: 28, height: 28, fontSize: '0.7rem' }}>
              {userRole === 'admin' ? appConfig.user.avatar : 'GU'}
            </Avatar>
            <Box>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
                {userRole === 'admin' ? appConfig.user.name : 'Guest'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                {userRole === 'admin' ? appConfig.user.role : 'User'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Add Customer Form */}
        <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #00d2ff 0%, #ff00a6 100%)' }}>
          <CardContent sx={{ background: 'linear-gradient(135deg, #8fa0eeff 20%, #9278adff 100%)', borderRadius: 2, pt: 1.5, px: 1.5, pb: 0.5 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{editingId ? 'Edit Customer' : 'Add New Customer'}</Typography> 
            <form onSubmit={(e) => { e.preventDefault(); handleAddCustomer(); }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 120px', gap: 1, mb: 1 }}>
              <TextField id="customer-name" name="name" value={formData.name} onChange={handleInputChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField('')} size="small" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { border: 'none' } } }} InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ mr: 0.5 }} />{!formData.name && focusedField !== 'name' && 'Customer Name'}</InputAdornment> }} />
              <TextField id="father-husband-name" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleInputChange} onFocus={() => setFocusedField('fatherHusbandName')} onBlur={() => setFocusedField('')} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { border: 'none' } } }} InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ mr: 0.5 }} />{!formData.fatherHusbandName && focusedField !== 'fatherHusbandName' && 'Father/Husband Name'}</InputAdornment> }} />
              <Autocomplete
                id="customer-place"
                options={['Koovathur','Main Road','Thoppu St','Udayar st','Mela St','Middle St','Madam St','Arulananthapuram','Agnespuram','KN Kuppam','Kurumbanur','Vadugarpalayam','Pattanamkurichi','Poovanipattu', 'Kudikadu' ]}
                value={formData.place}
                onChange={(event, newValue) => setFormData({ ...formData, place: newValue || '' })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="place"
                    placeholder="Place"
                    size="small"
                    required
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { border: 'none' } } }}
                    onFocus={() => setFocusedField('place')} onBlur={() => setFocusedField('')}
                    InputProps={{ ...params.InputProps, startAdornment: <InputAdornment position="start"><LocationOn sx={{ mr: 0.5 }} />{!formData.place && focusedField !== 'place' && 'Place'}</InputAdornment> }}
                  />
                )}
                freeSolo
              />
              <TextField id="customer-mobile" name="phone" value={formData.phone} onChange={handleInputChange} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField('')} size="small" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { border: 'none' } } }} inputProps={{ inputMode: 'numeric' }} InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ mr: 0.5 }} />{!formData.phone && focusedField !== 'phone' && 'Mobile'}</InputAdornment> }} />
              
              {/* Photo Section */}
              <Box sx={{ gridRow: 'span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2, p: 1 }}>
                <Avatar key={formData.photo || 'default'} sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)' }} src={formData.photo}>
                  <Person sx={{ fontSize: 40, color: 'white' }} />
                </Avatar>
                <Button component="label" variant="contained" fullWidth startIcon={<PhotoCamera />} sx={{ fontSize: '0.8rem', color: 'white', bgcolor: '#7038f1ff', '&:hover': { bgcolor: '#5a2dc7' } }}>Photo<input type="file" hidden accept="image/*" onChange={handlePhotoChange} /></Button>
              </Box>
              <TextField id="eb-number" name="ebNumber" value={formData.ebNumber} onChange={handleInputChange} onFocus={() => setFocusedField('ebNumber')} onBlur={() => setFocusedField('')} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { border: 'none' } } }} inputProps={{ inputMode: 'numeric' }} InputProps={{ startAdornment: <InputAdornment position="start"><Bolt sx={{ mr: 0.5 }} />{!formData.ebNumber && focusedField !== 'ebNumber' && 'EB Number'}</InputAdornment> }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField id="dth-number" name="dthNumber" value={formData.dthNumber} onChange={handleInputChange} onFocus={() => setFocusedField('dthNumber')} onBlur={() => setFocusedField('')} size="small" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { border: 'none' } } }} inputProps={{ inputMode: 'numeric' }} InputProps={{ startAdornment: <InputAdornment position="start"><Tv sx={{ mr: 0.5 }} />{!formData.dthNumber && focusedField !== 'dthNumber' && 'DTH Number'}</InputAdornment> }} />
                <FormControl id="dth-provider" size="small" sx={{ 
                  flex: 1, 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2, 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { borderColor: '#7C3AED' },
                    '&.Mui-focused fieldset': { borderColor: '#6366F1' }
                  },
                  '& .MuiInputLabel-root': { color: 'white', fontWeight: 600 },
                  '& .MuiSelect-select': { color: 'white', fontWeight: 500 }
                }}>
                  <InputLabel sx={{ color: 'white !important' }}>DTH Provider</InputLabel>
                  <Select 
                    name="dthProvider" 
                    value={formData.dthProvider} 
                    onChange={handleInputChange} 
                    label="DTH Provider"
                    sx={{
                      '& .MuiSvgIcon-root': { color: 'white' }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '& .MuiMenuItem-root': {
                            color: 'white',
                            fontWeight: 500,
                            '&:hover': {
                              background: 'rgba(255,255,255,0.1)'
                            },
                            '&.Mui-selected': {
                              background: 'rgba(255,255,255,0.2)',
                              '&:hover': {
                                background: 'rgba(255,255,255,0.3)'
                              }
                            }
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value="Tata Play">🎬 Tata Play</MenuItem>
                    <MenuItem value="Airtel Digital TV">📡 Airtel Digital TV</MenuItem>
                    <MenuItem value="Dish TV">📺 Dish TV</MenuItem>
                    <MenuItem value="Videocon D2H">🛰️ Videocon D2H</MenuItem>
                    <MenuItem value="Sun Direct">☀️ Sun Direct</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField id="customer-aadhar" name="aadhar" value={formData.aadhar} onChange={handleInputChange} onFocus={() => setFocusedField('aadhar')} onBlur={() => setFocusedField('')} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { border: 'none' } } }} inputProps={{ inputMode: 'numeric' }} InputProps={{ startAdornment: <InputAdornment position="start"><Badge sx={{ mr: 0.5 }} />{!formData.aadhar && focusedField !== 'aadhar' && 'Aadhar'}</InputAdornment> }} />
              <TextField id="customer-notes" name="notes" value={formData.notes} onChange={handleInputChange} onFocus={() => setFocusedField('notes')} onBlur={() => setFocusedField('')} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { border: 'none' } } }} InputProps={{ startAdornment: <InputAdornment position="start"><Badge sx={{ mr: 0.5 }} />{!formData.notes && focusedField !== 'notes' && 'Notes'}</InputAdornment> }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Add />}
                disabled={loading}
                sx={{ bgcolor: '#7038f1ff' }}
              >
                {loading ? 'Saving...' : (editingId ? 'Update Customer' : 'Add Customer')}
              </Button>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={handleResetForm}
                sx={{ bgcolor: '#b95d8d', '&:hover': { bgcolor: '#DC2626' } }}
              >
                Reset Form
              </Button>
            </Box>
            </form>
          </CardContent>
        </Card>

        {/* Modern Customer Table */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #F1F5F9' }}>
          <CardContent sx={{ p: 0 }}>
            {/* Table Header */}
            <Box sx={{ 
              p: 2, 
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              borderRadius: '12px 12px 0 0'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'white', fontSize: '1rem' }}>
                  Customer Records ({filteredCustomers.length})
                </Typography>
                <TextField
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 2, 
                      bgcolor: 'white',
                      '& fieldset': { borderColor: '#8B5CF6' },
                      '&:hover fieldset': { borderColor: '#7C3AED' },
                      '&.Mui-focused fieldset': { borderColor: '#6366F1' }
                    }
                  }}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: '#8B5CF6' }} />
                  }}
                />
              </Box>
            </Box>

            
            {/* Table Content */}
            <Box sx={{ 
              maxHeight: 350, 
              overflowY: 'auto',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { width: '6px', height: '6px' },
              '&::-webkit-scrollbar-track': { background: '#F1F5F9' },
              '&::-webkit-scrollbar-thumb': { background: '#CBD5E1', borderRadius: '3px' }
            }}>
              <table style={{ 
                width: '100%', 
                minWidth: '1000px',
                borderCollapse: 'collapse', 
                fontSize: '0.75rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                  <tr style={{ 
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
                    borderBottom: '2px solid #E2E8F0'
                  }}>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#1E293B', minWidth: '60px' }}>S.No</th>
                    <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '700', color: '#1E293B', minWidth: '120px' }}>Name</th>
                    <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '700', color: '#1E293B', minWidth: '120px' }}>Father/Husband</th>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5CF6', minWidth: '80px' }}>Place</th>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#10B981', minWidth: '100px' }}>Phone</th>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#F59E0B', minWidth: '80px' }}>EB Number</th>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#EF4444', minWidth: '80px' }}>DTH Number</th>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5A2B', minWidth: '100px' }}>DTH Provider</th>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#06B6D4', minWidth: '100px' }}>Aadhar</th>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#6B7280', minWidth: '100px' }}>Notes</th>
                    <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#1E293B', minWidth: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer.customerId} style={{ 
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EEF2FF'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#FFFFFF' : '#F8FAFC'}
                    >
                      <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '600', color: '#1E293B', background: 'rgba(139, 92, 246, 0.1)' }}>{index + 1}</td>
                      <td style={{ padding: '8px 6px', fontWeight: '600', color: '#1E293B' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem' }} src={customer.photo}>
                            <Person sx={{ fontSize: 14 }} />
                          </Avatar>
                          {customer.name}
                        </Box>
                      </td>
                      <td style={{ padding: '8px 6px', color: '#6B7280', fontWeight: '500' }}>{customer.fatherHusbandName || '-'}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '500' }}>{customer.place}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'center', color: '#10B981', fontWeight: '600' }}>
                        {customer.phone ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <Phone sx={{ fontSize: 14, color: '#10B981' }} />
                            {customer.phone}
                          </Box>
                        ) : '-'}
                      </td>
                      <td style={{ padding: '8px 6px', textAlign: 'center', color: '#F59E0B', fontWeight: '500' }}>{customer.ebNumber || '-'}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'center', color: '#EF4444', fontWeight: '500' }}>{customer.dthNumber || '-'}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'center', color: '#8B5A2B', fontWeight: '500' }}>{customer.dthProvider || '-'}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'center', color: '#06B6D4', fontWeight: '500' }}>{customer.aadhar || '-'}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'center', color: '#6B7280', fontWeight: '400', fontSize: '0.7rem' }}>{customer.notes || '-'}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewCustomer(customer)}
                            sx={{ 
                              color: '#10B981', 
                              '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.1)' },
                              width: 28,
                              height: 28
                            }}
                          >
                            <Visibility sx={{ fontSize: '1rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEditCustomer(customer)}
                            sx={{ 
                              color: '#8B5CF6', 
                              '&:hover': { bgcolor: 'rgba(139, 92, 246, 0.1)' },
                              width: 28,
                              height: 28
                            }}
                          >
                            <Edit sx={{ fontSize: '1rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteCustomer(customer.customerId)}
                            sx={{ 
                              color: '#EF4444', 
                              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' },
                              width: 28,
                              height: 28
                            }}
                          >
                            <Delete sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Box>
                      </td>
                    </tr>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan={11} style={{ padding: '32px', textAlign: 'center', color: '#6B7280', fontSize: '0.9rem' }}>
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Customer View Dialog */}
      <Dialog 
        open={Boolean(viewCustomer)} 
        onClose={() => {
          console.log('Closing customer view dialog');
          setViewCustomer(null);
        }} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontWeight: 600,
          fontSize: '1rem',
          py: 1.5,
          mb: 3
        }}>
          <AccountCircle sx={{ fontSize: 28 }} />
          Customer Info
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {viewCustomer && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }} src={viewCustomer.photo}>
                  <Person sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h6" fontWeight={600}>{viewCustomer.name}</Typography>
                <Typography variant="body2" sx={{ color: '#8B5CF6', fontWeight: 500 }}>{viewCustomer.place}</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>Phone</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.phone || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>Father/Husband Name</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.fatherHusbandName || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>EB Number</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.ebNumber || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>DTH Number</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.dthNumber || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>DTH Provider</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.dthProvider || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>Aadhar</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.aadhar || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>Created By</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.createdBy || (userRole === 'admin' ? appConfig.user.name : 'Guest User')}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>Created At</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.createdAt ? new Date(viewCustomer.createdAt).toLocaleString() : 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: '#10B981' }}>Notes</Typography>
                    <Typography variant="body1" fontWeight={500}>{viewCustomer.notes || 'N/A'}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewCustomer(null)} variant="contained" sx={{ bgcolor: '#667EEA' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customer;