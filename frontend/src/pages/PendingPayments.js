import React, { useState } from 'react';
import { Box, Card, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Chip } from '@mui/material';
import { Add, Edit, Delete, Payment } from '@mui/icons-material';

const PendingPayments = () => {
  const [payments, setPayments] = useState([
    { id: 1, customer: 'John Doe', service: 'Passport', amount: 1500, dueDate: '2024-01-20', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', service: 'PAN Card', amount: 100, dueDate: '2024-01-18', status: 'Overdue' }
  ]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ customer: '', service: '', amount: '', dueDate: '', status: 'Pending' });

  const handleSubmit = () => {
    if (editId) {
      setPayments(payments.map(p => p.id === editId ? { ...formData, id: editId, amount: parseFloat(formData.amount) } : p));
    } else {
      setPayments([...payments, { ...formData, id: Date.now(), amount: parseFloat(formData.amount) }]);
    }
    setOpen(false);
    setFormData({ customer: '', service: '', amount: '', dueDate: '', status: 'Pending' });
    setEditId(null);
  };

  const handleEdit = (payment) => {
    setFormData(payment);
    setEditId(payment.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const markAsPaid = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
  };

  const totalPending = payments.filter(p => p.status !== 'Paid').reduce((sum, p) => sum + p.amount, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Pending Payments</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Payment
        </Button>
      </Box>

      <Card sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)', color: 'white' }}>
        <Typography variant="h4" fontWeight="bold">₹{totalPending}</Typography>
        <Typography>Total Pending Amount</Typography>
      </Card>

      <Card sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>{payment.service}</TableCell>
                  <TableCell>₹{payment.amount}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={payment.status} 
                      color={payment.status === 'Paid' ? 'success' : payment.status === 'Overdue' ? 'error' : 'warning'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Payment' : 'Add Payment'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Customer"
            value={formData.customer}
            onChange={(e) => setFormData({...formData, customer: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Service"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingPayments;