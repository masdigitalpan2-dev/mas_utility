import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, IconButton, Avatar, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { Add, Edit, Delete, Visibility, VisibilityOff, Lock, Language, Person, Key, Notes, Search, Refresh, CreditCard, Pin, Phone } from '@mui/icons-material';
import MASAnalyticsSidebar from '../components/MASAnalyticsSidebar';

const PasswordManager = ({ onNavigate }) => {
  const [passwords, setPasswords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [formData, setFormData] = useState({
    serviceName: '',
    username: '',
    mobile: '',
    password: '',
    transactionPassword: '',
    pin: '',
    mpin: '',
    website: ''
  });
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [showPasswords, setShowPasswords] = useState({});
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [showFormTxnPassword, setShowFormTxnPassword] = useState(false);
  const [showFormPin, setShowFormPin] = useState(false);
  const [showFormMpin, setShowFormMpin] = useState(false);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await fetch('http://localhost:52550/api/password');
      if (response.ok) {
        const data = await response.json();
        setPasswords(data);
      }
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setPasswords([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!formData.serviceName || !formData.username || !formData.password) {
      alert('Please fill all required fields (Service Name, Username, Password)');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        serviceName: formData.serviceName,
        username: formData.username,
        password: formData.password,
        website: formData.website || null,
        category: formData.category || null,
        notes: `Mobile: ${formData.mobile || 'N/A'} | TxnPwd: ${formData.transactionPassword || 'N/A'} | PIN: ${formData.pin || 'N/A'} | MPIN: ${formData.mpin || 'N/A'}`
      };

      if (editingId) {
        const response = await fetch(`http://localhost:52550/api/password/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          fetchPasswords();
        }
      } else {
        const response = await fetch('http://localhost:52550/api/password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          fetchPasswords();
        }
      }
      resetForm();
    } catch (error) {
      console.error('Error saving password:', error);
      alert('Error saving password. Please try again.');
    }
    setLoading(false);
  };

  const handleEdit = (password) => {
    const notes = password.notes || '';
    const mobileMatch = notes.match(/Mobile: ([^|]*)/)?.[1] || '';
    const txnPwdMatch = notes.match(/TxnPwd: ([^|]*)/)?.[1] || '';
    const pinMatch = notes.match(/PIN: ([^|]*)/)?.[1] || '';
    const mpinMatch = notes.match(/MPIN: ([^|]*)/)?.[1] || '';
    
    setFormData({
      serviceName: password.serviceName || '',
      username: password.username || '',
      password: password.password || '',
      website: password.website || '',
      mobile: mobileMatch === 'N/A' ? '' : mobileMatch,
      transactionPassword: txnPwdMatch === 'N/A' ? '' : txnPwdMatch,
      pin: pinMatch === 'N/A' ? '' : pinMatch,
      mpin: mpinMatch === 'N/A' ? '' : mpinMatch
    });
    setEditingId(password.id);
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:52550/api/password/${deleteConfirm.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPasswords();
      }
    } catch (error) {
      console.error('Error deleting password:', error);
    }
    setLoading(false);
    setDeleteConfirm({ open: false, id: null });
  };

  const resetForm = () => {
    setFormData({ serviceName: '', username: '', mobile: '', password: '', transactionPassword: '', pin: '', mpin: '', website: '' });
    setEditingId(null);
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPasswords = passwords.filter(password =>
    password.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.website?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FAFAFA', overflow: 'hidden' }}>
      <MASAnalyticsSidebar activeItem="Password Manager" onNavigate={onNavigate} />

      <Box sx={{ flex: 1, p: 2 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#1F2937' }}>
            Password Manager
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#8B5CF6', width: 28, height: 28, fontSize: '0.7rem' }}>AD</Avatar>
            <Box>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>Admin</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>Manager</Typography>
            </Box>
          </Box>
        </Box>

        {/* Add Password Form */}
        <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #00d2ff 0%, #ff00a6 100%)' }}>
          <CardContent sx={{ background: 'linear-gradient(135deg, #f093fb 25%, #ee7989ff 100%)', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{editingId ? 'Edit Password' : 'Add New Password'}</Typography> 
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 2 }}>
                <TextField 
                  name="serviceName" 
                  value={formData.serviceName} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocusedField('serviceName')} 
                  onBlur={() => setFocusedField('')} 
                  size="small" 
                  required 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} 
                  InputProps={{ startAdornment: <InputAdornment position="start"><Language sx={{ mr: 0.5 }} />{!formData.serviceName && focusedField !== 'serviceName' && 'Service Name'}</InputAdornment> }} 
                />
                <TextField 
                  name="username" 
                  value={formData.username} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocusedField('username')} 
                  onBlur={() => setFocusedField('')} 
                  size="small" 
                  required 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} 
                  InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ mr: 0.5 }} />{!formData.username && focusedField !== 'username' && 'Username/Email'}</InputAdornment> }} 
                />
                <TextField 
                  name="password" 
                  type={showFormPassword ? 'text' : 'password'} 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocusedField('password')} 
                  onBlur={() => setFocusedField('')} 
                  size="small" 
                  required 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} 
                  InputProps={{ 
                    startAdornment: <InputAdornment position="start"><Key sx={{ mr: 0.5 }} />{!formData.password && focusedField !== 'password' && 'Password'}</InputAdornment>,
                    endAdornment: <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowFormPassword(!showFormPassword)}>
                        {showFormPassword ? <VisibilityOff sx={{ fontSize: '0.9rem' }} /> : <Visibility sx={{ fontSize: '0.9rem' }} />}
                      </IconButton>
                    </InputAdornment>
                  }} 
                />
                <TextField 
                  name="transactionPassword" 
                  type={showFormTxnPassword ? 'text' : 'password'} 
                  value={formData.transactionPassword} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocusedField('transactionPassword')} 
                  onBlur={() => setFocusedField('')} 
                  size="small" 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} 
                  InputProps={{ 
                    startAdornment: <InputAdornment position="start"><CreditCard sx={{ mr: 0.5 }} />{!formData.transactionPassword && focusedField !== 'transactionPassword' && 'Transaction Password'}</InputAdornment>,
                    endAdornment: <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowFormTxnPassword(!showFormTxnPassword)}>
                        {showFormTxnPassword ? <VisibilityOff sx={{ fontSize: '0.9rem' }} /> : <Visibility sx={{ fontSize: '0.9rem' }} />}
                      </IconButton>
                    </InputAdornment>
                  }} 
                />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 2 }}>
                <TextField 
                  name="pin" 
                  type={showFormPin ? 'text' : 'password'} 
                  value={formData.pin} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocusedField('pin')} 
                  onBlur={() => setFocusedField('')} 
                  size="small" 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} 
                  InputProps={{ 
                    startAdornment: <InputAdornment position="start"><Pin sx={{ mr: 0.5 }} />{!formData.pin && focusedField !== 'pin' && 'PIN'}</InputAdornment>,
                    endAdornment: <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowFormPin(!showFormPin)}>
                        {showFormPin ? <VisibilityOff sx={{ fontSize: '0.9rem' }} /> : <Visibility sx={{ fontSize: '0.9rem' }} />}
                      </IconButton>
                    </InputAdornment>
                  }} 
                />
                <TextField 
                  name="mpin" 
                  type={showFormMpin ? 'text' : 'password'} 
                  value={formData.mpin} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocusedField('mpin')} 
                  onBlur={() => setFocusedField('')} 
                  size="small" 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} 
                  InputProps={{ 
                    startAdornment: <InputAdornment position="start"><Pin sx={{ mr: 0.5 }} />{!formData.mpin && focusedField !== 'mpin' && 'MPIN'}</InputAdornment>,
                    endAdornment: <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowFormMpin(!showFormMpin)}>
                        {showFormMpin ? <VisibilityOff sx={{ fontSize: '0.9rem' }} /> : <Visibility sx={{ fontSize: '0.9rem' }} />}
                      </IconButton>
                    </InputAdornment>
                  }} 
                />
                <TextField 
                  name="mobile" 
                  value={formData.mobile} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocusedField('mobile')} 
                  onBlur={() => setFocusedField('')} 
                  size="small" 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} 
                  InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ mr: 0.5 }} />{!formData.mobile && focusedField !== 'mobile' && 'Mobile Number'}</InputAdornment> }} 
                />
                <TextField 
                  name="website" 
                  value={formData.website} 
                  onChange={handleInputChange} 
                  onFocus={() => setFocusedField('website')} 
                  onBlur={() => setFocusedField('')} 
                  size="small" 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white', '& fieldset': { borderColor: '#8B5CF6' } } }} 
                  InputProps={{ startAdornment: <InputAdornment position="start"><Language sx={{ mr: 0.5 }} />{!formData.website && focusedField !== 'website' && 'Website URL'}</InputAdornment> }} 
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={16} /> : <Add />}
                  disabled={loading}
                  sx={{ bgcolor: '#7038f1ff' }}
                >
                  {editingId ? 'Update Password' : 'Add Password'}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  onClick={resetForm}
                  disabled={loading}
                  sx={{ bgcolor: '#b95d8d', '&:hover': { bgcolor: '#DC2626' } }}
                >
                  Reset Form
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* Search and Password List */}
        <Card sx={{ borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Password List ({filteredPasswords.length})</Typography>
              <TextField
                placeholder="Search passwords..."
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
              <table style={{ 
                width: '100%', 
                minWidth: '800px',
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
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '120px' }}>Service Name</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '100px' }}>Username</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#ea2d63ff', minWidth: '100px' }}>Password</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '120px' }}>Website</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', verticalAlign: 'middle', fontWeight: '800', color: '#3fb4eeff', minWidth: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white', fontFamily: 'Century, serif', fontSize: '0.8rem' }}>
                  {filteredPasswords.map((password, index) => (
                    <tr key={password.id} style={{ backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{password.serviceName}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{password.username}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          {showPasswords[password.id] ? password.password : '••••••••'}
                          <IconButton size="small" onClick={() => togglePasswordVisibility(password.id)}>
                            {showPasswords[password.id] ? <VisibilityOff sx={{ fontSize: '0.9rem' }} /> : <Visibility sx={{ fontSize: '0.9rem' }} />}
                          </IconButton>
                        </Box>
                      </td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600' }}>{password.website || '-'}</td>
                      <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                        <IconButton size="small" color="primary" onClick={() => handleEdit(password)} disabled={loading}>
                          <Edit />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(password.id)}
                          disabled={loading}
                        >
                          <Delete />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                  {filteredPasswords.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                        No passwords found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>

        <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this password? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default PasswordManager;