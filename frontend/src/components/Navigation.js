import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Menu, MenuItem, 
  Box, Divider, ListItemIcon, ListItemText 
} from '@mui/material';
import { 
  Home, Calculate, CreditCard, AccountBalance, 
  Description, Build, Business, ExpandMore, ChevronRight 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState({});
  const [subMenuAnchor, setSubMenuAnchor] = useState({});

  const handleMenuOpen = (event, menuName) => {
    setAnchorEl({ ...anchorEl, [menuName]: event.currentTarget });
  };

  const handleMenuClose = (menuName) => {
    setAnchorEl({ ...anchorEl, [menuName]: null });
    setSubMenuAnchor({});
  };

  const handleSubMenuOpen = (event, subMenuName) => {
    setSubMenuAnchor({ ...subMenuAnchor, [subMenuName]: event.currentTarget });
  };

  const handleSubMenuClose = (subMenuName) => {
    setSubMenuAnchor({ ...subMenuAnchor, [subMenuName]: null });
  };

  const menuItems = {
    services: {
      type: 'nested',
      items: {
        'CSC Service': [
          { label: 'Digital Seva Login', url: 'https://digitalseva.csc.gov.in/#' },
          { label: 'Digi Pay Lite', url: 'https://agent.paycsc.in' },
          { label: 'Digi Pay', url: 'https://digipayweb.csccloud.in/' },
          { label: 'CSC Transport', url: 'https://cscsafar.in/' },
          { label: 'DigiMail Login', url: 'https://mail.digimail.in' },
          { label: 'CSC My Account', url: 'https://register.csc.gov.in/myaccount/login' },
          { label: 'CSC Academy', url: 'https://cscacademy.org/' },
          { label: 'CSC Cloud', url: 'https://csccloud.in/' },
          { label: 'CSC e-Governance', url: 'https://csc.gov.in/' }
        ],
        'Aadhar': [
          { label: 'My Aadhar', url: 'https://myaadhaar.uidai.gov.in/' },
          { label: 'New Enrollment Status', url: 'http://resident.uidai.gov.in/check-aadhaar-status' },
          { label: 'Online Update Status', url: 'https://ssup.uidai.gov.in/checkSSUPStatus/checkupdatestatus' },
          { label: 'Verify Aadhar', url: 'http://resident.uidai.gov.in/aadhaarverification' },
          { label: 'Download E-Aadhar', url: 'http://eaadhaar.uidai.gov.in/' },
          { label: 'PVC Card', url: 'https://residentpvc.uidai.gov.in/order-pvcreprint.php' },
          { label: 'Aadhar Update History', url: 'https://resident.uidai.gov.in/aadhaarupdatehistory' },
          { label: 'Virtual ID Generator', url: 'https://resident.uidai.gov.in/vid-generation' },
          { label: 'Aadhar Lock/Unlock', url: 'https://resident.uidai.gov.in/aadhaar-lock-unlock' },
          { label: 'Mobile Update', url: 'https://ssup.uidai.gov.in/' },
          { label: 'Email Update', url: 'https://ssup.uidai.gov.in/' },
          { label: 'Address Update', url: 'https://ssup.uidai.gov.in/' }
        ],
        'Central': [
          { label: 'IRCTC Train Booking', url: 'https://www.irctc.co.in/' },
          { label: 'CSC Train Booking', url: 'https://cscsafar.in/' },
          { label: 'E Court Services', url: 'https://services.ecourts.gov.in/' },
          { label: 'Voter Services', url: 'https://voters.eci.gov.in/' },
          { label: 'PM Kisan', url: 'https://pmkisan.gov.in/' },
          { label: 'Passport Services', url: 'https://www.passportindia.gov.in/AppOnlineProject/welcomeLink' },
          { label: 'Income Tax e-Filing', url: 'https://www.incometax.gov.in/iec/foportal/' },
          { label: 'EPF Services', url: 'https://unifiedportal-emp.epfindia.gov.in/publicPortal/no-auth/miscellanous/home/loadHomePage' },
          { label: 'GST Portal', url: 'https://www.gst.gov.in/' },
          { label: 'Digilocker', url: 'https://digilocker.gov.in/' },
          { label: 'UMANG App', url: 'https://web.umang.gov.in/' },
          { label: 'Ayushman Bharat', url: 'https://pmjay.gov.in/' },
          { label: 'Jan Aushadhi', url: 'https://janaushadhi.gov.in/' },
          { label: 'Skill India', url: 'https://www.skillindia.gov.in/' }
        ],
        'TN Sewa': [
          { label: 'TN e-Sevai', url: 'https://www.tnesevai.tn.gov.in/Default.aspx' },
          { label: 'Check Status', url: 'https://tnedistrict.tn.gov.in/mislogin/out_status.xhtml' },
          { label: 'EB Bill Payment', url: 'https://www.tnebnet.org/qwp/qpay' },
          { label: 'EB Login', url: 'https://www.tnebnet.org/awp/login' },
          { label: 'EB New Connection', url: 'https://www.tnebnet.org/awp/login' },
          { label: 'Ration Card Services', url: 'https://tnpds.gov.in' },
          { label: 'Patta Services', url: 'https://eservices.tn.gov.in/eservicesnew/land/chittaNewRuralTamil.html?lan=ta' },
          { label: 'Birth Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Death Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Marriage Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Community Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Income Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Nativity Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'No Male Child Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Legal Heir Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Widow Certificate', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Old Age Pension', url: 'https://tnedistrict.tn.gov.in/' },
          { label: 'Disability Certificate', url: 'https://tnedistrict.tn.gov.in/' }
        ]
      }
    },
    financial: {
      type: 'nested',
      items: {
        'Banking': [
          { label: 'PAN Card - NSDL', url: 'https://tin.tin.nsdl.com/pan2/' },
          { label: 'PAN Card - UTI', url: 'https://www.pan.utiitsl.com/' },
          { label: 'Instant E-PAN', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan/getNewEpan' },
          { label: 'State Bank', url: 'https://retail.onlinesbi.sbi/retail/login.htm' },
          { label: 'Indian Bank', url: 'https://www.indianbank.net.in/jsp/startIB.jsp' },
          { label: 'HDFC Bank', url: 'https://netbanking.hdfcbank.com/netbanking/' },
          { label: 'ICICI Bank', url: 'https://infinity.icicibank.com/corp/Login.jsp' },
          { label: 'Axis Bank', url: 'https://www.axisbank.com/retail/online-services/axis-bank-internet-banking' },
          { label: 'Canara Bank', url: 'https://netbanking.canarabank.com/' },
          { label: 'Bank of Baroda', url: 'https://www.bobibanking.com/RetailLogin.jsp' },
          { label: 'Union Bank', url: 'https://www.unionbankonline.co.in/retail/' },
          { label: 'City Union Bank', url: 'https://www.cityunionbank.com/internet-banking' },
          { label: 'Indian Overseas Bank', url: 'https://iobnet.co.in/' },
          { label: 'Central Bank', url: 'https://www.centralbankofindia.co.in/en/home' }
        ],
        'Recharge': [
          { label: 'Mobile Recharge', url: 'https://www.paytm.com/mobile-recharge' },
          { label: 'DTH Recharge', url: 'https://www.paytm.com/dth-recharge' },
          { label: 'Data Card Recharge', url: 'https://www.paytm.com/datacard-recharge' },
          { label: 'FASTag Recharge', url: 'https://www.paytm.com/fastag-recharge' },
          { label: 'Metro Card Recharge', url: 'https://www.paytm.com/metro-recharge' }
        ],
        'Insurance': [
          { label: 'LIC Premium', url: 'https://www.licindia.in/' },
          { label: 'Vehicle Insurance', url: 'https://www.irdai.gov.in/' },
          { label: 'Health Insurance', url: 'https://www.irdai.gov.in/' },
          { label: 'Term Insurance', url: 'https://www.irdai.gov.in/' }
        ]
      }
    },
    tools: {
      type: 'nested',
      items: {
        'Utility': [
          { label: 'Image Resize', url: 'https://www.resizepixel.com/' },
          { label: 'PDF Compress', url: 'https://www.ilovepdf.com/compress_pdf' },
          { label: 'Background Remove', url: 'https://www.remove.bg/upload' },
          { label: 'Postal Tracker', url: 'https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx' },
          { label: 'Speech to Text', url: 'https://speechtyping.com/voice-typing/speech-to-text-tamil' },
          { label: 'PDF Merge', url: 'https://www.ilovepdf.com/merge_pdf' },
          { label: 'PDF Split', url: 'https://www.ilovepdf.com/split_pdf' },
          { label: 'Image to PDF', url: 'https://www.ilovepdf.com/jpg_to_pdf' },
          { label: 'QR Code Generator', url: 'https://www.qr-code-generator.com/' },
          { label: 'Color Picker', url: 'https://www.google.com/search?q=color+picker' },
          { label: 'Unit Converter', url: 'https://www.google.com/search?q=unit+converter' },
          { label: 'Password Generator', url: 'https://www.google.com/search?q=password+generator' }
        ],
        'Business': [
          { label: 'Online Work', url: '/onlinework' },
          { label: 'Day Sales', url: '/daysales' },
          { label: 'Customer Management', url: '/customers' },
          { label: 'Pending Payments', url: '/pending' },
          { label: 'Expenses', url: '/expenses' },
          { label: 'UnAccount', url: '/unaccount' },
          { label: 'Password Manager', url: '/password' },
          { label: 'Reports', url: '/reports' }
        ]
      }
    }
  };

  const renderMenu = (menuName, menuData) => {
    if (menuData.type === 'simple') {
      return (
        <Menu
          anchorEl={anchorEl[menuName]}
          open={Boolean(anchorEl[menuName])}
          onClose={() => handleMenuClose(menuName)}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 3,
              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
              border: 'none',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              minWidth: 220
            }
          }}
        >
          {menuData.items.map((item, index) => (
            <MenuItem 
              key={index} 
              onClick={() => {
                if (item.url.startsWith('/')) {
                  // Internal link
                } else {
                  window.open(item.url, '_blank');
                }
                handleMenuClose(menuName);
              }}
              component={item.url.startsWith('/') ? Link : 'div'}
              to={item.url.startsWith('/') ? item.url : undefined}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'linear-gradient(135deg, #1757b8 0%, #2196F3 100%)',
                  color: 'white',
                  transform: 'translateX(8px)'
                }
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      );
    } else if (menuData.type === 'nested') {
      return (
        <Menu
          anchorEl={anchorEl[menuName]}
          open={Boolean(anchorEl[menuName])}
          onClose={() => handleMenuClose(menuName)}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 3,
              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
              border: 'none',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              minWidth: 250
            }
          }}
        >
          {Object.keys(menuData.items).map((subMenuName, index) => (
            <MenuItem 
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                const subMenuKey = `${menuName}_${subMenuName}`;
                if (subMenuAnchor[subMenuKey]) {
                  handleSubMenuClose(subMenuKey);
                } else {
                  handleSubMenuOpen(e, subMenuKey);
                }
              }}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                backgroundColor: subMenuAnchor[`${menuName}_${subMenuName}`] ? 'rgba(23,87,184,0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(23,87,184,0.1)',
                  color: '#1757b8',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <span>{subMenuName}</span>
              <ChevronRight sx={{ 
                ml: 1, 
                fontSize: 18,
                transform: subMenuAnchor[`${menuName}_${subMenuName}`] ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} />
            </MenuItem>
          ))}
          {Object.keys(menuData.items).map((subMenuName, index) => (
            <Menu
              key={`submenu-${index}`}
              anchorEl={subMenuAnchor[`${menuName}_${subMenuName}`]}
              open={Boolean(subMenuAnchor[`${menuName}_${subMenuName}`])}
              onClose={() => handleSubMenuClose(`${menuName}_${subMenuName}`)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  border: 'none',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  ml: 1,
                  minWidth: 200
                }
              }}
            >
              {menuData.items[subMenuName].map((item, subIndex) => (
                <MenuItem 
                  key={subIndex}
                  onClick={() => {
                    if (item.url.startsWith('/')) {
                      // Internal link
                    } else {
                      window.open(item.url, '_blank');
                    }
                    handleMenuClose(menuName);
                  }}
                  component={item.url.startsWith('/') ? Link : 'div'}
                  to={item.url.startsWith('/') ? item.url : undefined}
                  sx={{
                    py: 1.2,
                    px: 2.5,
                    borderRadius: 2,
                    mx: 1,
                    my: 0.3,
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'linear-gradient(135deg, #ff8300 0%, #FF9800 100%)',
                      color: 'white',
                      transform: 'translateX(6px)'
                    }
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          ))}
        </Menu>
      );
    }
  };

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      borderBottom: '2px solid rgba(255,255,255,0.1)'
    }}>
      <Toolbar sx={{ minHeight: '56px' }}>
        <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          startIcon={<Home />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: 'linear-gradient(135deg, #ff8300 0%, #FF9800 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(255,131,0,0.4)'
            }
          }}
        >
          Home
        </Button>

        {/* Services Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, 'services')}
          endIcon={<ExpandMore sx={{ 
            transform: anchorEl.services ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            background: anchorEl.services ? 'linear-gradient(135deg, #1757b8 0%, #2196F3 100%)' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: 'linear-gradient(135deg, #1757b8 0%, #2196F3 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(23,87,184,0.4)'
            }
          }}
        >
          Services
        </Button>
        {renderMenu('services', menuItems.services)}

        {/* Financial Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, 'financial')}
          endIcon={<ExpandMore sx={{ 
            transform: anchorEl.financial ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            background: anchorEl.financial ? 'linear-gradient(135deg, #1757b8 0%, #2196F3 100%)' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: 'linear-gradient(135deg, #1757b8 0%, #2196F3 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(23,87,184,0.4)'
            }
          }}
        >
          Financial
        </Button>
        {renderMenu('financial', menuItems.financial)}

        {/* Tools Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, 'tools')}
          endIcon={<ExpandMore sx={{ 
            transform: anchorEl.tools ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            background: anchorEl.tools ? 'linear-gradient(135deg, #1757b8 0%, #2196F3 100%)' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: 'linear-gradient(135deg, #1757b8 0%, #2196F3 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(23,87,184,0.4)'
            }
          }}
        >
          Tools
        </Button>
        {renderMenu('tools', menuItems.tools)}

        {/* Local Pages */}
        <Button color="inherit" component={Link} to="/calculator" startIcon={<Calculate />}
          sx={{ mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
            '&:hover': { background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
              transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(76,175,80,0.4)' } }}>
          Calculator
        </Button>
        <Button color="inherit" component={Link} to="/smartcard" startIcon={<CreditCard />}
          sx={{ mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
            '&:hover': { background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
              transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(156,39,176,0.4)' } }}>
          Smart Card
        </Button>
        <Button color="inherit" component={Link} to="/upi" startIcon={<AccountBalance />}
          sx={{ mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
            '&:hover': { background: 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)',
              transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(244,67,54,0.4)' } }}>
          UPI Payment
        </Button>
        <Button color="inherit" component={Link} to="/whatsapp"
          sx={{ mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
            '&:hover': { background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
              transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(37,211,102,0.4)' } }}>
          WhatsApp
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;