import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Chip, MenuItem, InputAdornment } from '@mui/material';
import { Add, Edit, Delete, Payment, Refresh, Person } from '@mui/icons-material';
import MASAnalyticsSidebar from '../components/MASAnalyticsSidebar';

const PendingPayments = ({ onNavigate }) => {
  const [payments, setPayments] = useState([
    { id: 1, customer: 'John Doe', service: 'Passport', amount: 1500, dueDate: '2024-01-20', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', service: 'PAN Card', amount: 100, dueDate: '2024-01-18', status: 'Overdue' }
  ]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ customer: '', service: '', amount: '', commission: '', dueDate: new Date().toISOString().split('T')[0], status: 'Pending', paymentType: 'credit', remarks: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = async () => {
    if (!formData.customer || !formData.service || !formData.amount) {
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
    
    if (editId) {
      setPayments(payments.map(p => p.id === editId ? { ...formData, id: editId, amount: parseFloat(formData.amount) } : p));
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
      setPayments([...payments, { ...formData, id: Date.now(), amount: parseFloat(formData.amount) }]);
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
    setFormData({ customer: '', service: '', amount: '', commission: '', dueDate: new Date().toISOString().split('T')[0], status: 'Pending', paymentType: 'credit', remarks: '' });
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
      setPayments(payments.filter(p => p.id !== id));
      await window.Swal.fire({
        title: 'Deleted!',
        text: 'Payment has been deleted successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const markAsPaid = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
  };

  const totalPending = payments.filter(p => p.status !== 'Paid').reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = statusFilter === 'All' || (payment.paymentType || 'credit') === statusFilter;
    const matchesDateRange = (!fromDate || payment.dueDate >= fromDate) && (!toDate || payment.dueDate <= toDate);
    return matchesSearch && matchesType && matchesDateRange;
  });

  const totalCredit = Math.round(filteredPayments.filter(p => (p.paymentType || 'credit') === 'credit').reduce((sum, p) => sum + (parseFloat(p.amount || 0) + parseFloat(p.commission || 0)), 0));
  const totalDebit = Math.round(filteredPayments.filter(p => (p.paymentType || 'credit') === 'debit').reduce((sum, p) => sum + (parseFloat(p.amount || 0) + parseFloat(p.commission || 0)), 0));
  const netAmount = totalCredit - totalDebit;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FAFAFA', overflow: 'hidden' }}>
      <MASAnalyticsSidebar activeItem="Payments" onNavigate={onNavigate} />
      
      <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Pending Payments</Typography>
      
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
      
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #725c72ff 0%, #f6f1f7ff 100%)', borderRadius: 3, boxShadow: 2 }}>
        <CardContent sx={{ p: 2 }}>
          {/*}
          <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
            {editId ? 'Edit Payment' : 'Add Payment'}
          </Typography>
          */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2, mb: 2 }}>
            <TextField
              id="payment-customer-input"
              name="customer"
              value={formData.customer}
              onChange={(e) => setFormData({...formData, customer: e.target.value})}
              onFocus={() => setFocusedField('customer')}
              onBlur={() => setFocusedField('')}
              size="small"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { borderColor: '#8B5CF6' },
                  '&:hover fieldset': { borderColor: '#7C3AED' },
                  '&.Mui-focused fieldset': { borderColor: '#6D28D9' }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ mr: 0.5 }} />
                    {!formData.customer && focusedField !== 'customer' && 'Customer Name'}
                  </InputAdornment>
                )
              }}
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
                  '& fieldset': { borderColor: '#8B5CF6' },
                  '&:hover fieldset': { borderColor: '#7C3AED' },
                  '&.Mui-focused fieldset': { borderColor: '#6D28D9' }
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
                  '& fieldset': { borderColor: '#8B5CF6' },
                  '&:hover fieldset': { borderColor: '#7C3AED' },
                  '&.Mui-focused fieldset': { borderColor: '#6D28D9' },
                  cursor: 'pointer'
                }
              }}
            />
            <Box 
              onClick={() => setFormData({...formData, paymentType: formData.paymentType === 'credit' ? 'debit' : 'credit'})}
              sx={{
                position: 'relative',
                width: '100%',
                height: 56,
                backgroundColor: '#E5E7EB',
                borderRadius: 28,
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
                  borderRadius: 18,
                  left: formData.paymentType === 'credit' ? '2px' : 'calc(50% + 2px)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
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
              type="number"
              label="Amount (₹)"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { borderColor: '#8B5CF6' },
                  '&:hover fieldset': { borderColor: '#7C3AED' },
                  '&.Mui-focused fieldset': { borderColor: '#6D28D9' }
                }
              }}
            />
            <TextField
              id="payment-commission-input"
              type="number"
              label="Commission (₹)"
              value={formData.commission}
              onChange={(e) => setFormData({...formData, commission: e.target.value})}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': { borderColor: '#8B5CF6' },
                  '&:hover fieldset': { borderColor: '#7C3AED' },
                  '&.Mui-focused fieldset': { borderColor: '#059669' }
                }
              }}
            />
            <TextField
              id="payment-total-input"
              label="Total Amount (₹)"
              value={Math.round(parseFloat(formData.amount || 0) + parseFloat(formData.commission || 0))}
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
                  '& fieldset': { borderColor: '#8B5CF6' },
                  '&:hover fieldset': { borderColor: '#7C3AED' },
                  '&.Mui-focused fieldset': { borderColor: '#6D28D9' }
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
                setFormData({ customer: '', service: '', amount: '', commission: '', dueDate: new Date().toISOString().split('T')[0], status: 'Pending', paymentType: 'credit', remarks: '' });
                setEditId(null);
              }}
              sx={{ bgcolor: '#b95d8d', '&:hover': { bgcolor: '#DC2626' }, width: 250, height: 48 }}
            >
              Reset Form
            </Button>
          </Box>
        </CardContent>
      </Card>

 

      <Card id="payments-list-card" sx={{ borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ color: 'white' }}>Payment List ({filteredPayments.length})</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>From:</Typography>
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
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>To:</Typography>
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
              <TextField
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
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
         
          <Box sx={{ 
            maxHeight: 250, 
            overflowY: 'auto',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { width: '6px', height: '6px' },
            '&::-webkit-scrollbar-track': { background: '#4399efff' },
            '&::-webkit-scrollbar-thumb': { background: '#0f74f0ff', borderRadius: '3px' }
          }}>
            <table id="tbl-payments-list" style={{ 
              width: '100%', 
              minWidth: '800px',
              borderCollapse: 'collapse', 
              fontSize: '0.75rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <tr style={{ 
                  background: 'linear-gradient(135deg, #f2d7f2ff 0%, #f7a1f9ff 90%)',
                  borderBottom: '2px solid #E2E8F0',
                  fontFamily: 'Open Sans', fontSize: '0.9rem'
                }}>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '120px' }}>Customer</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#ea2d63ff', minWidth: '100px' }}>Service</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#0b79afff', minWidth: '80px' }}>Amount</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#f59e0b', minWidth: '80px' }}>Commission</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#059669', minWidth: '80px' }}>Total</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#9333ea', minWidth: '80px' }}>Type</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#f5844cff', minWidth: '100px' }}>Due Date</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#6b7280', minWidth: '120px' }}>Remarks</th>
                  <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white', fontFamily: 'Century, serif', fontSize: '0.8rem', height: '80px', maxHeight: '100px', overflowY: 'auto' }}>
                {filteredPayments.map((payment, index) => (
                  <tr key={payment.id} style={{ backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                    <td style={{ padding: '6px 8px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{payment.customer}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{payment.service}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>₹{payment.amount}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>₹{payment.commission || 0}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'center', color: '#059669', fontWeight: 'bold' }}>₹{Math.round(parseFloat(payment.amount || 0) + parseFloat(payment.commission || 0))}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                      <Chip 
                        label={payment.paymentType || 'credit'} 
                        color={payment.paymentType === 'debit' ? 'error' : 'success'} 
                        size="small"
                        sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                      />
                    </td>
                    <td style={{ padding: '6px 8px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{payment.dueDate}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'center', color: '#6b7280', fontWeight: '500' }}>{payment.remarks || '-'}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    {payment.status !== 'Paid' && (
                      <IconButton onClick={() => markAsPaid(payment.id)} color="success" title="Mark as Paid">
                        <Payment />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleEdit(payment)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(payment.id)} color="error">
                      <Delete />
                    </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
};

export default PendingPayments;