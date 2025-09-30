import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Box, Divider, Card, CardContent, Chip, IconButton, Tooltip, Alert, LinearProgress, Avatar, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Calculate, Save, Refresh, Assessment, TrendingUp, AccountBalance, Payment, CurrencyRupee, Analytics, Today, Receipt, Dashboard, Search, MoreVert, FilterList } from '@mui/icons-material';

const DaySales = () => {
  useEffect(() => {
    // Hide header and menu sections to save space
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const menuBar = document.querySelector('.menu-bar');
    const appBar = document.querySelector('.MuiAppBar-root');
    
    if (header) header.style.display = 'none';
    if (nav) nav.style.display = 'none';
    if (menuBar) menuBar.style.display = 'none';
    if (appBar) appBar.style.display = 'none';
    
    return () => {
      // Restore on cleanup
      if (header) header.style.display = '';
      if (nav) nav.style.display = '';
      if (menuBar) menuBar.style.display = '';
      if (appBar) appBar.style.display = '';
    };
  }, []);

  const [formData, setFormData] = useState({
    dateofappl: new Date().toISOString().split('T')[0],
    DigiPay: 0,
    DigiWallet: 0,
    starec: 0,
    sakthi: 0,
    TNEGA: 0,
    SBI: 0,
    indBank: 0,
    ippb: 0,
    IPBC: 0,
    CUB: 0,
    INBA: 0,
    airtel: 0,
    sbi_J: 0,
    PayTM: 0,
    Jio: 0,
    TataPlay: 0,
    PendingNote: 0,
    amt500: 0,
    amt200: 0,
    amt100: 0,
    amt50: 0,
    amt20: 0,
    amt10: 0,
    amtChange: 0,
    totCash: 0,
    totalPending: 0,
    todayExp: 0,
    remarks: ''
  });
  
  const [salesRecords, setSalesRecords] = useState([
    { id: 1, dayDate: '2024-01-15', digipay: 1500, digiwallet: 800, starec: 200, SBI: 300, sbi_J: 100, indBank: 150, INBA: 200, ippb: 50, IPBC: 75, sakthi: 120, CUB: 80, TNEGA: 90, airtel: 60, PayTM: 110, Jio: 70, TataPlay: 85, PendingNote: 25, totCash: 2500, totCum: 5300, totalPending: 500, todayExp: 200, TotalAll: 5100 },
    { id: 2, dayDate: '2024-01-14', digipay: 1200, digiwallet: 600, starec: 150, SBI: 250, sbi_J: 80, indBank: 120, INBA: 160, ippb: 40, IPBC: 60, sakthi: 100, CUB: 65, TNEGA: 75, airtel: 50, PayTM: 90, Jio: 55, TataPlay: 70, PendingNote: 20, totCash: 2000, totCum: 4200, totalPending: 300, todayExp: 150, TotalAll: 4050 }
  ]);

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
    paymentType: 'all'
  });

  const [filteredRecords, setFilteredRecords] = useState(salesRecords);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
  };

  const calculateCash = () => {
    const { amt500, amt200, amt100, amt50, amt20, amt10, amtChange } = formData;
    const totCash = (amt500 * 500) + (amt200 * 200) + (amt100 * 100) + (amt50 * 50) + (amt20 * 20) + (amt10 * 10) + amtChange;
    setFormData(prev => ({ ...prev, totCash }));
  };

  const handleSubmit = () => {
    const newRecord = {
      id: Date.now(),
      dayDate: formData.dateofappl,
      digipay: formData.DigiPay,
      digiwallet: formData.DigiWallet,
      starec: formData.starec,
      SBI: formData.SBI,
      sbi_J: formData.sbi_J,
      indBank: formData.indBank,
      INBA: formData.INBA,
      ippb: formData.ippb,
      IPBC: formData.IPBC,
      sakthi: formData.sakthi,
      CUB: formData.CUB,
      TNEGA: formData.TNEGA,
      airtel: formData.airtel,
      PayTM: formData.PayTM,
      Jio: formData.Jio,
      TataPlay: formData.TataPlay,
      PendingNote: formData.PendingNote,
      totCash: formData.totCash,
      totCum: formData.DigiPay + formData.DigiWallet + formData.starec + formData.SBI + formData.indBank + formData.INBA + formData.airtel + formData.PayTM + formData.Jio + formData.TataPlay + formData.ippb + formData.IPBC + formData.CUB + formData.sakthi + formData.TNEGA + formData.sbi_J,
      totalPending: formData.totalPending + formData.PendingNote,
      todayExp: formData.todayExp,
      TotalAll: 0
    };
    newRecord.TotalAll = newRecord.totCum - newRecord.todayExp;
    setSalesRecords([newRecord, ...salesRecords]);
    alert('Day sale record saved successfully!');
  };

  const resetForm = () => {
    setFormData({
      dateofappl: new Date().toISOString().split('T')[0],
      DigiPay: 0, DigiWallet: 0, starec: 0, sakthi: 0, TNEGA: 0, SBI: 0, indBank: 0, ippb: 0, IPBC: 0, CUB: 0,
      INBA: 0, airtel: 0, sbi_J: 0, PayTM: 0, Jio: 0, TataPlay: 0, PendingNote: 0,
      amt500: 0, amt200: 0, amt100: 0, amt50: 0, amt20: 0, amt10: 0, amtChange: 0, totCash: 0,
      totalPending: 0, todayExp: 0, remarks: ''
    });
  };

  // Filter records based on filters
  useEffect(() => {
    let filtered = salesRecords;
    
    if (filters.dateFrom) {
      filtered = filtered.filter(record => record.dayDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(record => record.dayDate <= filters.dateTo);
    }
    if (filters.minAmount) {
      filtered = filtered.filter(record => record.TotalAll >= parseInt(filters.minAmount));
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(record => record.TotalAll <= parseInt(filters.maxAmount));
    }
    if (filters.paymentType === 'digital') {
      filtered = filtered.filter(record => record.totCum > 0);
    } else if (filters.paymentType === 'cash') {
      filtered = filtered.filter(record => record.totCash > 0);
    }
    
    setFilteredRecords(filtered);
  }, [filters, salesRecords]);

  const InputField = ({ label, id, value, onChange, width = '80px' }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.7rem' }}>
        {label}
      </Typography>
      <TextField
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        size="small"
        type="number"
        variant="outlined"
        sx={{ 
          width: width,
          '& .MuiOutlinedInput-root': {
            height: '40px',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            '& fieldset': { borderColor: '#8B5CF6', borderWidth: '1px' },
            '&:hover fieldset': { borderColor: '#7C3AED' },
            '&.Mui-focused fieldset': { borderColor: '#8B5CF6', borderWidth: '2px' }
          },
          '& .MuiOutlinedInput-input': {
            textAlign: 'center',
            fontWeight: 'medium'
          }
        }}
      />
    </Box>
  );

  const totalDigitalPayments = formData.DigiPay + formData.DigiWallet + formData.starec + formData.SBI + formData.indBank + formData.INBA + formData.airtel + formData.PayTM + formData.Jio + formData.TataPlay + formData.ippb + formData.IPBC + formData.CUB + formData.sakthi + formData.TNEGA + formData.sbi_J;
  const grandTotal = totalDigitalPayments + formData.totCash - formData.todayExp;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#FAFAFA' }}>
      {/* Sidebar */}
      <Box 
        sx={{ 
          width: sidebarOpen ? 240 : 60, 
          bgcolor: 'white', 
          borderRight: '1px solid #E5E7EB',
          p: sidebarOpen ? 2 : 1,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'width 0.3s ease'
        }}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        {sidebarOpen && (
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B5CF6', mb: 3 }}>
            MAS Analytics
          </Typography>
        )}
        
        {[
          { icon: <Dashboard />, label: 'Dashboard', active: true },
          { icon: <Analytics />, label: 'Day Sales' },
          { icon: <AccountBalance />, label: 'Payments' },
          { icon: <Receipt />, label: 'Reports' }
        ].map((item, index) => (
          <Box key={index} sx={{
            display: 'flex',
            alignItems: 'center',
            gap: sidebarOpen ? 2 : 0,
            p: 1.5,
            borderRadius: 2,
            mb: 1,
            cursor: 'pointer',
            bgcolor: item.active ? '#F3F4F6' : 'transparent',
            color: item.active ? '#8B5CF6' : '#6B7280',
            '&:hover': { bgcolor: '#F9FAFB' },
            justifyContent: sidebarOpen ? 'flex-start' : 'center'
          }}>
            {item.icon}
            {sidebarOpen && (
              <Typography variant="body2" fontWeight={item.active ? 600 : 400}>
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 1 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#1F2937' }}>
            MAS Day Sale Dashboard
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#8B5CF6', width: 28, height: 28, fontSize: '0.7rem' }}>AD</Avatar>
            <Box>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>Admin</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>Manager</Typography>
            </Box>
          </Box>
        </Box>

        {/* Modern Stats Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, mb: 1.5 }}>
          {[
            { title: 'Digital Payments', value: `₹${totalDigitalPayments.toLocaleString()}`, change: '+12%', color: '#8B5CF6' },
            { title: 'Cash Total', value: `₹${formData.totCash.toLocaleString()}`, change: '+5%', color: '#06B6D4' },
            { title: "Today's Expense", value: `₹${formData.todayExp.toLocaleString()}`, change: '+8%', color: '#F59E0B' },
            { title: 'Grand Total', value: `₹${grandTotal.toLocaleString()}`, change: '+15%', color: '#10B981' }
          ].map((stat, index) => (
            <Card key={index} sx={{ 
              borderRadius: 4, 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #F3F4F6'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: stat.color, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Chip 
                  label={stat.change} 
                  size="small" 
                  sx={{ 
                    bgcolor: `${stat.color}20`, 
                    color: stat.color,
                    fontWeight: 600
                  }} 
                />
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 0.5, mb: 1 }}>
          {/* Input Form */}
          <Card sx={{ 
            borderRadius: 4, 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #F3F4F6'
          }}>
            <CardContent sx={{ p: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5, fontSize: '0.9rem' }}>MAS Digital Payment Services</Typography>
              
              {/* Banking Services */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ mb: 1, fontWeight: 'bold', color: '#8B5CF6', display: 'block', fontSize: '0.7rem' }}>Banking Services</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={2}><InputField label="DigiPay" id="DigiPay" value={formData.DigiPay} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="DigiWallet" id="DigiWallet" value={formData.DigiWallet} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="StarEC" id="starec" value={formData.starec} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="SBI" id="SBI" value={formData.SBI} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="SBI (J)" id="sbi_J" value={formData.sbi_J} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="INB (K)" id="indBank" value={formData.indBank} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="INB (A)" id="INBA" value={formData.INBA} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="IPPB" id="ippb" value={formData.ippb} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="IP BC" id="IPBC" value={formData.IPBC} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="Canara" id="sakthi" value={formData.sakthi} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="City" id="CUB" value={formData.CUB} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="E Sevai" id="TNEGA" value={formData.TNEGA} onChange={handleInputChange} /></Grid>
                </Grid>
              </Box>
              
              {/* Digital Services */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ mb: 1, fontWeight: 'bold', color: '#06B6D4', display: 'block', fontSize: '0.7rem' }}>Digital & Telecom</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={2}><InputField label="AirTel" id="airtel" value={formData.airtel} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="PayTM" id="PayTM" value={formData.PayTM} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="JIO" id="Jio" value={formData.Jio} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="TataPlay" id="TataPlay" value={formData.TataPlay} onChange={handleInputChange} /></Grid>
                  <Grid item xs={2}><InputField label="Pending" id="PendingNote" value={formData.PendingNote} onChange={handleInputChange} /></Grid>
                </Grid>
              </Box>

              {/* Date and Remarks */}
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Date"
                    type="date"
                    value={formData.dateofappl}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateofappl: e.target.value }))}
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label="Remarks"
                    value={formData.remarks}
                    onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                    fullWidth
                    size="small"
                    placeholder="Add notes..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Cash Management */}
          <Card sx={{ 
            borderRadius: 4, 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #F3F4F6'
          }}>
            <CardContent sx={{ p: 1 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, fontSize: '0.85rem' }}>Cash Management</Typography>
              
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={1}>
                  {[
                    { label: '₹500', id: 'amt500', color: '#8B5CF6' },
                    { label: '₹200', id: 'amt200', color: '#06B6D4' },
                    { label: '₹100', id: 'amt100', color: '#10B981' },
                    { label: '₹50', id: 'amt50', color: '#F59E0B' },
                    { label: '₹20', id: 'amt20', color: '#EF4444' },
                    { label: '₹10', id: 'amt10', color: '#8B5A2B' }
                  ].map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ textAlign: 'center', p: 0.5, bgcolor: '#FAFAFA', borderRadius: 1 }}>
                        <Chip label={item.label} size="small" sx={{ bgcolor: item.color, color: 'white', mb: 0.5, fontSize: '0.6rem', height: '18px' }} />
                        <TextField
                          value={formData[item.id]}
                          onChange={(e) => handleInputChange(item.id, e.target.value)}
                          size="small"
                          type="number"
                          sx={{ 
                            width: '50px',
                            '& .MuiOutlinedInput-root': { height: '28px', borderRadius: 1 },
                            '& .MuiOutlinedInput-input': { textAlign: 'center', fontSize: '0.7rem' }
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Change Amount</Typography>
                  <TextField
                    value={formData.amtChange}
                    onChange={(e) => handleInputChange('amtChange', e.target.value)}
                    size="small"
                    type="number"
                    sx={{ width: '100px', '& .MuiOutlinedInput-input': { textAlign: 'center' } }}
                  />
                </Box>
              </Box>
              
              <Button 
                variant="contained" 
                startIcon={<Calculate />} 
                onClick={calculateCash}
                fullWidth
                sx={{ mb: 2, borderRadius: 2, bgcolor: '#8B5CF6' }}
              >
                Calculate
              </Button>
              
              <Box sx={{ p: 2, bgcolor: '#8B5CF620', borderRadius: 2, textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#8B5CF6' }}>
                  ₹{formData.totCash.toLocaleString()}
                </Typography>
                <Typography variant="caption">Total Cash</Typography>
              </Box>
              
              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Pending"
                    value={formData.totalPending}
                    onChange={(e) => handleInputChange('totalPending', e.target.value)}
                    size="small"
                    type="number"
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-input': { textAlign: 'center' } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Expense"
                    value={formData.todayExp}
                    onChange={(e) => handleInputChange('todayExp', e.target.value)}
                    size="small"
                    type="number"
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-input': { textAlign: 'center' } }}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  startIcon={<Save />} 
                  onClick={handleSubmit}
                  sx={{ flex: 1, borderRadius: 2, bgcolor: '#10B981' }}
                >
                  Save
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Refresh />} 
                  onClick={resetForm}
                  sx={{ flex: 1, borderRadius: 2 }}
                >
                  Reset
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Records Table with Filters */}
        <Card sx={{ 
          borderRadius: 4, 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #F3F4F6'
        }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Sales Records ({filteredRecords.length})</Typography>
                <FilterList sx={{ color: '#8B5CF6' }} />
              </Box>
              
              {/* Custom Filters */}
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    label="From Date"
                    type="date"
                    size="small"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="To Date"
                    type="date"
                    size="small"
                    value={filters.dateTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Min Amount"
                    type="number"
                    size="small"
                    value={filters.minAmount}
                    onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Max Amount"
                    type="number"
                    size="small"
                    value={filters.maxAmount}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Payment Type</InputLabel>
                    <Select
                      value={filters.paymentType}
                      onChange={(e) => setFilters(prev => ({ ...prev, paymentType: e.target.value }))}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="digital">Digital Only</MenuItem>
                      <MenuItem value="cash">Cash Only</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    onClick={() => setFilters({ dateFrom: '', dateTo: '', minAmount: '', maxAmount: '', paymentType: 'all' })}
                    sx={{ bgcolor: '#EF4444', borderRadius: 2, height: '40px' }}
                    fullWidth
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Box>
            
            <TableContainer sx={{ maxHeight: 400, overflowX: 'auto' }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#8B5CF6', color: 'white', fontWeight: 'bold', fontSize: '0.75rem' } }}>
                    <TableCell sx={{ minWidth: 100 }}>Date</TableCell>
                    <TableCell align="center" sx={{ minWidth: 80 }}>DigiPay</TableCell>
                    <TableCell align="center" sx={{ minWidth: 80 }}>DigiWallet</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>StarEC</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>SBI</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>SBI(J)</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>INB(K)</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>INB(A)</TableCell>
                    <TableCell align="center" sx={{ minWidth: 60 }}>IPPB</TableCell>
                    <TableCell align="center" sx={{ minWidth: 60 }}>IPBC</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>Canara</TableCell>
                    <TableCell align="center" sx={{ minWidth: 60 }}>City</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>ESevai</TableCell>
                    <TableCell align="center" sx={{ minWidth: 60 }}>AirTel</TableCell>
                    <TableCell align="center" sx={{ minWidth: 60 }}>PayTM</TableCell>
                    <TableCell align="center" sx={{ minWidth: 50 }}>JIO</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>TataPlay</TableCell>
                    <TableCell align="center" sx={{ minWidth: 70 }}>Pending</TableCell>
                    <TableCell align="center" sx={{ minWidth: 80 }}>Cash</TableCell>
                    <TableCell align="center" sx={{ minWidth: 100 }}>Digital Total</TableCell>
                    <TableCell align="center" sx={{ minWidth: 80 }}>Expense</TableCell>
                    <TableCell align="center" sx={{ minWidth: 100 }}>Final Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecords.map((record, index) => (
                    <TableRow key={record.id} hover sx={{ bgcolor: index % 2 === 0 ? '#FAFAFA' : 'white' }}>
                      <TableCell sx={{ fontSize: '0.75rem' }}>{record.dayDate}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.digipay || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.digiwallet || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.starec || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.SBI || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.sbi_J || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.indBank || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.INBA || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.ippb || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.IPBC || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.sakthi || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.CUB || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.TNEGA || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.airtel || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.PayTM || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.Jio || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.TataPlay || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem' }}>₹{(record.PendingNote || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem', fontWeight: 'medium' }}>₹{(record.totCash || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#8B5CF6' }}>₹{(record.totCum || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem', color: '#EF4444' }}>₹{(record.todayExp || 0).toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#10B981' }}>₹{(record.TotalAll || 0).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  {filteredRecords.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={22} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          No records found matching the filters
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DaySales;