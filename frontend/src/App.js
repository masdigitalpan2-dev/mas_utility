import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Logout } from '@mui/icons-material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import SmartCard from './pages/SmartCard';
import ESevaForm from './pages/ESevaForm';
import UPIPayment from './pages/UPIPayment';
import WhatsApp from './pages/WhatsApp';
import Login from './pages/Login';
import Customers from './pages/Customers';
import DaySales from './pages/DaySales';
import PendingPayments from './pages/PendingPayments';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import OnlineWork from './pages/OnlineWork';
import PasswordManager from './pages/PasswordManager';
import UnAccount from './pages/UnAccount';
import './styles/global.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1757b8',
    },
    secondary: {
      main: '#ff8300',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <Login onLogin={handleLogin} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}>
          <Header />
          <Box sx={{ position: 'fixed', top: 10, right: 10, zIndex: 1300 }}>
            <Button
              variant="contained"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ 
                background: 'rgba(255,255,255,0.2)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              Logout ({user.name})
            </Button>
          </Box>
          <Box sx={{ flex: 1, py: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/smartcard" element={<SmartCard />} />
              <Route path="/eseva" element={<ESevaForm />} />
              <Route path="/upi" element={<UPIPayment />} />
              <Route path="/whatsapp" element={<WhatsApp />} />
              {user.role === 'user' && (
                <>
                  <Route path="/onlinework" element={<OnlineWork />} />
                  <Route path="/daysales" element={<DaySales />} />
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <Route path="/onlinework" element={<OnlineWork />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/daysales" element={<DaySales />} />
                  <Route path="/pending" element={<PendingPayments />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/password" element={<PasswordManager />} />
                  <Route path="/unaccount" element={<UnAccount />} />
                </>
              )}
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;