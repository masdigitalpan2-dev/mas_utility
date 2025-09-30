import React, { useState } from 'react';
import { Container, Paper, Typography, Grid, Card, CardContent, Button, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Work, Computer, Assignment, Schedule, CheckCircle } from '@mui/icons-material';

const OnlineWork = () => {
  const [workItems, setWorkItems] = useState([
    { id: 1, title: 'Aadhar Update', customer: 'John Doe', status: 'In Progress', priority: 'High', dueDate: '2024-01-20' },
    { id: 2, title: 'PAN Card Application', customer: 'Jane Smith', status: 'Completed', priority: 'Medium', dueDate: '2024-01-18' },
    { id: 3, title: 'Passport Renewal', customer: 'Ram Kumar', status: 'Pending', priority: 'High', dueDate: '2024-01-22' }
  ]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', customer: '', priority: 'Medium', dueDate: '' });

  const handleSubmit = () => {
    setWorkItems([...workItems, { 
      ...formData, 
      id: Date.now(), 
      status: 'Pending' 
    }]);
    setOpen(false);
    setFormData({ title: '', customer: '', priority: 'Medium', dueDate: '' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'Pending': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#f44336';
      case 'Medium': return '#ff9800';
      case 'Low': return '#4caf50';
      default: return '#757575';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Online Work Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Work />} 
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Add Work
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #2196f3 0%, #42a5f5 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Assignment sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {workItems.length}
                    </Typography>
                    <Typography variant="body2">Total Works</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircle sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {workItems.filter(w => w.status === 'Completed').length}
                    </Typography>
                    <Typography variant="body2">Completed</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Schedule sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {workItems.filter(w => w.status === 'In Progress').length}
                    </Typography>
                    <Typography variant="body2">In Progress</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Computer sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {workItems.filter(w => w.status === 'Pending').length}
                    </Typography>
                    <Typography variant="body2">Pending</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {workItems.map((work) => (
            <Grid item xs={12} md={6} lg={4} key={work.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {work.title}
                    </Typography>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: getPriorityColor(work.priority) 
                      }} 
                    />
                  </Box>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Customer: {work.customer}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Due: {work.dueDate}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color={getStatusColor(work.status)}
                    >
                      {work.status}
                    </Button>
                    <Typography variant="caption" color="text.secondary">
                      {work.priority} Priority
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main' }}>Add New Work</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Work Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  value={formData.customer}
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  SelectProps={{ native: true }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Due Date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2 }}>
              Add Work
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default OnlineWork;