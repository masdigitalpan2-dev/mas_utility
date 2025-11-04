import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Box, Divider, Card, CardContent, Chip, IconButton, Tooltip, Alert, LinearProgress, Avatar, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Calculate, Save, Refresh, Assessment, TrendingUp, AccountBalance, Payment, CurrencyRupee, Analytics, Today, Receipt, Dashboard, Search, MoreVert, FilterList, GetApp, PictureAsPdf, TableChart, BarChart, Edit, Delete } from '@mui/icons-material';

const DaySales = () => {
  useEffect(() => {
    // Hide header and menu sections to save space
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const menuBar = document.querySelector('.menu-bar');
    const appBar = document.querySelector('.MuiAppBar-root');
    const muiBox = document.querySelector('.MuiBox-root.css-1lekzkb');
    const muiContainer = document.querySelector('.MuiContainer-root.MuiContainer-maxWidthXl.css-1rjtza7-MuiContainer-root');
    if (header) header.style.display = 'none';
    if (nav) nav.style.display = 'none';
    if (menuBar) menuBar.style.display = 'none';
    if (appBar) appBar.style.display = 'none';
    if (muiBox) muiBox.style.display = 'none';
    if (muiContainer) muiContainer.style.display = 'none';
    
    //const digitalCardsDigital = document.getElementById('stats-cards-Digital');
    //digitalCardsDigital.style.background='#d158e1e3';
    //digitalCardsDigital.style.backgroundColor='#d158e1e3';

    const digitalCards = document.querySelectorAll('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.css-um1mvb-MuiPaper-root-MuiCard-root');
    
    //const digitalCards = document.querySelectorAll("#stats-cards");
    digitalCards.forEach(card => {
      if (card.textContent.includes('Digital')) {
        card.style.background = '#d73febe3';
      }
      else if (card.textContent.includes('Cash')) {
        card.style.background = '#06B6D4';
        /*
        const cashIcon = document.createElement('span');
        cashIcon.innerHTML = '💰';
        cashIcon.style.fontSize = '1.2rem';
        cashIcon.style.marginRight = '8px';
        const firstChild = card.firstElementChild;
        if (firstChild && !card.querySelector('.cash-icon')) {
          cashIcon.className = 'cash-icon';
          firstChild.insertBefore(cashIcon, firstChild.firstChild);
        }
          */
      }
      else if (card.textContent.includes('Pending')) {
        card.style.background = '#fcbb59ff';
      }
      else if (card.textContent.includes('Expense')) {
        card.style.background = '#8BC34A';
      }
      else if (card.textContent.includes('Total')) {
        card.style.background = '#7A4218';
        /*
        const totalIcon = document.createElement('span');
        totalIcon.innerHTML = '🧮';
        totalIcon.style.fontSize = '1.2rem';
        totalIcon.style.marginRight = '8px';
        const firstChild = card.firstElementChild;
        if (firstChild && !card.querySelector('.total-icon')) {
          totalIcon.className = 'total-icon';
          firstChild.insertBefore(totalIcon, firstChild.firstChild);
        }
          */
      }
      else if (card.textContent.includes('Net')) {
        card.style.background = '#0047AB';
      }
      
    });
    
    const compactBoxes = document.querySelectorAll('.MuiBox-root.css-1azo4g9');
    compactBoxes.forEach(box => {
      box.style.height = '80px';
      box.style.minHeight = '80px';
      box.style.maxHeight = '80px';
    });
    
    const footerBox = document.querySelector('.MuiBox-root.css-1x2izsq');
    if (footerBox) footerBox.style.display = 'none';
    
    const cardContentElements = document.querySelectorAll('.css-71xg00-MuiCardContent-root:last-child');
    cardContentElements.forEach(element => {
      element.style.paddingBottom = '4px';
    });
    
    return () => {
      // Restore on cleanup
      if (header) header.style.display = '';
      if (nav) nav.style.display = '';
      if (menuBar) menuBar.style.display = '';
      if (appBar) appBar.style.display = '';
      if (muiBox) muiBox.style.display = '';
      if (muiContainer) muiContainer.style.display = '';
      
      digitalCards.forEach(card => {
        card.style.background = '';
      });
      
      compactBoxes.forEach(box => {
        box.style.height = '';
        box.style.minHeight = '';
        box.style.maxHeight = '';
      });
      
      if (footerBox) footerBox.style.display = '';
    };
  }, []);

  const [formData, setFormData] = useState({
    dateofappl: new Date().toISOString().split('T')[0],
    DigiPay: 0,
    DigiWallet: 0,
    starec: 0,
    Canara: 0,
    TNEGA: 0,
    SBI: 0,
    indBank: 0,
    ippb: 0,
    IPBC: 0,
    CUB: 0,
    INBA: 0,
    airtel: 0,
    sbi_J: 0,
    PayTM: 0,
    Jio: 0,
    TataPlay: 0,
    PendingNote: 0,
    amt500: 0,
    amt200: 0,
    amt100: 0,
    amt50: 0,
    amt20: 0,
    amt10: 0,
    amtChange: 0,
    totCash: 0,
    totalPending: 0,
    todayExp: 0,
    remarks: ''
  });
  
  const [salesRecords, setSalesRecords] = useState([
    { id: 1, dayDate: '2024-01-15', digipay: 1500, digiwallet: 800, starec: 200, SBI: 300, sbi_J: 100, indBank: 150, INBA: 200, ippb: 50, IPBC: 75, Canara: 120, CUB: 80, TNEGA: 90, airtel: 60, PayTM: 110, Jio: 70, TataPlay: 85, PendingNote: 25, totCash: 2500, totCum: 5300, totalPending: 500, todayExp: 200, TotalAll: 5100 },
    { id: 2, dayDate: '2024-01-14', digipay: 1200, digiwallet: 600, starec: 150, SBI: 250, sbi_J: 80, indBank: 120, INBA: 160, ippb: 40, IPBC: 60, Canara: 100, CUB: 65, TNEGA: 75, airtel: 50, PayTM: 90, Jio: 55, TataPlay: 70, PendingNote: 20, totCash: 2000, totCum: 4200, totalPending: 300, todayExp: 150, TotalAll: 4050 }
  ]);

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
    paymentType: 'all'
  });

  const [filteredRecords, setFilteredRecords] = useState(salesRecords);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportView, setReportView] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'https://localhost:52549/api/sales';

  const handleInputChange = (field, value) => {
    // Update form data without triggering re-render during typing
    formData[field] = value;
  };
  
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateCash = () => {
    const { amt500, amt200, amt100, amt50, amt20, amt10, amtChange } = formData;
    const totCash = ((parseInt(amt500) || 0) * 500) + ((parseInt(amt200) || 0) * 200) + ((parseInt(amt100) || 0) * 100) + ((parseInt(amt50) || 0) * 50) + ((parseInt(amt20) || 0) * 20) + ((parseInt(amt10) || 0) * 10) + (parseInt(amtChange) || 0);
    setFormData(prev => ({ ...prev, totCash }));
  };



  const handleSubmit = async () => {
    setLoading(true);
    
    const recordData = {
      dayDate: formData.dateofappl,
      digiPay: parseInt(formData.DigiPay) || 0,
      digiWallet: parseInt(formData.DigiWallet) || 0,
      starEC: parseInt(formData.starec) || 0,
      sbi: parseInt(formData.SBI) || 0,
      sbi_J: parseInt(formData.sbi_J) || 0,
      indBank: parseInt(formData.indBank) || 0,
      inba: parseInt(formData.INBA) || 0,
      ippb: parseInt(formData.ippb) || 0,
      ipbc: parseInt(formData.IPBC) || 0,
      sakthi: parseInt(formData.Canara) || 0,
      cub: parseInt(formData.CUB) || 0,
      tnega: parseInt(formData.TNEGA) || 0,
      airtel: parseInt(formData.airtel) || 0,
      payTM: parseInt(formData.PayTM) || 0,
      jio: parseInt(formData.Jio) || 0,
      tataPlay: parseInt(formData.TataPlay) || 0,
      pendingNote: parseInt(formData.PendingNote) || 0,
      totCash: parseInt(formData.totCash) || 0,
      totalPending: parseInt(formData.totalPending) || 0,
      todayExp: parseInt(formData.todayExp) || 0,
      remarks: formData.remarks || ''
    };
    
    try {
      const url = editingRecord ? `${API_BASE_URL}/${editingRecord.id}` : API_BASE_URL;
      const method = editingRecord ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
      });
      
      if (response.ok) {
        const savedRecord = await response.json();
        if (editingRecord) {
          setSalesRecords(prev => prev.map(r => r.id === editingRecord.id ? savedRecord : r));
          setEditingRecord(null);
          alert('Record updated successfully!');
        } else {
          setSalesRecords(prev => [savedRecord, ...prev]);
          alert('Record saved successfully!');
        }
        resetForm();
      } else {
        const errorText = await response.text();
        alert(`Error saving record: ${errorText}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      dateofappl: record.dayDate,
      DigiPay: record.digipay || 0,
      DigiWallet: record.digiwallet || 0,
      starec: record.starec || 0,
      SBI: record.SBI || 0,
      sbi_J: record.sbi_J || 0,
      indBank: record.indBank || 0,
      INBA: record.INBA || 0,
      ippb: record.ippb || 0,
      IPBC: record.IPBC || 0,
      Canara: record.Canara || 0,
      CUB: record.CUB || 0,
      TNEGA: record.TNEGA || 0,
      airtel: record.airtel || 0,
      PayTM: record.PayTM || 0,
      Jio: record.Jio || 0,
      TataPlay: record.TataPlay || 0,
      PendingNote: record.PendingNote || 0,
      amt500: 0, amt200: 0, amt100: 0, amt50: 0, amt20: 0, amt10: 0, amtChange: 0,
      totCash: record.totCash || 0,
      totalPending: record.totalPending || 0,
      todayExp: record.todayExp || 0,
      remarks: record.remarks || ''
    });
  };

  const handleWhatsApp = (record) => {
    const message = `𝕄𝔸𝕊 𝔻𝕚𝕘𝕚𝕥𝕒𝕝 Day Sales Report - ${record.dayDate}\n\n*DigiPay:* ₹${(record.digipay || 0).toLocaleString()}\n*DigiWallet:* ₹${(record.digiwallet || 0).toLocaleString()}\n*StarEC:* ₹${(record.starec || 0).toLocaleString()}\n*SBI:* ₹${(record.SBI || 0).toLocaleString()}\n*SBI(J):* ₹${(record.sbi_J || 0).toLocaleString()}\n*IndBank:* ₹${(record.indBank || 0).toLocaleString()}\n*INBA:* ₹${(record.INBA || 0).toLocaleString()}\n*IPPB:* ₹${(record.ippb || 0).toLocaleString()}\n*IPBC:* ₹${(record.IPBC || 0).toLocaleString()}\n*Canara:* ₹${(record.Canara || 0).toLocaleString()}\n*City:* ₹${(record.CUB || 0).toLocaleString()}\n*ESevai:* ₹${(record.TNEGA || 0).toLocaleString()}\n*AirTel:* ₹${(record.airtel || 0).toLocaleString()}\n*PayTM:* ₹${(record.PayTM || 0).toLocaleString()}\n*JIO:* ₹${(record.Jio || 0).toLocaleString()}\n*TataPlay:* ₹${(record.TataPlay || 0).toLocaleString()}\n*Pending:* ₹${(record.PendingNote || 0).toLocaleString()}\n\n💰 Summary:\n*Cash:* ₹${(record.totCash || 0).toLocaleString()}\n*Digital:* ₹${(record.totCum || 0).toLocaleString()}\n*Total:* ₹${(record.TotalAll || 0).toLocaleString()}\n\nGenerated by MAS Digital Service`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=919962040538&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDelete = async (recordId) => {
    const record = filteredRecords.find(r => r.id === recordId);
    
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      document.head.appendChild(script);
      await new Promise(resolve => script.onload = resolve);
    }
    
    const result = await window.Swal.fire({
      title: 'Delete Record?',
      html: `Date: <b>${record?.dayDate}</b><br>Total: <b>₹${(record?.TotalAll || 0).toLocaleString()}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      position: 'center'
    });
    
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/${recordId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setSalesRecords(prev => prev.filter(r => r.id !== recordId));
          await window.Swal.fire('Deleted!', 'Record has been deleted.', 'success');
        } else {
          const errorText = await response.text();
          await window.Swal.fire('Error!', `Failed to delete record: ${errorText}`, 'error');
        }
      } catch (error) {
        console.error('API Error:', error);
        await window.Swal.fire('Error!', 'Connection failed.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchSalesRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const records = await response.json();
        const formattedRecords = records.map(r => ({
          ...r,
          dayDate: r.dayDate ? r.dayDate.split('T')[0] : r.dayDate,
          digipay: r.digiPay,
          digiwallet: r.digiWallet,
          starec: r.starEC,
          SBI: r.sbi,
          sbi_J: r.sbi_J,
          indBank: r.indBank,
          INBA: r.inba,
          ippb: r.ippb,
          IPBC: r.ipbc,
          Canara: r.sakthi,
          CUB: r.cub,
          TNEGA: r.tnega,
          airtel: r.airtel,
          PayTM: r.payTM,
          Jio: r.jio,
          TataPlay: r.tataPlay,
          PendingNote: r.pendingNote,
          totCash: r.totCash,
          totCum: r.totCum,
          totalPending: r.totalPending,
          todayExp: r.todayExp,
          TotalAll: r.totalAll
        }));
        setSalesRecords(formattedRecords);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesRecords();
  }, []);

  const resetForm = () => {
    setFormData({
      dateofappl: new Date().toISOString().split('T')[0],
      DigiPay: 0, DigiWallet: 0, starec: 0, Canara: 0, TNEGA: 0, SBI: 0, indBank: 0, ippb: 0, IPBC: 0, CUB: 0,
      INBA: 0, airtel: 0, sbi_J: 0, PayTM: 0, Jio: 0, TataPlay: 0, PendingNote: 0,
      amt500: 0, amt200: 0, amt100: 0, amt50: 0, amt20: 0, amt10: 0, amtChange: 0, totCash: 0,
      totalPending: 0, todayExp: 0, remarks: ''
    });
    setEditingRecord(null);
  };

  // Filter records based on filters
  useEffect(() => {
    let filtered = salesRecords;
    
    if (filters.dateFrom) {
      filtered = filtered.filter(record => record.dayDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(record => record.dayDate <= filters.dateTo);
    }
    if (filters.minAmount) {
      filtered = filtered.filter(record => record.TotalAll >= parseInt(filters.minAmount));
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(record => record.TotalAll <= parseInt(filters.maxAmount));
    }
    if (filters.paymentType === 'digital') {
      filtered = filtered.filter(record => record.totCum > 0);
    } else if (filters.paymentType === 'cash') {
      filtered = filtered.filter(record => record.totCash > 0);
    }
    
    setFilteredRecords(filtered);
  }, [filters, salesRecords]);

  const InputField = ({ label, id, value, onChange, width = '60px' }) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'text.secondary', 
            fontSize: '0.6rem', 
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          {label}
        </Typography>
        <input
          tabIndex={0}
          placeholder="0"
          title={`Enter ${label} amount`}
          defaultValue={value || ''}
          onInput={(e) => {
            const newValue = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = newValue;
            formData[id] = newValue; // Direct assignment without state update
          }}
          onBlur={(e) => {
            updateFormData(id, e.target.value); // Update state only on blur
          }}
          style={{
            width: width,
            height: '28px',
            textAlign: 'center',
            border: '1px solid #8B5CF6',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 'medium',
            padding: '4px 8px',
            outline: 'none',
            backgroundColor: 'white',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#7C3AED';
            e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.1)';
            e.target.select();
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#8B5CF6';
            e.target.style.boxShadow = 'none';
            updateFormData(id, e.target.value);
          }}
        />
      </Box>
    );
  };

  const totalDigitalPaymentsAll = (parseInt(formData.DigiPay) || 0) + (parseInt(formData.DigiWallet) || 0) + (parseInt(formData.starec) || 0) + (parseInt(formData.SBI) || 0) + (parseInt(formData.indBank) || 0) + (parseInt(formData.INBA) || 0) + (parseInt(formData.airtel) || 0) + (parseInt(formData.PayTM) || 0) + (parseInt(formData.Jio) || 0) + (parseInt(formData.TataPlay) || 0) + (parseInt(formData.ippb) || 0) + (parseInt(formData.IPBC) || 0) + (parseInt(formData.CUB) || 0) + (parseInt(formData.Canara) || 0) + (parseInt(formData.TNEGA) || 0) + (parseInt(formData.sbi_J) || 0);
  
  const totalDigitalPayments = (parseInt(formData.DigiPay) || 0) +  (parseInt(formData.starec) || 0) + (parseInt(formData.SBI) || 0) + (parseInt(formData.indBank) || 0) + (parseInt(formData.INBA) || 0) + (parseInt(formData.airtel) || 0) + (parseInt(formData.PayTM) || 0) + (parseInt(formData.Jio) || 0) + (parseInt(formData.TataPlay) || 0) + (parseInt(formData.ippb) || 0) + (parseInt(formData.IPBC) || 0) + (parseInt(formData.CUB) || 0) + (parseInt(formData.Canara) || 0) + (parseInt(formData.sbi_J) || 0);
  const grandTotal = totalDigitalPaymentsAll + (parseInt(formData.totCash) || 0) - (parseInt(formData.todayExp) || 0);

  const exportToCSV = () => {
    const headers = ['Date', 'DigiPay', 'DigiWallet', 'StarEC', 'SBI', 'SBI(J)', 'IndBank', 'INBA', 'IPPB', 'IPBC', 'Canara', 'City', 'ESevai', 'AirTel', 'PayTM', 'JIO', 'TataPlay', 'Pending', 'Cash', 'Digital', 'Total'];
    const csvData = filteredRecords.map(record => [
      record.dayDate, record.digipay || 0, record.digiwallet || 0, record.starec || 0, record.SBI || 0, record.sbi_J || 0,
      record.indBank || 0, record.INBA || 0, record.ippb || 0, record.IPBC || 0, record.Canara || 0, record.CUB || 0,
      record.TNEGA || 0, record.airtel || 0, record.PayTM || 0, record.Jio || 0, record.TataPlay || 0,
      record.PendingNote || 0, record.totCash || 0, record.totCum || 0, record.TotalAll || 0
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateChart = () => {
    const table = document.getElementById('tbl-salerecord-report');
    if (!table || filteredRecords.length === 0) return;
    
    const firstRecord = filteredRecords[0];
    const labels = ['DigiPay', 'DigiWallet', 'StarEC', 'SBI', 'SBI(J)', 'IndBank', 'INBA', 'IPPB', 'IPBC', 'Canara', 'City', 'ESevai', 'AirTel', 'PayTM', 'JIO', 'TataPlay', 'Cash'];
    const data = [firstRecord.digipay||0, firstRecord.digiwallet||0, firstRecord.starec||0, firstRecord.SBI||0, firstRecord.sbi_J||0, firstRecord.indBank||0, firstRecord.INBA||0, firstRecord.ippb||0, firstRecord.IPBC||0, firstRecord.Canara||0, firstRecord.CUB||0, firstRecord.TNEGA||0, firstRecord.airtel||0, firstRecord.PayTM||0, firstRecord.Jio||0, firstRecord.TataPlay||0, firstRecord.totCash||0];
    const colors = ['#8B5CF6', '#7C3AED', '#6D28D9', '#10B981', '#059669', '#047857', '#065F46', '#06B6D4', '#0891B2', '#F59E0B', '#D97706', '#EF4444', '#DC2626', '#8B5A2B', '#92400E', '#7C2D12', '#374151'];
    
    const chartWindow = window.open('', '_blank', 'width=800,height=600');
    chartWindow.document.write(`
      <html><head><title>Sales Donut Chart - ${firstRecord.dayDate}</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
      <style>body{font-family:Arial;padding:20px;}</style>
      </head><body>
      <h2>Sales Record Donut Chart - ${firstRecord.dayDate}</h2>
      <canvas id="salesChart" width="150" height="150"></canvas>
      <script>
        Chart.register(ChartDataLabels);
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              data: ${JSON.stringify(data)},
              backgroundColor: ${JSON.stringify(colors)}
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.label + ': ₹' + context.parsed.toLocaleString();
                  }
                }
              },
              datalabels: {
                display: true,
                color: 'white',
                font: {
                  weight: 'bold'
                },
                formatter: function(value) {
                  return value > 0 ? '₹' + value.toLocaleString() : '';
                }
              }
            }
          }
        });
      </script>
      </body></html>
    `);
    chartWindow.document.close();
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    const tableHTML = `
      <html><head><title>Sales Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; font-size: 10px; }
        th, td { border: 1px solid #ddd; padding: 4px; text-align: center; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .header { text-align: center; margin-bottom: 20px; }
      </style></head><body>
      <div class="header"><h2>MAS Sales Report</h2><p>Generated on: ${new Date().toLocaleDateString()}</p></div>
      <table>
        <thead><tr>
          <th>Date</th><th>DigiPay</th><th>DigiWallet</th><th>StarEC</th><th>SBI</th><th>SBI(J)</th><th>IndBank</th><th>INBA</th>
          <th>IPPB</th><th>IPBC</th><th>Canara</th><th>City</th><th>ESevai</th><th>AirTel</th><th>PayTM</th><th>JIO</th>
          <th>TataPlay</th><th>Pending</th><th>Cash</th><th>Digital</th><th>Total</th>
        </tr></thead><tbody>
        ${filteredRecords.map(record => `<tr>
          <td>${record.dayDate}</td><td>₹${(record.digipay || 0).toLocaleString()}</td><td>₹${(record.digiwallet || 0).toLocaleString()}</td>
          <td>₹${(record.starec || 0).toLocaleString()}</td><td>₹${(record.SBI || 0).toLocaleString()}</td><td>₹${(record.sbi_J || 0).toLocaleString()}</td>
          <td>₹${(record.indBank || 0).toLocaleString()}</td><td>₹${(record.INBA || 0).toLocaleString()}</td><td>₹${(record.ippb || 0).toLocaleString()}</td>
          <td>₹${(record.IPBC || 0).toLocaleString()}</td><td>₹${(record.Canara || 0).toLocaleString()}</td><td>₹${(record.CUB || 0).toLocaleString()}</td>
          <td>₹${(record.TNEGA || 0).toLocaleString()}</td><td>₹${(record.airtel || 0).toLocaleString()}</td><td>₹${(record.PayTM || 0).toLocaleString()}</td>
          <td>₹${(record.Jio || 0).toLocaleString()}</td><td>₹${(record.TataPlay || 0).toLocaleString()}</td><td>₹${(record.PendingNote || 0).toLocaleString()}</td>
          <td style="background-color: rgba(6, 182, 212, 0.1);">₹${(record.totCash || 0).toLocaleString()}</td>
          <td style="background-color: rgba(139, 92, 246, 0.1);">₹${(record.totCum || 0).toLocaleString()}</td>
          <td style="background-color: rgba(16, 185, 129, 0.1); font-weight: bold;">₹${(record.TotalAll || 0).toLocaleString()}</td>
        </tr>`).join('')}
        </tbody></table></body></html>`;
    printWindow.document.write(tableHTML);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  return (
    <Box id="main-container" sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#FAFAFA' }}>
      {/* Sidebar */}
      <Box 
        id="sidebar"
        sx={{ 
          width: sidebarOpen ? 240 : 60, 
          bgcolor: 'white', 
          borderRight: '1px solid #E5E7EB',
          p: sidebarOpen ? 2 : 1,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'width 0.3s ease'
        }}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        {sidebarOpen && (
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#8B5CF6', mb: 3 }}>
            MAS Analytics
          </Typography>
        )}
        
        {[
          { icon: <Dashboard />, label: 'Dashboard', active: true },
          { icon: <Analytics />, label: 'Day Sales' },
          { icon: <AccountBalance />, label: 'Payments' },
          { icon: <Receipt />, label: 'Reports' }
        ].map((item, index) => (
          <Box key={index} sx={{
            display: 'flex',
            alignItems: 'center',
            gap: sidebarOpen ? 2 : 0,
            p: 1.5,
            borderRadius: 2,
            mb: 1,
            cursor: 'pointer',
            bgcolor: item.active ? '#F3F4F6' : 'transparent',
            color: item.active ? '#8B5CF6' : '#6B7280',
            '&:hover': { bgcolor: '#F9FAFB' },
            justifyContent: sidebarOpen ? 'flex-start' : 'center'
          }}>
            {item.icon}
            {sidebarOpen && (
              <Typography variant="body2" fontWeight={item.active ? 600 : 400}>
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Main Content */}
      <Box id="main-content" sx={{ flex: 1, p: 1 }}>
        {/* Top Bar */}
        <Box id="top-bar" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#1F2937' }}>
            MAS Day Sale Dashboard
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#8B5CF6', width: 28, height: 28, fontSize: '0.7rem' }}>AD</Avatar>
            <Box>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: '0.7rem' }}>Admin</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>Manager</Typography>
            </Box>
          </Box>
        </Box>

        {/* Compact Stats Cards */}
        <Box id="stats-cards" sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0.5, mb: 0.5 }}>
          {[
            { title: 'Digital', id: 'stats-cards-Digital',  value: `₹${totalDigitalPayments.toLocaleString()}`,  color: '#f7f8faff' },
            { title: 'Cash', id: 'stats-cards-Cash', value: `₹${formData.totCash.toLocaleString()}`, color: '#fff' },
            { title: 'Pending', id: 'stats-cards-Cash', value: `₹${(parseInt(formData.totalPending) || 0).toLocaleString()}`, color: '#0e0d0dff' },
            { title: 'Expense', id: 'stats-cards-Expense', value: `₹${(parseInt(formData.todayExp) || 0).toLocaleString()}`, color: '#0e0d0dff' },
            { title: 'Total', id: 'stats-cards-Total', value: `₹${grandTotal.toLocaleString()}`, color: '#fff' },
            { title: 'Net', id: 'stats-cards-Net', value: `₹${(grandTotal - (parseInt(formData.totalPending) || 0)).toLocaleString()}`, color: '#f7f8faff' }
          ].map((stat, index) => (
            <Card key={index} id={`stat-card-${stat.title.toLowerCase()}`} sx={{ borderRadius: 4, boxShadow: 1 }}>
              <CardContent sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ color: stat.color, fontSize: '1.2rem' }}>
                  {stat.title}
                </Typography>
                <Typography variant="h6" fontWeight={600} sx={{ color: stat.color, fontSize: '1.5rem' }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box id="form-section" sx={{ display: 'grid',  gridTemplateColumns: '3fr 1fr', gap: 0.5, mb: 0.5 }}>
          {/* Input Form */}
          <Card id="input-form-card" sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 1 }}>
             
              {/* Banking Services */}
              <Box id="banking-services" sx={{ mb: 0.75 }}>
                <Grid container spacing={1}>
                  <Grid item xs={2} tabIndex={0}><InputField label="DigiPay" id="DigiPay" value={formData.DigiPay} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="DigiWallet" id="DigiWallet" value={formData.DigiWallet} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="StarEC" id="starec" value={formData.starec} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="SBI" id="SBI" value={formData.SBI} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="SBI (J)" id="sbi_J" value={formData.sbi_J} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="INB (K)" id="indBank" value={formData.indBank} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="INB (A)" id="INBA" value={formData.INBA} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="IPPB" id="ippb" value={formData.ippb} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="IP BC" id="IPBC" value={formData.IPBC} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="Canara" id="Canara" value={formData.Canara} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="City" id="CUB" value={formData.CUB} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="E Sevai" id="TNEGA" value={formData.TNEGA} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="AirTel" id="airtel" value={formData.airtel} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="PayTM" id="PayTM" value={formData.PayTM} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="JIO" id="Jio" value={formData.Jio} onChange={handleInputChange} width="70px" /></Grid>
                  <Grid item xs={2} tabIndex={0}><InputField label="TataPlay" id="TataPlay" value={formData.TataPlay} onChange={handleInputChange} width="70px" /></Grid>
                </Grid>
              </Box>



              {/* Pending and Expense */}
              {/* <Box sx={{ mb: 1 }}>
                <Grid container spacing={0.5}>
                  <Grid item xs={6}><InputField label="Pending" id="totalPending" value={formData.totalPending} onChange={handleInputChange} width="100%" /></Grid>
                  <Grid item xs={6}><InputField label="Expense" id="todayExp" value={formData.todayExp} onChange={handleInputChange} width="100%" /></Grid>
                </Grid>
              </Box> */}

              {/* Date and Remarks */}
              <Box id="date-remarks" sx={{ mt: 1, p: 1, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#64748B', fontSize: '0.65rem' }}>Date</Typography>
                      <input
                        id="date-input"
                        tabIndex={0}
                        type="date"
                        title="Select transaction date"
                        value={formData.dateofappl}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateofappl: e.target.value }))}
                        style={{
                          width: '100%',
                          height: '32px',
                          border: '1px solid #CBD5E1',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          padding: '4px 8px',
                          outline: 'none',
                          backgroundColor: 'white',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#8B5CF6';
                          e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#CBD5E1';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#64748B', fontSize: '0.65rem' }}>Remarks</Typography>
                      <input
                        id="remarks-input"
                        tabIndex={0}
                        value={formData.remarks}
                        onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                        placeholder="Add notes or comments..."
                        title="Enter additional notes or comments"
                        maxLength={100}
                        style={{
                          width: '100%',
                          height: '32px',
                          border: '1px solid #CBD5E1',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          padding: '4px 8px',
                          outline: 'none',
                          backgroundColor: 'white',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#8B5CF6';
                          e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#CBD5E1';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

          {/* Cash Management */}
          <Card id="cash-management-card" sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent sx={{ p: 1 }}>
              
              {/* Currency Notes */}
              <Box id="currency-notes" sx={{ mb: 1 }}>
                <Grid container spacing={0.5}>
                  {[
                    { label: '₹500', id: 'amt500', color: '#068fa8ff' },
                    { label: '₹200', id: 'amt200', color: '#8B5CF6' },
                    { label: '₹100', id: 'amt100', color: '#07ea9eff' }
                  ].map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ 
                        textAlign: 'center', 
                        p: 0.5, 
                        bgcolor: 'white', 
                        borderRadius: 1, 
                        border: '1px solid #E2E8F0',
                        '&:hover': { borderColor: item.color }
                      }}>
                        <Chip 
                          label={item.label} 
                          size="small" 
                          sx={{ 
                            bgcolor: item.color, 
                            color: 'white', 
                            mb: 0.5, 
                            fontSize: '0.6rem', 
                            height: '18px',
                            fontWeight: 'bold'
                          }} 
                        />
                        <input
                          tabIndex={0}
                          defaultValue={formData[item.id] || ''}
                          onInput={(e) => {
                            const newValue = e.target.value.replace(/[^0-9]/g, '');
                            e.target.value = newValue;
                            formData[item.id] = newValue;
                          }}
                          onBlur={(e) => {
                            updateFormData(item.id, e.target.value);
                          }}
                          style={{
                            width: '50px',
                            height: '28px',
                            textAlign: 'center',
                            border: `1px solid ${item.color}`,
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 'medium',
                            padding: '4px 8px',
                            outline: 'none',
                            backgroundColor: 'white'
                          }}
                          onFocus={(e) => e.target.style.borderColor = item.color}
                          onBlur={(e) => {
                            e.target.style.borderColor = item.color;
                            updateFormData(item.id, e.target.value);
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                <Grid container spacing={0.5} sx={{ mt: 0.5 }}>
                  {[
                    { label: '₹50', id: 'amt50', color: '#F59E0B' },
                    { label: '₹20', id: 'amt20', color: '#EF4444' },
                    { label: '₹10', id: 'amt10', color: '#8B5A2B' }
                  ].map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ 
                        textAlign: 'center', 
                        p: 0.5, 
                        bgcolor: 'white', 
                        borderRadius: 1, 
                        border: '1px solid #E2E8F0',
                        '&:hover': { borderColor: item.color }
                      }}>
                        <Chip 
                          label={item.label} 
                          size="small" 
                          sx={{ 
                            bgcolor: item.color, 
                            color: 'white', 
                            mb: 0.5, 
                            fontSize: '0.6rem', 
                            height: '18px',
                            fontWeight: 'bold'
                          }} 
                        />
                        <input
                          tabIndex={0}
                          defaultValue={formData[item.id] || ''}
                          onInput={(e) => {
                            const newValue = e.target.value.replace(/[^0-9]/g, '');
                            e.target.value = newValue;
                            formData[item.id] = newValue;
                          }}
                          onBlur={(e) => {
                            updateFormData(item.id, e.target.value);
                          }}
                          style={{
                            width: '50px',
                            height: '28px',
                            textAlign: 'center',
                            border: `1px solid ${item.color}`,
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 'medium',
                            padding: '4px 8px',
                            outline: 'none',
                            backgroundColor: 'white'
                          }}
                          onFocus={(e) => e.target.style.borderColor = item.color}
                          onBlur={(e) => {
                            e.target.style.borderColor = item.color;
                            updateFormData(item.id, e.target.value);
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              {/* Change Amount */}
              <Box id="change-amount" sx={{ textAlign: 'center', mb: 1, p: 0.5, bgcolor: '#F1F5F9', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#475569' }}>Change Amount</Typography>
                <input
                  id="change-amount-input"
                  tabIndex={0}
                  placeholder="0"
                  title="Enter change amount"
                  value={formData.amtChange || ''}
                  onChange={(e) => updateFormData('amtChange', e.target.value.replace(/[^0-9]/g, ''))}
                  style={{
                    width: '80px',
                    height: '32px',
                    textAlign: 'center',
                    border: '1px solid #CBD5E1',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'medium',
                    padding: '4px 8px',
                    outline: 'none',
                    backgroundColor: 'white',
                    display: 'block',
                    margin: '4px auto 0',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B5CF6';
                    e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.1)';
                    e.target.select();
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#CBD5E1';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Box>
              
              <Button 
                id="calculate-cash-btn"
                variant="contained" 
                startIcon={<Calculate />} 
                onClick={calculateCash}
                fullWidth
                size="small"
                sx={{ 
                  mb: 1, 
                  borderRadius: 1, 
                  bgcolor: '#8B5CF6', 
                  fontSize: '0.7rem',
                  '&:hover': { bgcolor: '#7C3AED' }
                }}
              >
                Calculate Cash
              </Button>
              

              
              {/* Pending and Expense */}
              {/* <Grid container spacing={0.5} sx={{ mb: 1 }}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#64748B', fontSize: '0.65rem' }}>Pending</Typography>
                    <input
                      value={formData.totalPending || ''}
                      onChange={(e) => handleInputChange('totalPending', e.target.value.replace(/[^0-9]/g, ''))}
                      style={{
                        width: '100%',
                        height: '32px',
                        textAlign: 'center',
                        border: '1px solid #F59E0B',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 'medium',
                        padding: '4px 8px',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                      onBlur={(e) => e.target.style.borderColor = '#F59E0B'}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#64748B', fontSize: '0.65rem' }}>Expense</Typography>
                    <input
                      value={formData.todayExp || ''}
                      onChange={(e) => handleInputChange('todayExp', e.target.value.replace(/[^0-9]/g, ''))}
                      style={{
                        width: '100%',
                        height: '32px',
                        textAlign: 'center',
                        border: '1px solid #EF4444',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 'medium',
                        padding: '4px 8px',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#EF4444'}
                      onBlur={(e) => e.target.style.borderColor = '#EF4444'}
                    />
                  </Box>
                </Grid>
              </Grid> */}
              
            </CardContent>
          </Card>
        </Box>

        {/* Common Action Buttons */}
        <Box id="action-buttons" sx={{ display: 'flex', gap: 1, mb: 0.5, justifyContent: 'center' }}>
          <Button 
            id="save-btn"
            variant="contained" 
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Save />} 
            onClick={handleSubmit}
            disabled={loading}
            size="medium"
            sx={{ 
              minWidth: 120,
              borderRadius: 2, 
              bgcolor: editingRecord ? '#F59E0B' : '#10B981', 
              fontSize: '0.8rem',
              '&:hover': { bgcolor: editingRecord ? '#D97706' : '#059669' }
            }}
          >
            {editingRecord ? 'Update Record' : 'Save Record'}
          </Button>
          <Button 
            id="reset-btn"
            variant="outlined" 
            startIcon={<Refresh />} 
            onClick={resetForm}
            size="medium"
            sx={{ 
              minWidth: 120,
              borderRadius: 2, 
              fontSize: '0.8rem',
              borderColor: '#ba6171ff',
              color: '#0b0b0bff',
              bgcolor: '#DC8D9C', 
              '&:hover': { borderColor: '#374151', bgcolor: '#694249ff' }
            }}
          >
            Reset Form
          </Button>
        </Box>

        {/* Modern Data Table */}
        <Card id="data-table-card" sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #F1F5F9' }}>
          <CardContent sx={{ p: 0 }}>
            {/* Table Header */}
            <Box sx={{ 
              p: 2, 
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              borderRadius: '12px 12px 0 0'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'white', fontSize: '1rem' }}>
                  Sales Records ({filteredRecords.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    id="salerecord-btn-report"
                    startIcon={<BarChart />}
                    onClick={() => generateChart()}
                    sx={{
                      bgcolor: 'rgba(236, 44, 201, 0.65)',
                      color: 'white',
                      fontSize: '0.7rem',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                    }}
                  >
                    Chart
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    id="salerecord-btn-csv"
                    startIcon={<TableChart />}
                    onClick={() => exportToCSV()}
                    sx={{
                      bgcolor: 'rgba(236, 44, 201, 0.65)',
                      color: 'white',
                      fontSize: '0.7rem',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                    }}
                  >
                    CSV
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    id="salerecord-btn-pdf"
                    startIcon={<PictureAsPdf />}
                    onClick={() => exportToPDF()}
                    sx={{
                      bgcolor: 'rgba(236, 44, 201, 0.65)',
                      color: 'white',
                      fontSize: '0.7rem',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                    }}
                  >
                    PDF
                  </Button>
                </Box>
              </Box>
              
              {/* Date Filters */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>From:</Typography>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '0.7rem',
                      outline: 'none'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>To:</Typography>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '0.7rem',
                      outline: 'none'
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setFilters({ dateFrom: '', dateTo: '', minAmount: '', maxAmount: '', paymentType: 'all' })}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.65rem',
                    minWidth: 'auto',
                    px: 1,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
            
            {/* Report/Table Toggle Content */}
            {reportView ? (
              /* Report View */
              <Box sx={{ p: 2 }}>
                {/* Summary Cards */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={3}>
                    <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#8B5CF620', border: '1px solid #8B5CF6' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#8B5CF6' }}>
                        ₹{filteredRecords.reduce((sum, r) => sum + (r.totCum || 0), 0).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#8B5CF6', fontWeight: 600 }}>Total Digital</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#06B6D420', border: '1px solid #06B6D4' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#06B6D4' }}>
                        ₹{filteredRecords.reduce((sum, r) => sum + (r.totCash || 0), 0).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#06B6D4', fontWeight: 600 }}>Total Cash</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#10B98120', border: '1px solid #10B981' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#10B981' }}>
                        ₹{filteredRecords.reduce((sum, r) => sum + (r.TotalAll || 0), 0).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>Grand Total</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#F59E0B20', border: '1px solid #F59E0B' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: '#F59E0B' }}>
                        ₹{Math.round(filteredRecords.reduce((sum, r) => sum + (r.TotalAll || 0), 0) / filteredRecords.length || 0).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#F59E0B', fontWeight: 600 }}>Daily Average</Typography>
                    </Card>
                  </Grid>
                </Grid>

                {/* Charts Section */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1F2937' }}>Payment Methods Distribution</Typography>
                      {[
                        { name: 'DigiPay', total: filteredRecords.reduce((sum, r) => sum + (r.digipay || 0), 0), color: '#8B5CF6' },
                        { name: 'DigiWallet', total: filteredRecords.reduce((sum, r) => sum + (r.digiwallet || 0), 0), color: '#8B5CF6' },
                        { name: 'SBI', total: filteredRecords.reduce((sum, r) => sum + (r.SBI || 0), 0), color: '#10B981' },
                        { name: 'PayTM', total: filteredRecords.reduce((sum, r) => sum + (r.PayTM || 0), 0), color: '#8B5A2B' },
                        { name: 'Cash', total: filteredRecords.reduce((sum, r) => sum + (r.totCash || 0), 0), color: '#06B6D4' }
                      ].sort((a, b) => b.total - a.total).slice(0, 5).map((method, index) => {
                        const maxTotal = Math.max(...filteredRecords.map(r => r.TotalAll || 0));
                        const percentage = maxTotal > 0 ? (method.total / maxTotal) * 100 : 0;
                        return (
                          <Box key={method.name} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                              <Typography variant="body2" fontWeight={500}>{method.name}</Typography>
                              <Typography variant="caption" sx={{ color: method.color, fontWeight: 600 }}>₹{method.total.toLocaleString()}</Typography>
                            </Box>
                            <Box sx={{ width: '100%', height: 8, bgcolor: '#F1F5F9', borderRadius: 1, overflow: 'hidden' }}>
                              <Box sx={{ 
                                width: `${Math.max(percentage, 5)}%`, 
                                height: '100%', 
                                bgcolor: method.color, 
                                borderRadius: 1,
                                transition: 'width 0.5s ease'
                              }} />
                            </Box>
                          </Box>
                        );
                      })}
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1F2937' }}>Daily Sales Trend</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, height: 120, mb: 2 }}>
                        {filteredRecords.slice(0, 7).map((record, index) => {
                          const maxAmount = Math.max(...filteredRecords.slice(0, 7).map(r => r.TotalAll || 0));
                          const height = maxAmount > 0 ? ((record.TotalAll || 0) / maxAmount) * 100 : 10;
                          return (
                            <Box key={record.id} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Box sx={{ 
                                width: '100%', 
                                height: `${Math.max(height, 10)}px`, 
                                bgcolor: index % 2 === 0 ? '#8B5CF6' : '#06B6D4', 
                                borderRadius: '2px 2px 0 0',
                                transition: 'height 0.5s ease',
                                mb: 0.5
                              }} />
                              <Typography variant="caption" sx={{ fontSize: '0.6rem', textAlign: 'center', transform: 'rotate(-45deg)', transformOrigin: 'center' }}>
                                {record.dayDate.split('-')[2]}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid #F1F5F9' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 8, height: 8, bgcolor: '#8B5CF6', borderRadius: '50%' }} />
                          <Typography variant="caption">Digital</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 8, height: 8, bgcolor: '#06B6D4', borderRadius: '50%' }} />
                          <Typography variant="caption">Cash</Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>

                {/* Top Performers */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1F2937' }}>Top Payment Methods</Typography>
                      {[
                        { name: 'DigiPay', total: filteredRecords.reduce((sum, r) => sum + (r.digipay || 0), 0), color: '#8B5CF6' },
                        { name: 'DigiWallet', total: filteredRecords.reduce((sum, r) => sum + (r.digiwallet || 0), 0), color: '#8B5CF6' },
                        { name: 'SBI', total: filteredRecords.reduce((sum, r) => sum + (r.SBI || 0), 0), color: '#10B981' },
                        { name: 'PayTM', total: filteredRecords.reduce((sum, r) => sum + (r.PayTM || 0), 0), color: '#8B5A2B' },
                        { name: 'Cash', total: filteredRecords.reduce((sum, r) => sum + (r.totCash || 0), 0), color: '#06B6D4' }
                      ].sort((a, b) => b.total - a.total).slice(0, 5).map((method, index) => (
                        <Box key={method.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, p: 1, bgcolor: '#F8FAFC', borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 12, height: 12, bgcolor: method.color, borderRadius: '50%' }} />
                            <Typography variant="body2" fontWeight={500}>{method.name}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight={600} sx={{ color: method.color }}>₹{method.total.toLocaleString()}</Typography>
                        </Box>
                      ))}
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1F2937' }}>Recent Trends</Typography>
                      {filteredRecords.slice(0, 5).map((record, index) => (
                        <Box key={record.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, p: 1, bgcolor: index % 2 === 0 ? '#F8FAFC' : 'white', borderRadius: 1 }}>
                          <Typography variant="body2" fontWeight={500}>{record.dayDate}</Typography>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography variant="caption" sx={{ color: '#8B5CF6' }}>D: ₹{(record.totCum || 0).toLocaleString()}</Typography>
                            <Typography variant="caption" sx={{ color: '#06B6D4' }}>C: ₹{(record.totCash || 0).toLocaleString()}</Typography>
                            <Typography variant="body2" fontWeight={600} sx={{ color: '#10B981' }}>₹{(record.TotalAll || 0).toLocaleString()}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              /* Table View */
              <Box sx={{ 
                maxHeight: 300, 
                overflowY: 'auto',
                overflowX: 'auto',
                '&::-webkit-scrollbar': { width: '6px', height: '6px' },
                '&::-webkit-scrollbar-track': { background: '#F1F5F9' },
                '&::-webkit-scrollbar-thumb': { background: '#CBD5E1', borderRadius: '3px' }
              }}>
              <table  id="tbl-salerecord-report" style={{ 
                width: '100%', 
                minWidth: '1200px',
                borderCollapse: 'collapse', 
                fontSize: '0.65rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                  <tr style={{ 
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
                    borderBottom: '2px solid #E2E8F0'
                  }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '700', color: '#1E293B', minWidth: '90px', position: 'sticky', left: 0, background: 'inherit', zIndex: 11 }}>Date</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5CF6', minWidth: '60px' }}>DigiPay</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5CF6', minWidth: '70px' }}>DigiWallet</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5CF6', minWidth: '60px' }}>StarEC</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#10B981', minWidth: '50px' }}>SBI</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#10B981', minWidth: '55px' }}>SBI(J)</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#10B981', minWidth: '60px' }}>IndBank</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#10B981', minWidth: '55px' }}>INBA</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#06B6D4', minWidth: '50px' }}>IPPB</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#06B6D4', minWidth: '55px' }}>IPBC</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#F59E0B', minWidth: '60px' }}>Canara</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#F59E0B', minWidth: '50px' }}>City</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#EF4444', minWidth: '55px' }}>PayTM</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5A2B', minWidth: '60px' }}>ESevai</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5A2B', minWidth: '55px' }}>AirTel</th>

                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5A2B', minWidth: '45px' }}>JIO</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5A2B', minWidth: '65px' }}>TataPlay</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#F59E0B', minWidth: '60px' }}>Pending</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#06B6D4', minWidth: '55px' }}>Cash</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#8B5CF6', minWidth: '60px' }}>Digital</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#10B981', minWidth: '60px' }}>Total</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#EF4444', minWidth: '60px' }}>Difference</th>
                    <th style={{ padding: '12px 6px', textAlign: 'center', fontWeight: '700', color: '#1E293B', minWidth: '80px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.slice(0, 8).map((record, index) => (
                    <tr key={record.id} style={{ 
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EEF2FF'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#FFFFFF' : '#F8FAFC'}
                    >
                      <td style={{ padding: '10px 8px', fontWeight: '600', color: '#1E293B', position: 'sticky', left: 0, background: 'inherit', borderRight: '1px solid #F1F5F9' }}>{record.dayDate}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '500' }}>₹{(record.digipay || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '500' }}>₹{(record.digiwallet || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '500' }}>₹{(record.starec || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#10B981', fontWeight: '500' }}>₹{(record.SBI || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#10B981', fontWeight: '500' }}>₹{(record.sbi_J || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#10B981', fontWeight: '500' }}>₹{(record.indBank || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#10B981', fontWeight: '500' }}>₹{(record.INBA || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#06B6D4', fontWeight: '500' }}>₹{(record.ippb || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#06B6D4', fontWeight: '500' }}>₹{(record.IPBC || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#F59E0B', fontWeight: '500' }}>₹{(record.Canara || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#F59E0B', fontWeight: '500' }}>₹{(record.CUB || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#EF4444', fontWeight: '500' }}>₹{(record.PayTM || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5A2B', fontWeight: '500' }}>₹{(record.TNEGA || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5A2B', fontWeight: '500' }}>₹{(record.airtel || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5A2B', fontWeight: '500' }}>₹{(record.Jio || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5A2B', fontWeight: '500' }}>₹{(record.TataPlay || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#F59E0B', fontWeight: '500' }}>₹{(record.PendingNote || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#06B6D4', fontWeight: '600', background: 'rgba(6, 182, 212, 0.1)' }}>₹{(record.totCash || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#8B5CF6', fontWeight: '600', background: 'rgba(139, 92, 246, 0.1)' }}>₹{(record.totCum || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#10B981', fontWeight: '700', background: 'rgba(16, 185, 129, 0.1)' }}>₹{(record.TotalAll || 0).toLocaleString()}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center', color: '#6B7280', fontWeight: '700' }}>₹{index > 0 ? (filteredRecords[index-1]?.TotalAll || 0).toLocaleString() : '-'}</td>
                      <td style={{ padding: '10px 6px', textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(record)}
                            sx={{ 
                              color: '#8B5CF6', 
                              '&:hover': { bgcolor: 'rgba(139, 92, 246, 0.1)' },
                              width: 24,
                              height: 24
                            }}
                          >
                            <Edit sx={{ fontSize: '0.9rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleWhatsApp(record)}
                            sx={{ 
                              color: '#25D366', 
                              '&:hover': { bgcolor: 'rgba(37, 211, 102, 0.1)' },
                              width: 24,
                              height: 24
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                            </svg>
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(record.id)}
                            sx={{ 
                              color: '#EF4444', 
                              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' },
                              width: 24,
                              height: 24
                            }}
                          >
                            <Delete sx={{ fontSize: '0.9rem' }} />
                          </IconButton>
                        </Box>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredRecords.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>No records found</Typography>
                </Box>
              )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DaySales;