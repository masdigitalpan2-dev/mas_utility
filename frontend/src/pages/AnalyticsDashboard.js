import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Chip, TextField, InputAdornment, CircularProgress } from '@mui/material';
import { Dashboard, Analytics, Folder, Group, Settings, Notifications, Search, MoreVert, TrendingUp, PieChart } from '@mui/icons-material';

const AnalyticsDashboard = () => {
  const navItems = [
    { icon: <Dashboard />, label: 'Dashboard', active: true },
    { icon: <Analytics />, label: 'Analytics' },
    { icon: <Folder />, label: 'Projects' },
    { icon: <Group />, label: 'Teams' },
    { icon: <Settings />, label: 'Settings' },
    { icon: <Notifications />, label: 'Notifications' }
  ];

  const teamMembers = [
    { name: 'Sarah Chen', role: 'Designer', avatar: 'SC', status: 'online', color: '#8B5CF6' },
    { name: 'Mike Johnson', role: 'Developer', avatar: 'MJ', status: 'away', color: '#06B6D4' },
    { name: 'Emma Wilson', role: 'Manager', avatar: 'EW', status: 'online', color: '#F59E0B' },
    { name: 'Alex Kumar', role: 'Analyst', avatar: 'AK', status: 'offline', color: '#EF4444' }
  ];

  const chartData = [
    { month: 'Jan', value: 65, color: '#8B5CF6' },
    { month: 'Feb', value: 78, color: '#06B6D4' },
    { month: 'Mar', value: 52, color: '#F59E0B' },
    { month: 'Apr', value: 85, color: '#EF4444' },
    { month: 'May', value: 92, color: '#10B981' },
    { month: 'Jun', value: 88, color: '#F97316' }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#FAFAFA' }}>
      {/* Sidebar */}
      <Box sx={{ 
        width: 280, 
        bgcolor: 'white', 
        borderRight: '1px solid #E5E7EB',
        p: 3,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#8B5CF6', mb: 4 }}>
          Analytics Pro
        </Typography>
        
        {navItems.map((item, index) => (
          <Box key={index} sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 3,
            mb: 1,
            cursor: 'pointer',
            bgcolor: item.active ? '#F3F4F6' : 'transparent',
            color: item.active ? '#8B5CF6' : '#6B7280',
            '&:hover': { bgcolor: '#F9FAFB' }
          }}>
            {item.icon}
            <Typography variant="body1" fontWeight={item.active ? 600 : 400}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <TextField
            placeholder="Search analytics..."
            size="small"
            sx={{ 
              width: 400,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#9CA3AF' }} />
                </InputAdornment>
              )
            }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#8B5CF6', width: 40, height: 40 }}>JD</Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600}>John Doe</Typography>
              <Typography variant="caption" color="text.secondary">Admin</Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 4 }}>
          {[
            { title: 'Total Revenue', value: '$45,231', change: '+12%', color: '#8B5CF6' },
            { title: 'Active Users', value: '2,431', change: '+5%', color: '#06B6D4' },
            { title: 'Conversion Rate', value: '3.2%', change: '+8%', color: '#F59E0B' },
            { title: 'Growth Rate', value: '24%', change: '+15%', color: '#10B981' }
          ].map((stat, index) => (
            <Card key={index} sx={{ 
              borderRadius: 4, 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #F3F4F6'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: stat.color, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Chip 
                  label={stat.change} 
                  size="small" 
                  sx={{ 
                    bgcolor: `${stat.color}20`, 
                    color: stat.color,
                    fontWeight: 600
                  }} 
                />
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3, mb: 4 }}>
          {/* Bar Chart */}
          <Card sx={{ 
            borderRadius: 4, 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #F3F4F6'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>Monthly Analytics</Typography>
                <MoreVert sx={{ color: '#9CA3AF' }} />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'end', gap: 2, height: 200 }}>
                {chartData.map((item, index) => (
                  <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{
                      width: '100%',
                      height: `${item.value * 2}px`,
                      bgcolor: item.color,
                      borderRadius: '8px 8px 0 0',
                      mb: 1
                    }} />
                    <Typography variant="caption" color="text.secondary">
                      {item.month}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card sx={{ 
            borderRadius: 4, 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #F3F4F6'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Performance</Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={75}
                    size={120}
                    thickness={8}
                    sx={{ color: '#8B5CF6' }}
                  />
                  <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#8B5CF6' }}>
                      75%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Completed', value: '75%', color: '#8B5CF6' },
                  { label: 'In Progress', value: '15%', color: '#F59E0B' },
                  { label: 'Pending', value: '10%', color: '#EF4444' }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
                      <Typography variant="body2">{item.label}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={600}>{item.value}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Team Members */}
        <Card sx={{ 
          borderRadius: 4, 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #F3F4F6'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Team Members</Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
              {teamMembers.map((member, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 3,
                  bgcolor: '#FAFAFA',
                  border: '1px solid #F3F4F6'
                }}>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: member.color, 
                      width: 60, 
                      height: 60,
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }}>
                      {member.avatar}
                    </Avatar>
                    <Box sx={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: member.status === 'online' ? '#10B981' : 
                               member.status === 'away' ? '#F59E0B' : '#9CA3AF',
                      border: '2px solid white'
                    }} />
                  </Box>
                  
                  <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {member.role}
                  </Typography>
                  
                  <Chip 
                    label={member.status} 
                    size="small" 
                    sx={{ 
                      mt: 1,
                      bgcolor: member.status === 'online' ? '#10B98120' : 
                               member.status === 'away' ? '#F59E0B20' : '#9CA3AF20',
                      color: member.status === 'online' ? '#10B981' : 
                             member.status === 'away' ? '#F59E0B' : '#9CA3AF',
                      fontWeight: 500
                    }} 
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;