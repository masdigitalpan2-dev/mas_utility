import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Menu, MenuItem, 
  Box, Divider, ListItemIcon, ListItemText 
} from '@mui/material';
import { 
  Home, Calculate, CreditCard, AccountBalance, Payment,
  Description, Build, Business, ExpandMore, KeyboardArrowRight, Analytics, ContactMail,
  ChevronRight, KeyboardArrowDown, AddCircleOutline, RemoveCircleOutline, 
  PlayArrow, ExpandLess, UnfoldMore, UnfoldLess, FiberManualRecord, RadioButtonUnchecked
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState({});
  const [subMenuAnchor, setSubMenuAnchor] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);
  const [mousePositions, setMousePositions] = useState({});
  
  // Global mouse tracking for submenu collapse
  React.useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      Object.keys(subMenuAnchor).forEach(subMenuKey => {
        if (subMenuAnchor[subMenuKey]) {
          const submenuElement = document.querySelector(`[data-submenu="${subMenuKey}"]`);
          const parentElement = subMenuAnchor[subMenuKey];
          
          if (submenuElement && parentElement) {
            const submenuRect = submenuElement.getBoundingClientRect();
            const parentRect = parentElement.getBoundingClientRect();
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Check if mouse is outside both parent and submenu regions
            const outsideParent = mouseX < parentRect.left || mouseX > parentRect.right || 
                                mouseY < parentRect.top || mouseY > parentRect.bottom;
            const outsideSubmenu = mouseX < submenuRect.left || mouseX > submenuRect.right || 
                                 mouseY < submenuRect.top || mouseY > submenuRect.bottom;
            
            if (outsideParent && outsideSubmenu) {
              setTimeout(() => {
                handleSubMenuClose(subMenuKey);
                setHoveredItem(null);
              }, 200);
            }
          }
        }
      });
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    return () => document.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [subMenuAnchor]);

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

  const handleStarECLink = (url) => {
    if (url.includes('mystarec.com')) {
      // Check if www.mystarec.com tab already exists
      let existingTab = null;
      try {
        for (let i = 0; i < window.length; i++) {
          if (window[i].location.hostname === 'www.mystarec.com') {
            existingTab = window[i];
            break;
          }
        }
      } catch (e) {
        // Cross-origin access blocked, fallback to checking open tabs
      }
      
      if (existingTab) {
        existingTab.focus();
      } else {
        window.open(url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
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
          { label: 'CSC Train Booking', url: 'https://cscsafar.in/' },
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
          { label: 'TN Voter Services', url: 'https://www.elections.tn.gov.in/Electoral_Services.aspx' },
          { label: 'PM Kisan', url: 'https://pmkisan.gov.in/' },
          { label: 'Passport Services', url: 'https://www.passportindia.gov.in/AppOnlineProject/welcomeLink' },
          { label: 'PF Services', url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/' },
          { label: 'Udyam', url: 'https://udyamregistration.gov.in/UdyamRegistration.aspx' },
          { label: 'Food FSSAI', url: 'https://foscos.fssai.gov.in/' },
          { label: 'Digilocker', url: 'https://digilocker.gov.in/' },
          { label: 'UMANG App', url: 'https://web.umang.gov.in/' },
          { label: 'Ayushman Bharat', url: 'https://pmjay.gov.in/' },
          { label: 'Jan Aushadhi', url: 'https://janaushadhi.gov.in/' },
          { label: 'Skill India', url: 'https://www.skillindia.gov.in/' }
        ],
        'Court': [
          { label: 'E Court Services', url: 'https://services.ecourts.gov.in/' },
          { label: 'Aryalur court', url: 'https://ariyalur.dcourts.gov.in/case-status-search-by-case-number/' }
        ],
        'Tax Dept': [
          { label: 'Income Tax e-Filing', url: 'https://www.incometax.gov.in/iec/foportal/' },
          { label: 'GST Portal', url: 'https://www.gst.gov.in/' }
        ],

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
        ]
      }
    },
    tnsewa: {
      type: 'nested',
      items: {
        'TN E-SEWA': [
          { label: 'TN e SEVAI', url: 'https://www.tnesevai.tn.gov.in/Default.aspx' },
          { label: 'CHECK STATUS', url: 'https://tnedistrict.tn.gov.in/mislogin/out_status.xhtml' },
          { label: 'CERTIFICATE', url: 'https://tnedistrict.tn.gov.in/tneda/VerifyCerti.xhtml' },
          { label: 'CERTIFICATE OLD', url: 'https://edistricts.tn.gov.in/revenue/verifyCertificate.html' },
          { label: 'POTHU E SERVICES', url: 'https://grand.hisites.xyz/admin/dashboard' }
        ],
        'Electricity': [
          { label: 'EB Bill', url: 'https://www.tnebnet.org/qwp/qpay' },
          { label: 'LOGIN', url: 'https://www.tnebnet.org/awp/login' },
          { label: 'Application', url: 'https://app1.tangedco.org/nsconline/index.xhtml' },
          { label: 'FORMS', url: 'https://www.tangedco.gov.in/formgallery1.html' },
          { label: 'MOBILE UPDATE', url: 'https://www.tnebltd.gov.in/mobilenoentry/chseuser.xhtml' },
          { label: 'AADHAR LINK', url: 'https://adhar.tnebltd.org/adharupload/' }
        ],
        'RATION CARD': [
          { label: 'HOME', url: 'https://tnpds.gov.in' },
          { label: 'APPLY NEW CARD', url: 'https://tnpds.gov.in/pages/registeracard/register-a-card.xhtml' },
          { label: 'NEW CARD STATUS', url: 'https://tnpds.gov.in/pages/registeracard/register-a-card-status.xhtml' },
          { label: 'DUPLICATE CARD', url: 'https://tnpds.gov.in/login.xhtml' },
          { label: 'MEMBER ADD/MODIFY', url: 'https://tnpds.gov.in/login.xhtml' },
          { label: 'REPORT', url: 'https://tnpds.gov.in/pages/reports/pds-report-taluk.xhtml' },
          { label: 'Smart Card', url: '/smartcard' }
        ],
        'REVENUE': [
          { label: 'PATTA', url: 'https://eservices.tn.gov.in/eservicesnew/land/chittaNewRuralTamil.html?lan=ta' },
          { label: 'PATTA NEW', url: 'https://clip.tn.gov.in/clip/landstatus_tamil.html?id=1' },
          { label: 'FMB', url: 'https://eservices.tn.gov.in/eservicesnew/land/chittaNewRuralFMBTamil.html?lan=ta' },
          { label: 'PATTA/FMB OLD', url: 'https://eservices.tn.gov.in/eservicesnew/land/chitta_ta.html?lan=ta' },
          { label: 'VERIFY PATTA', url: 'https://eservices.tn.gov.in/eservicesnew/land/verify_chitta_ta.html?lan=ta' },
          { label: 'APPLICATION STATUS', url: 'https://eservices.tn.gov.in/eservicesnew/login/Appstatus.html' }
        ],
        'PETITION': [
          { label: 'COLLECTOR', url: 'https://gdp.tn.gov.in/' },
          { label: 'CM 1100', url: 'https://cmhelpline.tnega.org/portal/en/home' },
          { label: 'CM CELL', url: 'http://cmcell.tn.gov.in/' }
        ],
        'POLICE': [
          { label: 'Traffic Fine', url: 'https://echallan.parivahan.gov.in/index/accused-challan' },
          { label: 'Vehicle Related Service', url: 'https://vahan.parivahan.gov.in/vahanservice/vahan/ui/statevalidation/homepage.xhtml' },
          { label: 'Driving Related Service', url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do' },
          { label: 'Register Online Complaint', url: 'https://eservices.tnpolice.gov.in/CCTNSNICSDC/ComplaintRegistrationPage' },
          { label: 'Police Verification', url: 'https://eservices.tnpolice.gov.in/CCTNSNICSDC/NewRegister' },
          { label: 'Lost Document Report', url: 'https://eservices.tnpolice.gov.in/CCTNSNICSDC/LostDocumentReport' }
        ],
        'TN SERVICE': [
          { label: 'BIRTH & DEATH CERTI', url: 'http://www.crstn.org/birth_death_tn/' },
          { label: 'GOVT E-CHALLAN', url: 'https://www.karuvoolam.tn.gov.in/challan/echallan' },
          { label: 'CM HEALTH SEARCH', url: 'https://claim.cmchistn.com/Payer/PayerMembersearch.aspx' }
        ],
        'TN EMPLOYMENT': [
          { label: 'TN EMPLOYMENT', url: 'https://tnvelaivaaippu.gov.in/' },
          { label: 'RENEWAL', url: 'https://tnvelaivaaippu.gov.in/Empower/LoginAction.htm' },
          { label: 'PG ADD', url: 'https://employmentexchange.tn.gov.in/Empower/' }
        ],
        'TN LABOUR': [
          { label: 'UNORGANIZED LABOUR', url: 'https://tnuwwb.tn.gov.in/' },
          { label: 'UNORGANIZED LABOUR RENEWAL', url: 'https://tnuwwb.tn.gov.in/applicationlives/applicationlive' },
          { label: 'CONSTRUCTION WORK', url: 'https://labour.tn.gov.in/' }
        ],
        'SCHOOL': [
          { label: 'GOVERNMENT EXAM', url: 'https://apply1.tndge.org/online-public-service' }
        ]

        
      }
    },
    business: {
      type: 'simple',
      items: [
        { label: 'Online Work', url: '/onlinework' },
        { label: 'Day Sales', url: '/daysales' },
        { label: 'Customer Management', url: '/customers' },
        { label: 'Pending Payments', url: '/pending' },
        { label: 'Expenses', url: '/expenses' },
        { label: 'UnAccount', url: '/unaccount' },
        { label: 'Password Manager', url: '/password' },
        { label: 'Reports', url: '/reports' }
      ]
    },

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
              background: 'linear-gradient(145deg, #e8f5e8 0%, #f1f8e9 100%)',
              minWidth: 220
            }
          }}
        >
          {menuData.items.map((item, index) => (
            <MenuItem 
              key={index} 
              onClick={() => {
                if (menuName === 'business' || menuName === 'mas') {
                  window.open(window.location.origin + item.url, '_blank');
                } else if (item.url.startsWith('/')) {
                  // Internal link
                } else {
                  window.open(item.url, '_blank');
                }
                handleMenuClose(menuName);
              }}
              component={(menuName === 'business' || menuName === 'mas') ? 'div' : (item.url.startsWith('/') ? Link : 'div')}
              to={(menuName === 'business' || menuName === 'mas') ? undefined : (item.url.startsWith('/') ? item.url : undefined)}
              sx={{
                py: 1.2,
                px: 2.5,
                borderRadius: 2,
                mx: 1,
                my: 0.2,
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'linear-gradient(135deg, #9d17b8ff 0%, #2196F3 100%)',
                  color: '#ffeb3b',
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
          MenuListProps={{
            onMouseLeave: () => {
              setTimeout(() => {
                if (!Object.keys(subMenuAnchor).some(key => key.startsWith(`${menuName}_`))) {
                  handleMenuClose(menuName);
                }
              }, 100);
            }
          }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 3,
              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
              border: 'none',
              background: '#30b3e3e4',
              minWidth: 250
            }
          }}
        >
          {Object.keys(menuData.items).map((subMenuName, index) => {
            const subMenuKey = `${menuName}_${subMenuName}`;
            return (
              <React.Fragment key={`menu-${index}`}>
                {index > 0 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mx: 1 }} />}
                <MenuItem
                onMouseEnter={(e) => {
                  setMousePositions(prev => ({ ...prev, [subMenuKey]: { x: e.clientX, y: e.clientY } }));
                  
                  // Close all other submenus immediately
                  setSubMenuAnchor(prev => {
                    const newState = {};
                    Object.keys(prev).forEach(key => {
                      if (key === subMenuKey) {
                        newState[key] = prev[key];
                      }
                    });
                    return newState;
                  });
                  
                  setHoveredItem(subMenuKey);
                  setHoveredSubMenu(subMenuKey);
                  handleSubMenuOpen(e, subMenuKey);
                }}
                onMouseMove={(e) => {
                  const currentX = e.clientX;
                  const currentY = e.clientY;
                  const prevPos = mousePositions[subMenuKey] || { x: currentX, y: currentY };
                  
                  // Check if mouse is moving towards submenu (right direction)
                  const movingRight = currentX > prevPos.x;
                  
                  if (movingRight && !subMenuAnchor[subMenuKey]) {
                    handleSubMenuOpen(e, subMenuKey);
                  }
                  
                  setMousePositions(prev => ({ ...prev, [subMenuKey]: { x: currentX, y: currentY } }));
                }}
                onMouseLeave={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = e.clientX;
                  const mouseY = e.clientY;
                  
                  // If mouse is moving towards submenu area, don't close
                  if (mouseX > rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
                    return;
                  }
                  
                  // If mouse is moving away from submenu area, close it
                  if (mouseX < rect.left) {
                    setTimeout(() => {
                      handleSubMenuClose(subMenuKey);
                      setHoveredItem(null);
                    }, 100);
                  }
                }}
                sx={{
                  py: 1.0,
                  px: 2,
                  borderRadius: 2,
                  mx: 1,
                  my: 0.2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: hoveredItem === subMenuKey ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: hoveredItem === subMenuKey ? '#ffffff' : '#e5e7eb',
                  transform: hoveredItem === subMenuKey ? 'translateX(8px)' : 'translateX(0px)',
                  borderLeft: hoveredItem === subMenuKey ? '3px solid #ffffff' : '3px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
                    color: '#ffffff !important',
                    transform: 'translateX(4px) !important',
                    borderLeft: '2px solid #ffffff !important'
                  }
                }}
              >
                <span>{subMenuName}</span>
                {subMenuAnchor[subMenuKey] ? 
                  <FiberManualRecord sx={{ 
                    ml: 1, 
                    fontSize: 12,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: 1,
                    color: '#ffeb3b',
                    filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.3))'
                  }} /> :
                  <RadioButtonUnchecked sx={{ 
                    ml: 1, 
                    fontSize: 12,
                    transform: hoveredItem === subMenuKey ? 'scale(1.3)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: hoveredItem === subMenuKey ? 1 : 0.7,
                    color: hoveredItem === subMenuKey ? '#ffffff' : '#e5e7eb',
                    filter: hoveredItem === subMenuKey ? 'drop-shadow(0 2px 4px rgba(255,255,255,0.3))' : 'none'
                  }} />
                }
              </MenuItem>
              </React.Fragment>
            );
          })}
          {Object.keys(menuData.items).map((subMenuName, index) => {
            const subMenuKey = `${menuName}_${subMenuName}`;
            return (
              <Menu
                key={`submenu-${index}`}
                anchorEl={subMenuAnchor[subMenuKey]}
                open={Boolean(subMenuAnchor[subMenuKey])}
                onClose={() => {
                  setHoveredSubMenu(null);
                  handleSubMenuClose(subMenuKey);
                }}
                MenuListProps={{
                  onMouseEnter: () => setHoveredSubMenu(subMenuKey),
                  onMouseLeave: () => {
                    setTimeout(() => {
                      setHoveredItem(null);
                      setHoveredSubMenu(null);
                      handleSubMenuClose(subMenuKey);
                    }, 100);
                  }
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                PaperProps={{
                  'data-submenu': subMenuKey,
                  sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    background: '#12a4d9',
                    ml: 0.5,
                    minWidth: 220
                  }
                }}
              >
                {menuData.items[subMenuName].map((item, subIndex) => (
                  <React.Fragment key={`submenu-${subIndex}`}>
                    {subIndex > 0 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mx: 0 }} />}
                    <MenuItem
                    onClick={() => {
                      if (menuName === 'business') {
                        window.open(window.location.origin + item.url, '_blank');
                      } else if (item.url.startsWith('/')) {
                        // Internal link
                      } else {
                        handleStarECLink(item.url);
                      }
                      handleMenuClose(menuName);
                    }}
                    component={menuName === 'business' ? 'div' : (item.url.startsWith('/') ? Link : 'div')}
                    to={menuName === 'business' ? undefined : (item.url.startsWith('/') ? item.url : undefined)}
                    sx={{
                      py: 0,
                      pl: 2,
                      pr: 0,
                      borderRadius: 0,
                      mx: 0,
                      my: 0,
                      minHeight: 0,
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#e5e7eb',
                      cursor: 'grab',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
                        color: '#ffffff !important',
                        transform: 'translateX(4px)',
                        borderLeft: '2px solid #ffffff'
                      }
                    }}
                  >
                    {item.label}
                    </MenuItem>
                  </React.Fragment>
                ))}
              </Menu>
            );
          })}
        </Menu>
      );
    }
  };

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
      boxShadow: '0 4px 20px rgba(30, 58, 138, 0.3)',
      borderBottom: '3px solid #3acdfaff'
    }}>
      <Toolbar sx={{ minHeight: '56px' }}>
        <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          startIcon={<Home />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px',
            background: location.pathname === '/' ? '#12a4d9' : 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: 'linear-gradient(135deg, #0d7aa3 0%, #085a7a 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(13,122,163,0.4)'
            }
          }}
        >
          Home
        </Button>

        {/* Services Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, 'services')}
          endIcon={<KeyboardArrowDown sx={{ 
            transform: anchorEl.services ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: 22
          }} />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px', minWidth: '100px',
            background: anchorEl.services ? '#12a4d9' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: '#12a4d9',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)'
            }
          }}
        >
          Services
        </Button>
        {renderMenu('services', menuItems.services)}

        {/* TN SEWA Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, 'tnsewa')}
          endIcon={<KeyboardArrowDown sx={{ 
            transform: anchorEl.tnsewa ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: 22
          }} />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px', minWidth: '100px',
            background: anchorEl.tnsewa ? '#12a4d9' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: '#12a4d9',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)'
            }
          }}
        >
          TN SEWA
        </Button>
        {renderMenu('tnsewa', menuItems.tnsewa)}

        {/* Financial Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, 'financial')}
          endIcon={<KeyboardArrowDown sx={{ 
            transform: anchorEl.financial ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: 22
          }} />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px', minWidth: '100px',
            background: anchorEl.financial ? '#12a4d9' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: '#12a4d9',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)'
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
          endIcon={<KeyboardArrowDown sx={{ 
            transform: anchorEl.tools ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: 22
          }} />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px', minWidth: '100px',
            background: anchorEl.tools ? '#12a4d9' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: '#12a4d9',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)'
            }
          }}
        >
          Tools
        </Button>
        {renderMenu('tools', menuItems.tools)}

        {/* Local Pages */}
        <Button color="inherit" component={Link} to="/calculator"
          sx={{ mx: 0.5, px: 2, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px', minWidth: '40px',
            background: '#4fa9cdff', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
            '&:hover': { background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
              transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(76,175,80,0.4)' } }}>
          <img src="/Images/calculator.png" alt="Calculator" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
        </Button>

        <Button color="inherit" component={Link} to="/upi"
          sx={{ mx: 0.5, px: 2, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px', minWidth: '40px',
            background: '#4fa9cdff', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
            '&:hover': { background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
              transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(255,107,53,0.4)' } }}>
          <img src="/Images/Google-pay.png" alt="UPI" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
        </Button>
        <Button color="inherit" component={Link} to="/whatsapp"
          sx={{ mx: 0.5, px: 2, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px', minWidth: '40px',
            background: '#4fa9cdff ', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
            '&:hover': { background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
              transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(37,211,102,0.4)' } }}>
          <img src="/Images/whatsapp.png" alt="WhatsApp" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
        </Button>
        
        <Button color="inherit" component={Link} to="/mas-resizer"
          sx={{ mx: 0.5, px: 2, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px', minWidth: '40px',
            background: '#4fa9cdff', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease',
            '&:hover': { background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
              transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(156,39,176,0.4)' } }}>
          <Build sx={{ fontSize: 24, color: '#ff6b35' }} />
        </Button>


        {/* Business Menu */}
        <Button
          color="inherit"
          onClick={(e) => handleMenuOpen(e, 'business')}
          startIcon={<Business />}
          endIcon={<KeyboardArrowDown sx={{ 
            transform: anchorEl.business ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: 22
          }} />}
          sx={{
            mx: 0.5, px: 3, py: 1.2, borderRadius: 3, textTransform: 'none', fontWeight: '600',
            minHeight: '40px',
            background: anchorEl.business ? '#12a4d9' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': { 
              background: '#12a4d9',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)'
            }
          }}
        >
          Business
        </Button>
        {renderMenu('business', menuItems.business)}




      </Toolbar>
    </AppBar>
  );
};

export default Navigation;