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
import Customer from './pages/Customer';
import DaySales from './pages/DaySales';
import PendingPayments from './pages/PendingPayments';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import OnlineWork from './pages/OnlineWork';
import PasswordManager from './pages/PasswordManager';
import UnAccount from './pages/UnAccount';
import MASResizer from './pages/MASResizer';
import ContactUs from './pages/ContactUs';
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
      default: '#28a1e7ff',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to bottom, #12a4d9 0%, #0d7aa3 50%, #085a7a 100%)',
          borderBottom: '4px #12a4d9 solid',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to bottom, #12a4d9 0%, #0d7aa3 50%, #085a7a 100%)',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          '&.css-179jehp': {
            background: 'linear-gradient(135deg, #12a4d9 0%, #0d7aa3 100%)',
          },
          '&.css-167fp6x': {
            backgroundColor: 'white',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
          fontWeight: 500,
          color: '#2c3e50',
          fontSize: '1rem',
          lineHeight: 1.7,
          letterSpacing: '0.3px',
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState({ name: 'Guest', role: 'admin' });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser({ name: 'Guest', role: 'admin' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box id="app-container" sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f0f3f6ff 0%, #e9ecef 100%)'
        }}>
          <Header />

          <Box id="main-content" sx={{ flex: 1, py: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/smartcard" element={<SmartCard />} />
              <Route path="/eseva" element={<ESevaForm />} />
              <Route path="/upi" element={<UPIPayment />} />
              <Route path="/whatsapp" element={<WhatsApp />} />
              <Route path="/mas-resizer" element={<MASResizer />} />
              <Route path="/contact" element={<ContactUs />} />
              {user.role === 'user' && (
                <>
                  <Route path="/onlinework" element={<OnlineWork />} />
                  <Route path="/daysales" element={<DaySales />} />
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <Route path="/onlinework" element={<OnlineWork />} />
                  <Route path="/customers" element={<Customer />} />
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