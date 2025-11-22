import React, { useState } from 'react';
import { Box, Card, Typography, Grid, Button, TextField, MenuItem, Avatar } from '@mui/material';
import { BarChart, PieChart, TrendingUp, Assessment, Download } from '@mui/icons-material';
import MASAnalyticsSidebar from '../components/MASAnalyticsSidebar';

const Reports = ({ onNavigate }) => {
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-01-31' });
  const [reportType, setReportType] = useState('sales');

  // Mock data
  const salesData = { total: 15000, count: 45, avg: 333 };
  const expenseData = { total: 5000, count: 12, avg: 417 };
  const customerData = { total: 25, new: 8, active: 23 };
  const pendingData = { total: 3500, count: 7, overdue: 2 };

  const generateReport = () => {
    alert(`Generating ${reportType} report for ${dateRange.from} to ${dateRange.to}`);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FAFAFA', overflow: 'hidden' }}>
      <MASAnalyticsSidebar activeItem="Reports" onNavigate={onNavigate} />

      <Box sx={{ flex: 1, p: 2 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#1F2937' }}>
            Reports & Analytics
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#8B5CF6', width: 28, height: 28, fontSize: '0.7rem' }}>AD</Avatar>
            <Box>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>Admin</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>Manager</Typography>
            </Box>
          </Box>
        </Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Reports & Analytics</Typography>

        <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2, background: 'linear-gradient(135deg, #00d2ff 0%, #ff00a6 100%)' }}>
          <Box sx={{ background: 'linear-gradient(135deg, #f093fb 25%, #ee7989ff 100%)', borderRadius: 2, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Generate Report</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="sales">Sales Report</MenuItem>
              <MenuItem value="expenses">Expense Report</MenuItem>
              <MenuItem value="customers">Customer Report</MenuItem>
              <MenuItem value="pending">Pending Payments</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              value={dateRange.from}
              onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="To Date"
              value={dateRange.to}
              onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Download />}
              onClick={generateReport}
              sx={{ py: 1.5 }}
            >
              Generate
            </Button>
          </Grid>
          </Grid>
          </Box>
        </Card>

        <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 3, background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUp sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">₹{salesData.total}</Typography>
                <Typography>Total Sales</Typography>
                <Typography variant="caption">{salesData.count} transactions</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 3, background: 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Assessment sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">₹{expenseData.total}</Typography>
                <Typography>Total Expenses</Typography>
                <Typography variant="caption">{expenseData.count} expenses</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 3, background: 'linear-gradient(135deg, #2196f3 0%, #42a5f5 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PieChart sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">{customerData.total}</Typography>
                <Typography>Total Customers</Typography>
                <Typography variant="caption">{customerData.new} new this month</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 3, background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BarChart sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">₹{pendingData.total}</Typography>
                <Typography>Pending Payments</Typography>
                <Typography variant="caption">{pendingData.overdue} overdue</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

        <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Monthly Performance</Typography>
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography color="text.secondary">Chart Placeholder</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Service Distribution</Typography>
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography color="text.secondary">Pie Chart Placeholder</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default Reports;