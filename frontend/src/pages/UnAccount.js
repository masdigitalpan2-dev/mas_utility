import React, { useState } from 'react';
import { Container, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid, Chip, Box } from '@mui/material';
import { Add, Edit, Delete, AccountBalance, TrendingDown, Receipt } from '@mui/icons-material';

const UnAccount = () => {
  const [unaccountedItems, setUnaccountedItems] = useState([
    { id: 1, date: '2024-01-15', description: 'Cash withdrawal for office supplies', amount: 500, category: 'Office', status: 'Pending' },
    { id: 2, date: '2024-01-14', description: 'Petty cash for transport', amount: 200, category: 'Transport', status: 'Pending' },
    { id: 3, date: '2024-01-13', description: 'Emergency expense', amount: 300, category: 'Emergency', status: 'Resolved' }
  ]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ 
    date: new Date().toISOString().split('T')[0], 
    description: '', 
    amount: '', 
    category: 'Office', 
    status: 'Pending' 
  });

  const categories = ['Office', 'Transport', 'Emergency', 'Maintenance', 'Other'];

  const handleSubmit = () => {
    if (editId) {
      setUnaccountedItems(unaccountedItems.map(item => 
        item.id === editId ? { ...formData, id: editId, amount: parseFloat(formData.amount) } : item
      ));
    } else {
      setUnaccountedItems([...unaccountedItems, { 
        ...formData, 
        id: Date.now(), 
        amount: parseFloat(formData.amount) 
      }]);
    }
    setOpen(false);
    setFormData({ 
      date: new Date().toISOString().split('T')[0], 
      description: '', 
      amount: '', 
      category: 'Office', 
      status: 'Pending' 
    });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setUnaccountedItems(unaccountedItems.filter(item => item.id !== id));
  };

  const markAsResolved = (id) => {
    setUnaccountedItems(unaccountedItems.map(item => 
      item.id === id ? { ...item, status: 'Resolved' } : item
    ));
  };

  const totalUnaccounted = unaccountedItems.filter(item => item.status === 'Pending').reduce((sum, item) => sum + item.amount, 0);
  const totalResolved = unaccountedItems.filter(item => item.status === 'Resolved').reduce((sum, item) => sum + item.amount, 0);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Unaccounted Transactions
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Add Entry
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)', color: 'white', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingDown sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">₹{totalUnaccounted}</Typography>
                  <Typography variant="body2">Pending Amount</Typography>
                  <Typography variant="caption">
                    {unaccountedItems.filter(item => item.status === 'Pending').length} items
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', color: 'white', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccountBalance sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">₹{totalResolved}</Typography>
                  <Typography variant="body2">Resolved Amount</Typography>
                  <Typography variant="caption">
                    {unaccountedItems.filter(item => item.status === 'Resolved').length} items
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #2196f3 0%, #42a5f5 100%)', color: 'white', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Receipt sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">{unaccountedItems.length}</Typography>
                  <Typography variant="body2">Total Entries</Typography>
                  <Typography variant="caption">All records</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Unaccounted Records</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unaccountedItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'error.main' }}>
                      ₹{item.amount}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.status} 
                        color={item.status === 'Resolved' ? 'success' : 'warning'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      {item.status === 'Pending' && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          onClick={() => markAsResolved(item.id)}
                          sx={{ mr: 1 }}
                        >
                          Resolve
                        </Button>
                      )}
                      <IconButton onClick={() => handleEdit(item)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item.id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {editId ? 'Edit Unaccounted Entry' : 'Add Unaccounted Entry'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount (₹)"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  multiline
                  rows={2}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  SelectProps={{ native: true }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  SelectProps={{ native: true }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2 }}>
              {editId ? 'Update' : 'Save'} Entry
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default UnAccount;