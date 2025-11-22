import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Chip, MenuItem, InputAdornment, CircularProgress, Avatar, Autocomplete, Popover, List, ListItem, ListItemText } from '@mui/material';
import { Add, Edit, Delete, Payment, Refresh, Person, Search, Assessment, Palette, FilterList } from '@mui/icons-material';
import MASAnalyticsSidebar from '../components/MASAnalyticsSidebar';
import appConfig from '../config/appConfig';
import axios from 'axios';

const PendingPayments = ({ onNavigate }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchPayments();
    fetchCustomers();
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user') || 'guest';
    setUserRole(user);
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:52550/api/customer');
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  const getCustomerBalance = (customerName) => {
    const customerPayments = payments.filter(p => p.customer === customerName);
    const totalCredit = customerPayments.filter(p => (p.paymentType || 'credit') === 'credit').reduce((sum, p) => sum + (parseFloat(p.amount || 0) + parseFloat(p.commission || 0)), 0);
    const totalDebit = customerPayments.filter(p => (p.paymentType || 'credit') === 'debit').reduce((sum, p) => sum + (parseFloat(p.amount || 0) + parseFloat(p.commission || 0)), 0);
    return totalCredit - totalDebit;
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:52550/api/payments');
      setPayments(response.data || []);
    } catch (error) {
      console.error('Error fetching payments from API, using localStorage:', error);
      const storedPayments = localStorage.getItem('payments');
      if (storedPayments) {
        setPayments(JSON.parse(storedPayments));
      }
    }
  };
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ customerId: '', customer: '', service: '', amount: '', commission: '', dueDate: new Date().toISOString().split('T')[0], status: 'Pending', paymentType: 'credit', remarks: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [showRowColors, setShowRowColors] = useState(false);
  const [customerFilter, setCustomerFilter] = useState('All');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const formatNumber = (value) => {
    if (!value) return '';
    return parseFloat(value.toString().replace(/,/g, '')).toLocaleString();
  };

  const parseNumber = (value) => {
    return value.toString().replace(/,/g, '');
  };

  const handleSubmit = async () => {
    if (!formData.customerId || !formData.service || !formData.amount) {
      if (!window.Swal) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      await window.Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in Customer Name, Service, and Amount fields',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    const totalAmount = Math.round(parseFloat(formData.amount || 0) + parseFloat(formData.commission || 0));
    if (totalAmount === 0) {
      if (!window.Swal) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      await window.Swal.fire({
        title: 'Invalid Amount',
        text: 'Total amount cannot be zero. Please enter a valid amount.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    setLoading(true);
    try {
      if (editId) {
        try {
          await axios.put(`http://localhost:52550/api/payments/${editId}`, { ...formData, amount: parseFloat(formData.amount) });
          const updatedPayments = payments.map(p => p.id === editId ? { ...formData, id: editId, amount: parseFloat(formData.amount) } : p);
          setPayments(updatedPayments);
        } catch (error) {
          console.error('API error, using localStorage:', error);
          const updatedPayments = payments.map(p => p.id === editId ? { ...formData, id: editId, amount: parseFloat(formData.amount) } : p);
          setPayments(updatedPayments);
          localStorage.setItem('payments', JSON.stringify(updatedPayments));
        }
        if (!window.Swal) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        await window.Swal.fire({
          title: 'Updated!',
          text: 'Payment has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        try {
          const response = await axios.post('http://localhost:52550/api/payments', { ...formData, amount: parseFloat(formData.amount) });
          setPayments([...payments, response.data]);
        } catch (error) {
          console.error('API error, using localStorage:', error);
          const newPayment = { ...formData, id: Date.now(), amount: parseFloat(formData.amount) };
          const updatedPayments = [...payments, newPayment];
          setPayments(updatedPayments);
          localStorage.setItem('payments', JSON.stringify(updatedPayments));
        }
        if (!window.Swal) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        await window.Swal.fire({
          title: 'Added!',
          text: 'Payment has been added successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error saving payment:', error);
    }
    setLoading(false);
    setFormData({ customerId: '', customer: '', service: '', amount: '', commission: '', dueDate: new Date().toISOString().split('T')[0], status: 'Pending', paymentType: 'credit', remarks: '' });
    setEditId(null);
  };

  const handleEdit = (payment) => {
    setFormData(payment);
    setEditId(payment.id);
  };

  const handleDelete = async (id) => {
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }
    
    const result = await window.Swal.fire({
      title: 'Delete Payment?',
      text: 'Are you sure you want to delete this payment? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
      try {
        try {
          await axios.delete(`http://localhost:52550/api/payments/${id}`);
          setPayments(payments.filter(p => p.id !== id));
        } catch (error) {
          console.error('API error, using localStorage:', error);
          const updatedPayments = payments.filter(p => p.id !== id);
          setPayments(updatedPayments);
          localStorage.setItem('payments', JSON.stringify(updatedPayments));
        }
        await window.Swal.fire({
          title: 'Deleted!',
          text: 'Payment has been deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  const markAsPaid = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
  };

  const totalPending = payments.filter(p => p.status !== 'Paid').reduce((sum, p) => sum + p.amount, 0);

  console.log('Total payments:', payments.length);
  console.log('Customer filter value:', `"${customerFilter}"`);
  
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = statusFilter === 'All' || (payment.paymentType || 'credit') === statusFilter;
    const matchesCustomer = customerFilter === 'All' || payment.customer.toLowerCase().trim() === customerFilter.toLowerCase().trim();
    const matchesDateRange = (!fromDate || payment.dueDate >= fromDate) && (!toDate || payment.dueDate <= toDate);
    
    // Debug logging
    if (customerFilter !== 'All') {
      console.log('Customer Filter:', `"${customerFilter}"`);
      console.log('Payment Customer:', `"${payment.customer}"`);
      console.log('Filter Lower:', `"${customerFilter.toLowerCase().trim()}"`);
      console.log('Payment Lower:', `"${payment.customer.toLowerCase().trim()}"`);
      console.log('Matches Customer:', matchesCustomer);
      console.log('---');
    }
    
    return matchesSearch && matchesType && matchesCustomer && matchesDateRange;
  }).sort((a, b) => b.id - a.id);

  const uniqueCustomers = [...new Set(payments.map(p => p.customer))].sort();

  const totalCredit = Math.round(filteredPayments.filter(p => (p.paymentType || 'credit') === 'credit').reduce((sum, p) => sum + (parseFloat(p.amount || 0) + parseFloat(p.commission || 0)), 0));
  const totalDebit = Math.round(filteredPayments.filter(p => (p.paymentType || 'credit') === 'debit').reduce((sum, p) => sum + (parseFloat(p.amount || 0) + parseFloat(p.commission || 0)), 0));
  const netAmount = totalCredit - totalDebit;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FAFAFA', overflow: 'hidden' }}>
      <MASAnalyticsSidebar activeItem="Payments" onNavigate={onNavigate} />
      
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#1F2937' }}>
            Pending Payments
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
      
      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
        <Card sx={{ borderRadius: 2, boxShadow: 2, background: 'linear-gradient(135deg, #52c37bff 0%, #16A34A 100%)' }}>
          <CardContent sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>₹{totalCredit.toLocaleString()}</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>Total Credit</Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 2, boxShadow: 2, background: 'linear-gradient(135deg, #f07c7cff 0%, #f11212ff 100%)' }}>
          <CardContent sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>₹{totalDebit.toLocaleString()}</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>Total Debit</Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 2, boxShadow: 2, background: 'linear-gradient(135deg, #9b79eaff 0%, #6012e7ff 100%)' }}>
          <CardContent sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>₹{netAmount.toLocaleString()}</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>Net Amount</Typography>
          </CardContent>
        </Card>
      </Box>
      
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #00d2ff 0%, #ff00a6 100%)' }}>
        <CardContent sx={{ background: 'linear-gradient(135deg, #8fa0eeff 20%, #9278adff 100%)', borderRadius: 2, pt: 1.5, px: 1.5, pb: 0.5 }}>
          {/*}
          <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
            {editId ? 'Edit Payment' : 'Add Payment'}
          </Typography>
          */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2, mb: 2 }}>
            <Autocomplete
              key={`${formData.customerId}-${editId}`}
              id="payment-customer-input"
              options={customers}
              getOptionLabel={(option) => option.name || ''}
              getOptionKey={(option) => option.customerId || option.name}
              value={customers.find(c => c.customerId === formData.customerId) || null}
              onChange={(event, newValue) => {
                setFormData({...formData, customerId: newValue ? newValue.customerId : '', customer: newValue ? newValue.name : ''});
                setCustomerFilter(newValue ? newValue.name : 'All');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="customer"
                  placeholder="Customer Name"
                  size="small"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' }
                    }
                  }}
                  onFocus={() => setFocusedField('customer')}
                  onBlur={() => setFocusedField('')}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ mr: 0.5 }} />
                      </InputAdornment>
                    )
                  }}
                />
              )}
              renderOption={(props, option) => {
                const balance = getCustomerBalance(option.name);
                return (
                  <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', p: 1, minHeight: 40 }}>
                    <Box sx={{ width: '150px', overflow: 'hidden' }}>
                      <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {option.name}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100px', overflow: 'hidden', ml: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {option.place}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'right', ml: 1 }}>
                      <Typography variant="caption" sx={{ color: balance >= 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                        ₹{Math.abs(balance).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                );
              }}
              freeSolo
            />
            <TextField
              id="payment-service-input"
              select
              label="Service"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              required
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' }
                }
              }}
            >
              <MenuItem value="TN eSevai">🏛️ TN eSevai</MenuItem>
              <MenuItem value="Aadhar">🆔 Aadhar</MenuItem>
              <MenuItem value="PAN CARD">💳 PAN Card</MenuItem>
              <MenuItem value="RTO">🚗 RTO</MenuItem>
              <MenuItem value="Insurance">🛡️ Insurance</MenuItem>
              <MenuItem value="IRCTC">🚂 IRCTC</MenuItem>
              <MenuItem value="TNEB">⚡ TNEB</MenuItem>
              <MenuItem value="CM Petition">📋 CM Petition</MenuItem>
              <MenuItem value="Voter">🗳️ Voter</MenuItem>
              <MenuItem value="Xerox">📄 Xerox</MenuItem>
              <MenuItem value="Recharge">📱 Recharge</MenuItem>
              <MenuItem value="Online Apply">💻 Online Apply</MenuItem>
              <MenuItem value="Money Transfer">💰 Money Transfer</MenuItem>
              <MenuItem value="Debt">💸 Debt</MenuItem>
              <MenuItem value="Cash">💵 Cash</MenuItem>
              <MenuItem value="Return">↩️ Return</MenuItem>
              <MenuItem value="Other">❓ Other</MenuItem>
            </TextField>
            <TextField
              id="payment-duedate-input"
              type="date"
              label="Payment Date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              InputLabelProps={{ shrink: true }}
              size="small"
              inputProps={{ 
                onClick: (e) => e.target.showPicker && e.target.showPicker()
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  cursor: 'pointer'
                }
              }}
            />
            <Box 
              onClick={() => {
                const newType = formData.paymentType === 'credit' ? 'debit' : 'credit';
                const newService = newType === 'debit' ? 'Return' : (formData.service === 'Return' ? '' : formData.service);
                setFormData({...formData, paymentType: newType, service: newService});
              }}
              sx={{
                position: 'relative',
                width: '100%',
                height: 40,
                backgroundColor: '#E5E7EB',
                borderRadius: 20,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                transition: 'all 0.3s ease',
                border: '2px solid #D1D5DB'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 'calc(50% - 2px)',
                  height: 'calc(100% - 4px)',
                  backgroundColor: formData.paymentType === 'credit' ? '#22C55E' : '#EF4444',
                  borderRadius: 16,
                  left: formData.paymentType === 'credit' ? '2px' : 'calc(50% + 2px)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.65rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {formData.paymentType === 'credit' ? '💰 CREDIT' : '↩️ DEBIT'}
              </Box>
              <Box sx={{ 
                position: 'absolute', 
                left: '8px', 
                color: formData.paymentType === 'credit' ? 'white' : '#6B7280',
                fontWeight: 'bold',
                fontSize: '0.65rem',
                zIndex: formData.paymentType === 'credit' ? 2 : 1
              }}>
                FROM MAS
              </Box>
              <Box sx={{ 
                position: 'absolute', 
                right: '8px', 
                color: formData.paymentType === 'debit' ? 'white' : '#6B7280',
                fontWeight: 'bold',
                fontSize: '0.65rem',
                zIndex: formData.paymentType === 'debit' ? 2 : 1
              }}>
                RETURN
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: 2, mb: 2 }}>
            <TextField
              id="payment-amount-input"
              label="Amount (₹)"
              value={focusedField === 'amount' ? formData.amount : formatNumber(formData.amount)}
              onChange={(e) => setFormData({...formData, amount: parseNumber(e.target.value)})}
              onFocus={() => setFocusedField('amount')}
              onBlur={() => setFocusedField('')}
              size="small"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' }
                }
              }}
            />
            <TextField
              id="payment-commission-input"
              label="Commission (₹)"
              value={focusedField === 'commission' ? formData.commission : formatNumber(formData.commission)}
              onChange={(e) => setFormData({...formData, commission: parseNumber(e.target.value)})}
              onFocus={() => setFocusedField('commission')}
              onBlur={() => setFocusedField('')}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' }
                }
              }}
            />
            <TextField
              id="payment-total-input"
              label="Total Amount (₹)"
              value={Math.round(parseFloat(formData.amount || 0) + parseFloat(formData.commission || 0)).toLocaleString()}
              InputProps={{ readOnly: true }}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F3F4F6',
                  borderRadius: 2,
                  '& fieldset': { borderColor: '#6D28D9' },
                  '& input': { fontWeight: 'bold', color: '#059669' }
                }
              }}
            />
            <TextField
              id="payment-remarks-input"
              label="Remarks"
              multiline
              rows={1}
              value={formData.remarks}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' }
                }
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
            <Button 
              onClick={handleSubmit}
              variant="contained"
              sx={{ 
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                textTransform: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                width: 250,
                height: 48,
                '&:hover': { 
                  background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {editId ? '✏️ Update Payment' : '+ Add Payment'}
            </Button>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={() => {
                setFormData({ customerId: '', customer: '', service: '', amount: '', commission: '', dueDate: new Date().toISOString().split('T')[0], status: 'Pending', paymentType: 'credit', remarks: '' });
                setEditId(null);
                setCustomerFilter('All');
              }}
              sx={{ bgcolor: '#b95d8d', '&:hover': { bgcolor: '#DC2626' }, width: 250, height: 48 }}
            >
              Reset Form
            </Button>
          </Box>
        </CardContent>
      </Card>

 

      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #F1F5F9' }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ 
            p: 2, 
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            borderRadius: '12px 12px 0 0'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'white', fontSize: '1rem' }}>
                  Payment Records ({filteredPayments.length})
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', fontWeight: 500 }}>From:</Typography>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '0.7rem',
                      outline: 'none'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', fontWeight: 500 }}>To:</Typography>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '0.7rem',
                      outline: 'none'
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => { setFromDate(''); setToDate(''); }}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.65rem',
                    minWidth: 'auto',
                    px: 1,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  Clear
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                  onClick={() => setShowRowColors(!showRowColors)}
                  sx={{
                    color: showRowColors ? 'white' : '#6B7280',
                    bgcolor: showRowColors ? '#10B981' : '#F3F4F6',
                    '&:hover': { bgcolor: showRowColors ? '#059669' : '#E5E7EB' },
                    borderRadius: 2,
                    width: 40,
                    height: 40,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Palette sx={{ fontSize: '1.2rem' }} />
                </IconButton>
                <TextField
                  placeholder="Search payments..."
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
                <TextField
                  select
                  label="Type"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  size="small"
                  sx={{ 
                    minWidth: 120,
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' }
                    }
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="credit">💰 Credit</MenuItem>
                  <MenuItem value="debit">↩️ Debit</MenuItem>
                </TextField>

              </Box>
            </Box>
          </Box>
         
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
                  <th style={{ padding: '8px 6px', textAlign: 'left', fontWeight: '700', color: '#1E293B', minWidth: '120px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      Customer
                      <FilterList 
                        onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                        sx={{ 
                          fontSize: '0.8rem', 
                          color: customerFilter !== 'All' ? '#8B5CF6' : '#9CA3AF',
                          cursor: 'pointer',
                          '&:hover': { color: '#8B5CF6' }
                        }} 
                      />
                    </Box>
                  </th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5CF6', minWidth: '100px' }}>Service</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#EF4444', minWidth: '80px' }}>Total</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5A2B', minWidth: '80px' }}>Type</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#06B6D4', minWidth: '100px' }}>Date</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#9333EA', minWidth: '80px' }}>Pending</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#6B7280', minWidth: '120px' }}>Remarks</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '700', color: '#1E293B', minWidth: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => {
                  const isCredit = (payment.paymentType || 'credit') === 'credit';
                  const baseColor = showRowColors ? (isCredit ? '#F0F9FF' : '#FFF7ED') : 'transparent';
                  const hoverColor = showRowColors ? (isCredit ? '#E0F2FE' : '#FED7AA') : '#F9FAFB';
                  
                  // Calculate running balance up to current record for this customer
                  const customerPaymentsUpToCurrent = filteredPayments.slice(0, index + 1).filter(p => p.customer === payment.customer);
                  const totalCredit = customerPaymentsUpToCurrent.filter(p => (p.paymentType || 'credit') === 'credit').reduce((sum, p) => sum + (parseFloat(p.amount || 0) + parseFloat(p.commission || 0)), 0);
                  const totalDebit = customerPaymentsUpToCurrent.filter(p => (p.paymentType || 'credit') === 'debit').reduce((sum, p) => sum + (parseFloat(p.amount || 0) + parseFloat(p.commission || 0)), 0);
                  const pendingAmount = Math.round(totalCredit - totalDebit);
                  
                  return (
                  <tr key={payment.id} style={{ 
                    backgroundColor: baseColor,
                    borderBottom: '1px solid #E5E7EB',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = baseColor}
                  >
                    <td style={{ padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#1E293B' }}>{index + 1}</td>
                    <td style={{ padding: '4px 6px', fontWeight: '600', color: '#1E293B' }}>{payment.customer}</td>
                    <td style={{ padding: '4px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '500' }}>{payment.service}</td>
                    <td style={{ padding: '4px 6px', textAlign: 'center', color: '#ed0d0dff', fontWeight: '600' }}>₹{Math.round(parseFloat(payment.amount || 0) + parseFloat(payment.commission || 0)).toLocaleString()}</td>
                    <td style={{ padding: '4px 6px', textAlign: 'center' }}>
                      <Chip 
                        label={payment.paymentType || 'credit'} 
                        color={payment.paymentType === 'debit' ? 'error' : 'success'} 
                        size="small"
                        sx={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '0.65rem', height: '20px' }}
                      />
                    </td>
                    <td style={{ padding: '4px 6px', textAlign: 'center', color: '#06B6D4', fontWeight: '500' }}>
                      {payment.dueDate} {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '4px 6px', textAlign: 'center', color: pendingAmount >= 0 ? '#10B981' : '#EF4444', fontWeight: '600' }}>₹{Math.abs(pendingAmount).toLocaleString()}</td>
                    <td style={{ padding: '4px 6px', textAlign: 'center', color: '#6B7280', fontWeight: '400', fontSize: '0.7rem' }}>{payment.remarks || '-'}</td>
                    <td style={{ padding: '4px 6px', textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 0.25, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(payment)}
                          sx={{ 
                            color: '#8B5CF6', 
                            '&:hover': { bgcolor: 'rgba(139, 92, 246, 0.1)' },
                            width: 24,
                            height: 24
                          }}
                        >
                          <Edit sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(payment.id)}
                          sx={{ 
                            color: '#EF4444', 
                            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' },
                            width: 24,
                            height: 24
                          }}
                        >
                          <Delete sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                      </Box>
                    </td>
                  </tr>
                  );
                })}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding: '32px', textAlign: 'center', color: '#6B7280', fontSize: '0.9rem' }}>
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
      
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, minWidth: 250, maxHeight: 300, overflow: 'auto' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Filter by Customer</Typography>
          <List dense>
            <ListItem 
              button 
              onClick={() => {
                setCustomerFilter('All');
                setFilterAnchorEl(null);
              }}
              sx={{ 
                bgcolor: customerFilter === 'All' ? '#F3F4F6' : 'transparent',
                borderRadius: 1,
                mb: 0.5
              }}
            >
              <ListItemText primary="All Customers" />
            </ListItem>
            {uniqueCustomers.map(customerName => {
              const customer = customers.find(c => c.name === customerName);
              return (
                <ListItem 
                  key={customerName}
                  button 
                  onClick={() => {
                    setCustomerFilter(customerName);
                    setFilterAnchorEl(null);
                  }}
                  sx={{ 
                    bgcolor: customerFilter === customerName ? '#F3F4F6' : 'transparent',
                    borderRadius: 1,
                    mb: 0.5
                  }}
                >
                  <ListItemText 
                    primary={customerName}
                    secondary={customer?.place || 'Unknown'}
                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                    secondaryTypographyProps={{ fontSize: '0.75rem' }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Popover>
      </Box>
    </Box>
  );
};

export default PendingPayments;