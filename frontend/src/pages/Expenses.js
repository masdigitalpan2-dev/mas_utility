import React, { useState } from 'react';
import { Box, Card, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid, MenuItem } from '@mui/material';
import { Add, Edit, Delete, TrendingDown, Receipt } from '@mui/icons-material';

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2024-01-15', category: 'Office Supplies', description: 'Printer Paper', amount: 500, type: 'Office' },
    { id: 2, date: '2024-01-14', category: 'Utilities', description: 'Internet Bill', amount: 1200, type: 'Utilities' }
  ]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ date: new Date().toISOString().split('T')[0], category: '', description: '', amount: '', type: 'Office' });

  const categories = ['Office Supplies', 'Utilities', 'Travel', 'Marketing', 'Maintenance', 'Other'];
  const types = ['Office', 'Utilities', 'Travel', 'Marketing', 'Other'];

  const handleSubmit = () => {
    if (editId) {
      setExpenses(expenses.map(e => e.id === editId ? { ...formData, id: editId, amount: parseFloat(formData.amount) } : e));
    } else {
      setExpenses([...expenses, { ...formData, id: Date.now(), amount: parseFloat(formData.amount) }]);
    }
    setOpen(false);
    setFormData({ date: new Date().toISOString().split('T')[0], category: '', description: '', amount: '', type: 'Office' });
    setEditId(null);
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setEditId(expense.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthlyExpenses = expenses.filter(e => e.date.startsWith('2024-01')).reduce((sum, e) => sum + e.amount, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Expense Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Expense
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, background: 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingDown sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">₹{monthlyExpenses}</Typography>
                <Typography>This Month</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Receipt sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">₹{totalExpenses}</Typography>
                <Typography>Total Expenses</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(expense)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(expense.id)} color="error">
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
        <DialogTitle>{editId ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            sx={{ mb: 2 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            sx={{ mb: 2 }}
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
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

export default Expenses;