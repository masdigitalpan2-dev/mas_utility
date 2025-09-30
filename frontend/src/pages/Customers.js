import React, { useState } from 'react';
import { Box, Card, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Chip } from '@mui/material';
import { Add, Edit, Delete, Phone, Email } from '@mui/icons-material';

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', phone: '9876543210', email: 'john@email.com', address: 'Chennai', status: 'Active' },
    { id: 2, name: 'Jane Smith', phone: '9876543211', email: 'jane@email.com', address: 'Coimbatore', status: 'Active' }
  ]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '', status: 'Active' });

  const handleSubmit = () => {
    if (editId) {
      setCustomers(customers.map(c => c.id === editId ? { ...formData, id: editId } : c));
    } else {
      setCustomers([...customers, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
    setFormData({ name: '', phone: '', email: '', address: '', status: 'Active' });
    setEditId(null);
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditId(customer.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Customer Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Customer
        </Button>
      </Box>

      <Card sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone sx={{ fontSize: 16 }} />
                      {customer.phone}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Email sx={{ fontSize: 16 }} />
                      {customer.email}
                    </Box>
                  </TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <Chip label={customer.status} color={customer.status === 'Active' ? 'success' : 'default'} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(customer)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(customer.id)} color="error">
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
        <DialogTitle>{editId ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            sx={{ mb: 2 }}
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

export default Customers;