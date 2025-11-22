import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, IconButton, MenuItem, CircularProgress } from '@mui/material';
import { Edit, Delete, Refresh } from '@mui/icons-material';
import MASAnalyticsSidebar from '../components/MASAnalyticsSidebar';

const Expenses = ({ onNavigate }) => {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ category: '', amount: '', date: new Date().toISOString().split('T')[0], description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'https://localhost:52549/api/expense';

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const records = await response.json();
        const formattedRecords = records.map(r => ({
          ...r,
          date: r.date ? r.date.split('T')[0] : r.date
        }));
        setExpenses(formattedRecords);
        localStorage.setItem('masExpenses', JSON.stringify(formattedRecords));
      }
    } catch (error) {
      console.error('API Error:', error);
      const savedExpenses = localStorage.getItem('masExpenses');
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async () => {
    if (!formData.category || !formData.amount) {
      if (!window.Swal) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      await window.Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in Category and Amount fields',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    setLoading(true);
    const recordData = {
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description || ''
    };
    
    try {
      const url = editId ? `${API_BASE_URL}/${editId}` : API_BASE_URL;
      const method = editId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
      });
      
      if (response.ok) {
        if (!window.Swal) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }
        await window.Swal.fire({
          title: editId ? 'Updated!' : 'Saved!',
          text: `Expense ${editId ? 'updated' : 'saved'} successfully!`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        await fetchExpenses();
        setFormData({ category: '', amount: '', date: new Date().toISOString().split('T')[0], description: '' });
        setEditId(null);
      } else {
        const errorText = await response.text();
        alert(`Error saving expense: ${errorText}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      let updatedExpenses;
      if (editId) {
        updatedExpenses = expenses.map(e => e.id === editId ? { ...recordData, id: editId } : e);
      } else {
        updatedExpenses = [...expenses, { ...recordData, id: Date.now() }];
      }
      setExpenses(updatedExpenses);
      localStorage.setItem('masExpenses', JSON.stringify(updatedExpenses));
      setFormData({ category: '', amount: '', date: new Date().toISOString().split('T')[0], description: '' });
      setEditId(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      description: expense.description || ''
    });
    setEditId(expense.id);
  };

  const handleDelete = async (id) => {
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }
    
    const result = await window.Swal.fire({
      title: 'Delete Expense?',
      text: 'Are you sure you want to delete this expense?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await window.Swal.fire({
            title: 'Deleted!',
            text: 'Expense has been deleted.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          await fetchExpenses();
        } else {
          const errorText = await response.text();
          await window.Swal.fire('Error!', `Failed to delete expense: ${errorText}`, 'error');
        }
      } catch (error) {
        console.error('API Error:', error);
        const updatedExpenses = expenses.filter(e => e.id !== id);
        setExpenses(updatedExpenses);
        localStorage.setItem('masExpenses', JSON.stringify(updatedExpenses));
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    const matchesDateRange = (!fromDate || expense.date >= fromDate) && (!toDate || expense.date <= toDate);
    return matchesSearch && matchesCategory && matchesDateRange;
  });

  const totalExpenses = Math.round(filteredExpenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0));
  const todayExpenses = Math.round(expenses.filter(e => e.date === new Date().toISOString().split('T')[0]).reduce((sum, e) => sum + parseFloat(e.amount || 0), 0));

  // Update localStorage when expenses change for DaySales integration
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('masExpenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FAFAFA', overflow: 'hidden' }}>
      <MASAnalyticsSidebar activeItem="Expenses" onNavigate={onNavigate} />
      
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography id="expenses-title" variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Expenses</Typography>
        
        {/* Summary Cards */}
        <Box id="expenses-summary" sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
          <Card id="total-expenses-card" sx={{ borderRadius: 2, boxShadow: 2, background: 'linear-gradient(135deg, #3997b3ff 0%, #078bb3ff 100%)' }}>
            <CardContent sx={{ p: 1, textAlign: 'center' }}>
              <Typography id="total-expenses-amount" variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>₹{totalExpenses.toLocaleString()}</Typography>
              <Typography id="total-expenses-label" variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>Total Expenses</Typography>
            </CardContent>
          </Card>
          <Card id="today-expenses-card" sx={{ borderRadius: 2, boxShadow: 2, background: 'linear-gradient(135deg, #e251edff 0%, #DC2626 100%)' }}>
            <CardContent sx={{ p: 1, textAlign: 'center' }}>
              <Typography id="today-expenses-amount" variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>₹{todayExpenses.toLocaleString()}</Typography>
              <Typography id="today-expenses-label" variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>Today Expenses</Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Card id="expense-form-card" sx={{ mb: 3, background: 'linear-gradient(135deg, #725c72ff 0%, #f6f1f7ff 100%)', borderRadius: 3, boxShadow: 2 }}>
          <CardContent sx={{ p: 2 }}>
            {/*}
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
              {editId ? 'Edit Expense' : 'Add Expense'}
            </Typography>
            */}
            <Box id="expense-form-fields" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: 2, mb: 2 }}>
              <TextField
                id="expense-category-input"
                select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                <MenuItem value="Paper">📄 Paper</MenuItem>
                <MenuItem value="Recharge">📱 Recharge</MenuItem>
                <MenuItem value="Salary">💰 Salary</MenuItem>
                <MenuItem value="Stationery">✏️ Stationery</MenuItem>
                <MenuItem value="Toner">🖨️ Toner</MenuItem>
                <MenuItem value="Service">🔧 Service</MenuItem>
                <MenuItem value="Water">💧 Water</MenuItem>
                <MenuItem value="Other">❓ Other</MenuItem>
              </TextField>
              <TextField
                id="expense-amount-input"
                type="number"
                label="Amount (₹)"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
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
              />
              <TextField
                id="expense-date-input"
                type="date"
                label="Date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                InputLabelProps={{ shrink: true }}
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
                id="expense-description-input"
                label="Description"
                multiline
                rows={1}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
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
            <Box id="expense-form-buttons" sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
              <Button 
                id="expense-submit-btn"
                onClick={handleSubmit}
                disabled={loading}
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
                {loading ? <CircularProgress size={20} color="inherit" /> : (editId ? '✏️ Update Expense' : '+ Add Expense')}
              </Button>
              <Button
                id="expense-reset-btn"
                variant="contained"
                startIcon={<Refresh />}
                onClick={() => {
                  setFormData({ category: '', amount: '', date: new Date().toISOString().split('T')[0], description: '' });
                  setEditId(null);
                }}
                sx={{ bgcolor: '#b95d8d', '&:hover': { bgcolor: '#DC2626' }, width: 250, height: 48 }}
              >
                Reset Form
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card id="expenses-list-card" sx={{ borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent>
            <Box id="expenses-list-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box id="expenses-list-filters" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography id="expenses-list-title" variant="h6" sx={{ color: 'white' }}>Expense List ({filteredExpenses.length})</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>From:</Typography>
                  <input
                    id="expense-from-date"
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
                    id="expense-to-date"
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
                  id="expense-clear-dates-btn"
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
              <Box id="expenses-search-filters" sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  id="expense-search-input"
                  placeholder="Search expenses..."
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
                  id="expense-category-filter"
                  select
                  label="Category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
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
                  <MenuItem value="Paper">📄 Paper</MenuItem>
                  <MenuItem value="Recharge">📱 Recharge</MenuItem>
                  <MenuItem value="Salary">💰 Salary</MenuItem>
                  <MenuItem value="Stationery">✏️ Stationery</MenuItem>
                  <MenuItem value="Toner">🖨️ Toner</MenuItem>
                  <MenuItem value="Service">🔧 Service</MenuItem>
                  <MenuItem value="Water">💧 Water</MenuItem>
                  <MenuItem value="Other">❓ Other</MenuItem>
                </TextField>
              </Box>
            </Box>
            <Box id="expenses-table-container" sx={{ 
              maxHeight: 250, 
              overflowY: 'auto',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { width: '6px', height: '6px' },
              '&::-webkit-scrollbar-track': { background: '#4399efff' },
              '&::-webkit-scrollbar-thumb': { background: '#0f74f0ff', borderRadius: '3px' }
            }}>
              <table id="tbl-expenses-list" style={{ 
                width: '100%', 
                minWidth: '600px',
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
                    <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '120px' }}>Category</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#0b79afff', minWidth: '100px' }}>Amount</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#f5844cff', minWidth: '100px' }}>Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#6b7280', minWidth: '150px' }}>Description</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '120px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white', fontFamily: 'Century, serif', fontSize: '0.8rem' }}>
                  {loading ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                        <CircularProgress size={24} />
                      </td>
                    </tr>
                  ) : filteredExpenses.map((expense, index) => (
                    <tr key={expense.id} style={{ backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                      <td style={{ padding: '6px 8px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{expense.category}</td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', color: '#EF4444', fontWeight: 'bold' }}>₹{expense.amount}</td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{expense.date}</td>
                      <td style={{ padding: '6px 8px', textAlign: 'center', color: '#6b7280', fontWeight: '500' }}>{expense.description || '-'}</td>
                      <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                        <IconButton onClick={() => handleEdit(expense)} color="primary" disabled={loading}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(expense.id)} color="error" disabled={loading}>
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

export default Expenses;