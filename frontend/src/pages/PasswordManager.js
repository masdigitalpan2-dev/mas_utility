import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box, Chip, Card, CardContent, Grid, InputAdornment, Fab, Tooltip, Alert } from '@mui/material';
import { Add, Edit, Delete, Visibility, VisibilityOff, Security, Key, Search, FilterList, Lock, Person, Language, Update } from '@mui/icons-material';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([
    { id: 1, website: 'Digital Seva Portal', username: 'admin@mas', password: 'admin123', category: 'Government', lastUpdated: '2024-01-15' },
    { id: 2, website: 'NSDL PAN Portal', username: 'masdigital', password: 'pan@2024', category: 'Banking', lastUpdated: '2024-01-10' },
    { id: 3, website: 'UIDAI Portal', username: 'mas_center', password: 'uidai@123', category: 'Government', lastUpdated: '2024-01-12' }
  ]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ website: '', username: '', password: '', category: 'Government' });
  const [showPasswords, setShowPasswords] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['Government', 'Banking', 'Utility', 'Social Media', 'Other'];
  const allCategories = ['All', ...categories];

  const handleSubmit = () => {
    if (editId) {
      setPasswords(passwords.map(p => p.id === editId ? { 
        ...formData, 
        id: editId, 
        lastUpdated: new Date().toISOString().split('T')[0] 
      } : p));
    } else {
      setPasswords([...passwords, { 
        ...formData, 
        id: Date.now(), 
        lastUpdated: new Date().toISOString().split('T')[0] 
      }]);
    }
    setOpen(false);
    setFormData({ website: '', username: '', password: '', category: 'Government' });
    setEditId(null);
  };

  const handleEdit = (password) => {
    setFormData(password);
    setEditId(password.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setPasswords(passwords.filter(p => p.id !== id));
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Government': return 'primary';
      case 'Banking': return 'success';
      case 'Utility': return 'warning';
      case 'Social Media': return 'info';
      default: return 'default';
    }
  };

  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = password.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         password.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || password.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({...formData, password});
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 3, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <Security sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="700" color="text.primary">
                Password Manager
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Secure storage for all your credentials
              </Typography>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lock sx={{ fontSize: 18 }} />
              <Typography variant="body2">
                Your passwords are encrypted and stored securely. Never share your credentials.
              </Typography>
            </Box>
          </Alert>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">{passwords.length}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Passwords</Typography>
                  </Box>
                  <Security sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">{categories.length}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Categories</Typography>
                  </Box>
                  <FilterList sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">{passwords.filter(p => p.category === 'Government').length}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Government</Typography>
                  </Box>
                  <Language sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">{passwords.filter(p => p.category === 'Banking').length}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Banking</Typography>
                  </Box>
                  <Security sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter Section */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search passwords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Filter by Category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button 
                  fullWidth
                  variant="contained" 
                  startIcon={<Add />} 
                  onClick={() => setOpen(true)}
                  sx={{ 
                    borderRadius: 2, 
                    py: 1.5,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Passwords Table */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Stored Passwords ({filteredPasswords.length})
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    backgroundColor: 'grey.50',
                    '& .MuiTableCell-head': {
                      fontWeight: 'bold',
                      color: 'text.primary',
                      fontSize: '0.875rem'
                    }
                  }}>
                    <TableCell>Website/Service</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPasswords.map((password, index) => (
                    <TableRow 
                      key={password.id} 
                      hover
                      sx={{ 
                        '&:hover': { backgroundColor: 'action.hover' },
                        backgroundColor: index % 2 === 0 ? 'transparent' : 'grey.25'
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ 
                            p: 1, 
                            borderRadius: 2, 
                            bgcolor: 'primary.light', 
                            color: 'primary.contrastText' 
                          }}>
                            <Key sx={{ fontSize: 16 }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {password.website}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{password.username}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontFamily: 'monospace',
                              bgcolor: 'grey.100',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              minWidth: '80px'
                            }}
                          >
                            {showPasswords[password.id] ? password.password : '••••••••'}
                          </Typography>
                          <Tooltip title={showPasswords[password.id] ? 'Hide' : 'Show'}>
                            <IconButton 
                              size="small" 
                              onClick={() => togglePasswordVisibility(password.id)}
                              sx={{ 
                                bgcolor: 'action.hover',
                                '&:hover': { bgcolor: 'action.selected' }
                              }}
                            >
                              {showPasswords[password.id] ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={password.category} 
                          color={getCategoryColor(password.category)} 
                          size="small"
                          sx={{ borderRadius: 2, fontWeight: 'medium' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Update sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {password.lastUpdated}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Edit">
                            <IconButton 
                              onClick={() => handleEdit(password)} 
                              size="small"
                              sx={{ 
                                bgcolor: 'primary.light',
                                color: 'primary.main',
                                '&:hover': { bgcolor: 'primary.main', color: 'white' }
                              }}
                            >
                              <Edit sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton 
                              onClick={() => handleDelete(password.id)} 
                              size="small"
                              sx={{ 
                                bgcolor: 'error.light',
                                color: 'error.main',
                                '&:hover': { bgcolor: 'error.main', color: 'white' }
                              }}
                            >
                              <Delete sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPasswords.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Security sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                          <Typography variant="h6" color="text.secondary" gutterBottom>
                            No passwords found
                          </Typography>
                          <Typography variant="body2" color="text.disabled">
                            {searchTerm || filterCategory !== 'All' 
                              ? 'Try adjusting your search or filter criteria'
                              : 'Add your first password to get started'
                            }
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog 
          open={open} 
          onClose={() => setOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            borderBottom: '1px solid',
            borderColor: 'divider',
            pb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                p: 1, 
                borderRadius: 2, 
                bgcolor: 'primary.light',
                color: 'primary.contrastText'
              }}>
                {editId ? <Edit /> : <Add />}
              </Box>
              {editId ? 'Edit Password' : 'Add New Password'}
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website/Service"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Language color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username/Email"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Generate Password">
                          <IconButton onClick={generatePassword} edge="end">
                            <Key />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  SelectProps={{ native: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button 
              onClick={() => setOpen(false)} 
              color="inherit"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              sx={{ 
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 3
              }}
            >
              {editId ? 'Update' : 'Save'} Password
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            }
          }}
        >
          <Add />
        </Fab>
      </Container>
    </Box>
  );
};

export default PasswordManager;