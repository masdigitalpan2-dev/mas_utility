import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Dashboard, Analytics, Person, AccountBalance, Receipt, MoneyOff, Lock } from '@mui/icons-material';

const MASAnalyticsSidebar = ({ activeItem = 'Dashboard', onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <Analytics />, label: 'Day Sales', href: '/daysales' },
    { icon: <Person />, label: 'Customer', href: '/customers' },
    { icon: <AccountBalance />, label: 'Payments', href: '/pending' },
    { icon: <MoneyOff />, label: 'Expenses', href: '/expenses' },
    { icon: <Lock />, label: 'Password Manager', href: '/password' },
    { icon: <Receipt />, label: 'Reports', href: '/reports' }
  ];

  const minimizedItems = ['Day Sales', 'Password Manager', 'Customer'];
  const displayItems = sidebarOpen ? menuItems : menuItems.filter(item => minimizedItems.includes(item.label));

  return (
    <Box 
      id="sidebar"
      sx={{ 
        width: sidebarOpen ? 240 : 60, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        borderRight: '1px solid #E5E7EB',
        p: sidebarOpen ? 2 : 1,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'width 0.3s ease'
      }}
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
    >
      {sidebarOpen ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <img 
            src="/Images/MAS Logo Round.jpg" 
            alt="MAS Logo" 
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
            MAS DIGITAL
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <img 
            src="/Images/MAS Logo Round.jpg" 
            alt="MAS Logo" 
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
        </Box>
      )}
      
      {displayItems.map((item, index) => (
        <Box 
          key={index} 
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: sidebarOpen ? 2 : 0,
            p: 1.5,
            borderRadius: 2,
            mb: 1,
            cursor: 'pointer',
            bgcolor: item.label === activeItem ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            color: item.label === activeItem ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' },
            justifyContent: sidebarOpen ? 'flex-start' : 'center'
          }}
          onClick={() => {
            if ((item.label === 'Customer' || item.label === 'Day Sales' || item.label === 'Payments' || item.label === 'Expenses') && onNavigate) {
              onNavigate(item.label);
            } else if (item.label === 'Password Manager' && onNavigate) {
              onNavigate('PasswordManager.js');
            } else if (item.label === 'Reports' && onNavigate) {
              onNavigate('Reports.js');
            } else if (item.href) {
              window.open(window.location.origin + item.href, '_blank');
            }
          }}
        >
          {item.icon}
          {sidebarOpen && (
            <Typography variant="body2" fontWeight={item.label === activeItem ? 600 : 400}>
              {item.label}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MASAnalyticsSidebar;