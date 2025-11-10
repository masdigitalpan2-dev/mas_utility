import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Avatar, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem, FormControl, InputLabel, Autocomplete, InputAdornment } from '@mui/material';
import { Add, Edit, Delete, Search, Clear, Refresh, Person, Phone, LocationOn, Bolt, Tv, Badge } from '@mui/icons-material';
import MASAnalyticsSidebar from '../components/MASAnalyticsSidebar';

const Customer = ({ onNavigate }) => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [focusedField, setFocusedField] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    fatherHusbandName: '',
    place: '',
    phone: '',
    ebNumber: '',
    dthNumber: '',
    dthProvider: '',
    aadhar: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['phone', 'ebNumber', 'dthNumber', 'aadhar'];
    const textOnlyFields = ['name', 'fatherHusbandName'];
    
    if (numericFields.includes(name)) {
      let numericValue = value.replace(/[^0-9]/g, '');
      if (name === 'aadhar' && numericValue.length > 12) {
        numericValue = numericValue.slice(0, 12);
      }
      setFormData({
        ...formData,
        [name]: numericValue
      });
    } else if (textOnlyFields.includes(name)) {
      const textValue = value.replace(/[^a-zA-Z\s.]/g, '');
      setFormData({
        ...formData,
        [name]: textValue
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
    
    if (formData.phone.length !== 10) {
      if (!window.Swal) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      await window.Swal.fire({
        title: 'Invalid Mobile Number',
        text: 'Mobile number must be exactly 10 digits',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    if (formData.aadhar && formData.aadhar.length !== 12) {
      if (!window.Swal) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      await window.Swal.fire({
        title: 'Invalid Aadhar Number',
        text: 'Aadhar number must be exactly 12 digits',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    if (editingId) {
      setCustomers(customers.map(customer => 
        customer.id === editingId ? { ...customer, ...formData } : customer
      ));
      setEditingId(null);
    } else {
      const newCustomer = {
        id: Date.now(),
        ...formData
      };
      setCustomers([...customers, newCustomer]);
    }
    setFormData({ name: '', fatherHusbandName: '', place: '', phone: '', ebNumber: '', dthNumber: '', dthProvider: '', aadhar: '', remarks: '' });
  };

  const handleEditCustomer = (customer) => {
    setFormData(customer);
    setEditingId(customer.id);
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }
    
    const result = await window.Swal.fire({
      title: 'Delete Customer?',
      text: 'Are you sure you want to delete this customer? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
      setCustomers(customers.filter(customer => customer.id !== id));
      await window.Swal.fire({
        title: 'Deleted!',
        text: 'Customer has been deleted successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', fatherHusbandName: '', place: '', phone: '', ebNumber: '', dthNumber: '', dthProvider: '', aadhar: '', remarks: '' });
    setEditingId(null);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

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
            <Avatar sx={{ bgcolor: '#8B5CF6', width: 28, height: 28, fontSize: '0.7rem' }}>AD</Avatar>
            <Box>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>Admin</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>Manager</Typography>
            </Box>
          </Box>
        </Box>

        {/* Add Customer Form */}
        <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #00d2ff 0%, #ff00a6 100%)' }}>
          <CardContent sx={{ background: 'linear-gradient(135deg, #f093fb 25%, #ee7989ff 100%)', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{editingId ? 'Edit Customer' : 'Add New Customer'}</Typography> 
            <form onSubmit={(e) => { e.preventDefault(); handleAddCustomer(); }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 2 }}>
              <TextField id="customer-name" name="name" value={formData.name} onChange={handleInputChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField('')} size="small" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ mr: 0.5 }} />{!formData.name && focusedField !== 'name' && 'Customer Name'}</InputAdornment> }} />
              <TextField id="father-husband-name" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleInputChange} onFocus={() => setFocusedField('fatherHusbandName')} onBlur={() => setFocusedField('')} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ mr: 0.5 }} />{!formData.fatherHusbandName && focusedField !== 'fatherHusbandName' && 'Father/Husband Name'}</InputAdornment> }} />
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
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }}
                    onFocus={() => setFocusedField('place')} onBlur={() => setFocusedField('')}
                    InputProps={{ ...params.InputProps, startAdornment: <InputAdornment position="start"><LocationOn sx={{ mr: 0.5 }} />{!formData.place && focusedField !== 'place' && 'Place'}</InputAdornment> }}
                  />
                )}
                freeSolo
              />
              <TextField id="customer-mobile" name="phone" value={formData.phone} onChange={handleInputChange} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField('')} size="small" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} inputProps={{ inputMode: 'numeric' }} InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ mr: 0.5 }} />{!formData.phone && focusedField !== 'phone' && 'Mobile'}</InputAdornment> }} />
              <TextField id="eb-number" name="ebNumber" value={formData.ebNumber} onChange={handleInputChange} onFocus={() => setFocusedField('ebNumber')} onBlur={() => setFocusedField('')} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} inputProps={{ inputMode: 'numeric' }} InputProps={{ startAdornment: <InputAdornment position="start"><Bolt sx={{ mr: 0.5 }} />{!formData.ebNumber && focusedField !== 'ebNumber' && 'EB Number'}</InputAdornment> }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField id="dth-number" name="dthNumber" value={formData.dthNumber} onChange={handleInputChange} onFocus={() => setFocusedField('dthNumber')} onBlur={() => setFocusedField('')} size="small" sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} inputProps={{ inputMode: 'numeric' }} InputProps={{ startAdornment: <InputAdornment position="start"><Tv sx={{ mr: 0.5 }} />{!formData.dthNumber && focusedField !== 'dthNumber' && 'DTH Number'}</InputAdornment> }} />
                <FormControl id="dth-provider" size="small" sx={{ 
                  flex: 1, 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2, 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '& fieldset': { borderColor: '#8B5CF6', borderWidth: 2 },
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
              <TextField id="customer-aadhar" name="aadhar" value={formData.aadhar} onChange={handleInputChange} onFocus={() => setFocusedField('aadhar')} onBlur={() => setFocusedField('')} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} inputProps={{ inputMode: 'numeric' }} InputProps={{ startAdornment: <InputAdornment position="start"><Badge sx={{ mr: 0.5 }} />{!formData.aadhar && focusedField !== 'aadhar' && 'Aadhar'}</InputAdornment> }} />
              <TextField id="customer-remarks" name="remarks" value={formData.remarks} onChange={handleInputChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} placeholder="Remarks" />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Add />}
                sx={{ bgcolor: '#7038f1ff' }}
              >
                {editingId ? 'Update Customer' : 'Add Customer'}
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

        {/* Search and Customer List */}
        <Card id="customer-list-card" sx={{ borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Customer List ({filteredCustomers.length})</Typography>
              <TextField
                id="customer-search"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>

            <Box sx={{ 
              maxHeight: 350, 
              overflowY: 'auto',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { width: '6px', height: '6px' },
              '&::-webkit-scrollbar-track': { background: '#4399efff' },
              '&::-webkit-scrollbar-thumb': { background: '#0f74f0ff', borderRadius: '3px' }
            }}>
              <table id="tbl-customer-list" style={{ 
                width: '100%', 
                minWidth: '1200px',
                borderCollapse: 'collapse', 
                fontSize: '0.65rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                  <tr style={{ 
                    background: 'linear-gradient(135deg, #f2d7f2ff 0%, #f7a1f9ff 90%)',
                    borderBottom: '2px solid #E2E8F0',
                    fontFamily: 'Open Sans', fontSize: '0.9rem'
                  }}>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '60px' }}>Name</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '60px' }}>Care Name</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '60px' }}>Place</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#ea2d63ff', minWidth: '60px' }}>Mobile</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#ea2d63ff', minWidth: '60px' }}>EB Number</th>
                    <th style={{ padding: '10px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#0b79afff', minWidth: '50px' }}>DTH Number</th>
                    <th style={{ padding: '8px 6px',  textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#0f99deff', minWidth: '40px' }}>DTH Provider</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '60px' }}>Aadhar</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '60px' }}>Balance</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '100px' }}>Remarks</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '60px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white', fontFamily: 'Century, serif', fontSize: '0.8rem', height: '80px', maxHeight: '100px', overflowY: 'auto' }}>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer.id} style={{ backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.name}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.fatherHusbandName}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.place}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.phone}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.ebNumber}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.dthNumber}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.dthProvider}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.aadhar}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.balance}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{customer.remarks}</td>
                      <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                        <IconButton size="small" color="primary" onClick={() => handleEditCustomer(customer)}>
                          <Edit />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Delete />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan={10} style={{ padding: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
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
    </Box>
  );
};

export default Customer;