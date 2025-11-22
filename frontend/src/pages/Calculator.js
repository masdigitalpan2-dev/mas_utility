import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { Calculate, Percent, Straighten, AspectRatio, CurrencyRupee, Receipt, AccountBalanceWallet, QrCode, TrendingUp } from '@mui/icons-material';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('area');
  const [values, setValues] = useState({
    hect1: 0, are1: 0, hect2: 0, are2: 0,
    hect3: 0, are3: 0, hect4: 0, are4: 0
  });
  const [percentValues, setPercentValues] = useState({
    value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,
    max1: 0, max2: 0, max3: 0, max4: 0, max5: 0, max6: 0
  });

  const handleValueChange = (num, newValue) => {
    setPercentValues({
      ...percentValues,
      [`value${num}`]: newValue,
      [`max${num}`]: newValue > 0 ? 100 : 0
    });
  };

  const [result, setResult] = useState({ hectares: 0, acres: 0 });
  const [percentResult, setPercentResult] = useState({ total: 0, maxTotal: 0, average: 0, percentage: 0 });
  const [cashValues, setCashValues] = useState({
    billAmount: 0, n500: 0, n200: 0, n100: 0, n50: 0, n20: 0, n10: 0, cash: 0, upi: 0
  });
  const [cashResult, setCashResult] = useState({ total: 0, breakdown: {} });
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcPrevValue, setCalcPrevValue] = useState(null);
  const [calcOperation, setCalcOperation] = useState(null);
  const [calcWaitingForOperand, setCalcWaitingForOperand] = useState(false);
  const [calcHistory, setCalcHistory] = useState('');
  const [interestValues, setInterestValues] = useState({
    principal: 0, rate: 3, time: 0, fromDate: '', toDate: new Date().toISOString().split('T')[0], totalDays: 0, totalMonths: 0
  });
  const [interestResult, setInterestResult] = useState({ simpleInterest: 0, totalInterest: 0, totalAmount: 0 });

  const handleCalculate = () => {
    let totalHec = values.hect1 + values.hect2 + values.hect3 + values.hect4;
    let totalAre = values.are1 + values.are2 + values.are3 + values.are4;
    
    // Convert ares to hectares if ares >= 100
    if (totalAre >= 100) {
      totalHec += Math.floor(totalAre / 100);
      totalAre = totalAre % 100;
    }
    
    const totalInAcres = (totalHec * 2.471) + (totalAre * 2.471 / 100);
    
    setResult({
      hectares: `${totalHec}.${totalAre.toString().padStart(2, '0')}`,
      acres: totalInAcres.toFixed(3)
    });
  };

  const handleReset = () => {
    setValues({
      hect1: 0, are1: 0, hect2: 0, are2: 0,
      hect3: 0, are3: 0, hect4: 0, are4: 0
    });
    setResult({ hectares: 0, acres: 0 });
  };

  const handlePercentCalculate = () => {
    const total = percentValues.value1 + percentValues.value2 + percentValues.value3 + 
                  percentValues.value4 + percentValues.value5 + percentValues.value6;
    
    let maxTotal = 0;
    [1, 2, 3, 4, 5, 6].forEach(num => {
      const maxValue = percentValues[`value${num}`] === 0 ? 0 : percentValues[`max${num}`];
      maxTotal += maxValue;
    });
    
    const average = total / 6;
    const percentage = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
    setPercentResult({
      total: total.toFixed(2),
      maxTotal: maxTotal.toFixed(2),
      average: average.toFixed(2),
      percentage: percentage.toFixed(2)
    });
  };

  const handlePercentReset = () => {
    setPercentValues({
      value1: 0, value2: 0, value3: 0, value4: 0, value5: 0, value6: 0,
      max1: 0, max2: 0, max3: 0, max4: 0, max5: 0, max6: 0
    });
    setPercentResult({ total: 0, maxTotal: 0, average: 0, percentage: 0 });
  };

  const handleCashCalculate = () => {
    const total = (cashValues.n500 * 500) + (cashValues.n200 * 200) + 
                  (cashValues.n100 * 100) + (cashValues.n50 * 50) + (cashValues.n20 * 20) + 
                  (cashValues.n10 * 10) + (cashValues.cash || 0) + (cashValues.upi || 0);
    
    setCashResult({
      total: total,
      breakdown: {
        n500: cashValues.n500 * 500,
        n200: cashValues.n200 * 200,
        n100: cashValues.n100 * 100,
        n50: cashValues.n50 * 50,
        n20: cashValues.n20 * 20,
        n10: cashValues.n10 * 10,
        cash: cashValues.cash || 0,
        upi: cashValues.upi || 0
      }
    });
  };

  const handleCashReset = () => {
    setCashValues({
      billAmount: 0, n500: 0, n200: 0, n100: 0, n50: 0, n20: 0, n10: 0, cash: 0, upi: 0
    });
    setCashResult({ total: 0, breakdown: {} });
  };

  const inputNumber = (num) => {
    if (calcWaitingForOperand) {
      setCalcDisplay(String(num));
      setCalcWaitingForOperand(false);
    } else {
      setCalcDisplay(calcDisplay === '0' ? String(num) : calcDisplay + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(calcDisplay);
    if (calcPrevValue === null) {
      setCalcPrevValue(inputValue);
      setCalcHistory(`${inputValue} ${nextOperation}`);
    } else if (calcOperation) {
      const currentValue = calcPrevValue || 0;
      const newValue = calculate(currentValue, inputValue, calcOperation);
      setCalcDisplay(String(newValue));
      setCalcPrevValue(newValue);
      setCalcHistory(`${calcHistory} ${inputValue} = ${newValue} ${nextOperation}`);
    }
    setCalcWaitingForOperand(true);
    setCalcOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(calcDisplay);
    if (calcPrevValue !== null && calcOperation) {
      const newValue = calculate(calcPrevValue, inputValue, calcOperation);
      setCalcDisplay(String(newValue));
      setCalcHistory(`${calcHistory} ${inputValue} = ${newValue}`);
      setCalcPrevValue(null);
      setCalcOperation(null);
      setCalcWaitingForOperand(true);
    }
  };

  const clearCalculator = () => {
    setCalcDisplay('0');
    setCalcPrevValue(null);
    setCalcOperation(null);
    setCalcWaitingForOperand(false);
    setCalcHistory('');
  };

  const handleInterestCalculate = () => {
    const { principal, rate, totalMonths } = interestValues;
    const simpleInterest = (principal * rate) / 100;
    const totalInterest = simpleInterest * totalMonths;
    const totalAmount = principal + totalInterest;
    
    setInterestResult({
      simpleInterest: Math.round(simpleInterest),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    });
  };

  const calculatePeriod = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Calculate full and half months
      const yearDiff = to.getFullYear() - from.getFullYear();
      const monthDiff = to.getMonth() - from.getMonth();
      const dayDiff = to.getDate() - from.getDate();
      
      let totalMonths = yearDiff * 12 + monthDiff;
      
      // Add half month if day difference is 15 or more
      if (dayDiff >= 15) {
        totalMonths += 0.5;
      } else if (dayDiff < 0) {
        totalMonths -= 0.5;
      }
      
      return { days: diffDays, months: totalMonths };
    }
    return { days: 0, months: 0 };
  };

  const handleDateChange = (field, value) => {
    const newValues = { ...interestValues, [field]: value };
    const period = calculatePeriod(newValues.fromDate, newValues.toDate);
    setInterestValues({
      ...newValues,
      totalDays: period.days,
      totalMonths: period.months
    });
  };

  const handleInterestReset = () => {
    setInterestValues({ principal: 0, rate: 3, time: 0, fromDate: '', toDate: new Date().toISOString().split('T')[0], totalDays: 0, totalMonths: 0 });
    setInterestResult({ simpleInterest: 0, totalInterest: 0, totalAmount: 0 });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={3} sx={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)', borderRadius: 2, p: 1 }}>
          <Paper sx={{ 
            p: 2, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            height: 'fit-content'
          }}>

            <List>
              <ListItem button onClick={() => setActiveTab('area')} sx={{ 
                borderRadius: 2, 
                mb: 1, 
                background: activeTab === 'area' ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                color: activeTab === 'area' ? 'white' : 'inherit',
                '&:hover': { background: activeTab === 'area' ? 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #d5d5d5 100%)' }
              }}>
                <ListItemIcon><Calculate sx={{ color: activeTab === 'area' ? 'white' : '#4caf50' }} /></ListItemIcon>
                <ListItemText primary="Area Calculator" />
              </ListItem>
              <ListItem button onClick={() => setActiveTab('percent')} sx={{ 
                borderRadius: 2, 
                mb: 1, 
                background: activeTab === 'percent' ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                color: activeTab === 'percent' ? 'white' : 'inherit',
                '&:hover': { background: activeTab === 'percent' ? 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #d5d5d5 100%)' }
              }}>
                <ListItemIcon><Percent sx={{ color: activeTab === 'percent' ? 'white' : '#ff9800' }} /></ListItemIcon>
                <ListItemText primary="Percentage" />
              </ListItem>
              <ListItem button onClick={() => setActiveTab('cash')} sx={{ 
                borderRadius: 2, 
                mb: 1, 
                background: activeTab === 'cash' ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                color: activeTab === 'cash' ? 'white' : 'inherit',
                '&:hover': { background: activeTab === 'cash' ? 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #d5d5d5 100%)' }
              }}>
                <ListItemIcon><CurrencyRupee sx={{ color: activeTab === 'cash' ? 'white' : '#2196f3' }} /></ListItemIcon>
                <ListItemText primary="Cash Counter" />
              </ListItem>
              <ListItem button onClick={() => setActiveTab('interest')} sx={{ 
                borderRadius: 2, 
                mb: 1, 
                background: activeTab === 'interest' ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                color: activeTab === 'interest' ? 'white' : 'inherit',
                '&:hover': { background: activeTab === 'interest' ? 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #d5d5d5 100%)' }
              }}>
                <ListItemIcon><TrendingUp sx={{ color: activeTab === 'interest' ? 'white' : '#e91e63' }} /></ListItemIcon>
                <ListItemText primary="Interest Calculator" />
              </ListItem>
              <ListItem button onClick={() => setActiveTab('simple')} sx={{ 
                borderRadius: 2, 
                mb: 1, 
                background: activeTab === 'simple' ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                color: activeTab === 'simple' ? 'white' : 'inherit',
                '&:hover': { background: activeTab === 'simple' ? 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #d5d5d5 100%)' }
              }}>
                <ListItemIcon><Calculate sx={{ color: activeTab === 'simple' ? 'white' : '#9c27b0' }} /></ListItemIcon>
                <ListItemText primary="Calculator" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#2e7d32', borderBottom: '2px solid #4caf50', pb: 1 }}>
              {activeTab === 'area' ? 'Area Calculator' : activeTab === 'percent' ? 'Percentage Calculator' : activeTab === 'interest' ? 'Interest Calculator' : activeTab === 'simple' ? '' : 
                <><CurrencyRupee sx={{ fontSize: '2rem', color: '#4caf50' }} />Cash Denomination Counter</>
              }
            </Typography>
            {activeTab === 'area' ? (
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {[1, 2, 3, 4].map(num => (
                      <TextField
                        key={`hect${num}`}
                        id={`hectare-${num}`}
                        label={`Hectare ${num}`}
                        type="number"
                        value={values[`hect${num}`]}
                        onChange={(e) => setValues({...values, [`hect${num}`]: +e.target.value})}
                        onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                        onFocus={(e) => e.target.select()}
                        fullWidth
                        margin="dense"
                        size="small"
                        tabIndex={num}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#4caf50' },
                            '&:hover fieldset': { borderColor: '#388e3c' },
                            '&.Mui-focused fieldset': { borderColor: '#2e7d32' }
                          }
                        }}
                      />
                    ))}
                  </Grid>
                  <Grid item xs={6}>
                    {[1, 2, 3, 4].map(num => (
                      <TextField
                        key={`are${num}`}
                        id={`are-${num}`}
                        label={`Are ${num}`}
                        type="number"
                        value={values[`are${num}`]}
                        onChange={(e) => setValues({...values, [`are${num}`]: +e.target.value})}
                        onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                        onFocus={(e) => e.target.select()}
                        fullWidth
                        margin="dense"
                        size="small"
                        tabIndex={num + 4}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#ff9800' },
                            '&:hover fieldset': { borderColor: '#f57c00' },
                            '&.Mui-focused fieldset': { borderColor: '#e65100' }
                          }
                        }}
                      />
                    ))}
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      onClick={handleCalculate} 
                      fullWidth
                      sx={{ borderRadius: 2 }}
                    >
                      Calculate
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      onClick={handleReset} 
                      fullWidth
                      sx={{ 
                        background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: '600',
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(244,67,54,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(244,67,54,0.4)'
                        }
                      }}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ 
                  p: 3, 
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                  borderRadius: 3,
                  height: 'fit-content'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1976d2' }}>
                    Results
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Total Hectares:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>{result.hectares}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Total Acres:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>{result.acres}</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            ) : activeTab === 'percent' ? (
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {[1, 2, 3].map(num => (
                      <Grid container spacing={0} key={num}>
                        <Grid item xs={6}>
                          <TextField
                            label={`Value ${num}`}
                            type="number"
                            value={percentValues[`value${num}`]}
                            onChange={(e) => handleValueChange(num, +e.target.value)}
                            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                            onFocus={(e) => e.target.select()}
                            fullWidth
                            margin="normal"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': { 
                                  borderColor: '#1976d2',
                                  borderRightWidth: 0,
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0
                                },
                                '&:hover fieldset': { 
                                  borderColor: '#1565c0',
                                  borderRightWidth: 0
                                },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#0d47a1',
                                  borderRightWidth: 0
                                }
                              },
                              '& .MuiInputLabel-root': { color: '#1976d2' }
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label={`Max ${num}`}
                            type="number"
                            value={percentValues[`max${num}`]}
                            onChange={(e) => setPercentValues({...percentValues, [`max${num}`]: +e.target.value})}
                            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                            onFocus={(e) => e.target.select()}
                            fullWidth
                            margin="normal"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': { 
                                  borderColor: '#ff9800',
                                  borderLeftWidth: 0,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0
                                },
                                '&:hover fieldset': { 
                                  borderColor: '#f57c00',
                                  borderLeftWidth: 0
                                },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#e65100',
                                  borderLeftWidth: 0
                                }
                              },
                              '& .MuiInputLabel-root': { color: '#ff9800' }
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item xs={6}>
                    {[4, 5, 6].map(num => (
                      <Grid container spacing={0} key={num}>
                        <Grid item xs={6}>
                          <TextField
                            label={`Value ${num}`}
                            type="number"
                            value={percentValues[`value${num}`]}
                            onChange={(e) => handleValueChange(num, +e.target.value)}
                            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                            onFocus={(e) => e.target.select()}
                            fullWidth
                            margin="normal"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': { 
                                  borderColor: '#1976d2',
                                  borderRightWidth: 0,
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0
                                },
                                '&:hover fieldset': { 
                                  borderColor: '#1565c0',
                                  borderRightWidth: 0
                                },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#0d47a1',
                                  borderRightWidth: 0
                                }
                              },
                              '& .MuiInputLabel-root': { color: '#1976d2' }
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label={`Max ${num}`}
                            type="number"
                            value={percentValues[`max${num}`]}
                            onChange={(e) => setPercentValues({...percentValues, [`max${num}`]: +e.target.value})}
                            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                            onFocus={(e) => e.target.select()}
                            fullWidth
                            margin="normal"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': { 
                                  borderColor: '#ff9800',
                                  borderLeftWidth: 0,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0
                                },
                                '&:hover fieldset': { 
                                  borderColor: '#f57c00',
                                  borderLeftWidth: 0
                                },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#e65100',
                                  borderLeftWidth: 0
                                }
                              },
                              '& .MuiInputLabel-root': { color: '#ff9800' }
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      onClick={handlePercentCalculate} 
                      fullWidth
                      sx={{ borderRadius: 2 }}
                    >
                      Calculate
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      onClick={handlePercentReset} 
                      fullWidth
                      sx={{ 
                        background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: '600',
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(244,67,54,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(244,67,54,0.4)'
                        }
                      }}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ 
                  p: 3, 
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                  borderRadius: 3,
                  height: 'fit-content'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1976d2' }}>
                    Results
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Total:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>{percentResult.total}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Max Total:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>{percentResult.maxTotal}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Average:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>{percentResult.average}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Percentage:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>{percentResult.percentage}%</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            ) : activeTab === 'interest' ? (
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="From Date"
                      type="date"
                      value={interestValues.fromDate}
                      onChange={(e) => handleDateChange('fromDate', e.target.value)}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#9c27b0' },
                          '&:hover fieldset': { borderColor: '#7b1fa2' },
                          '&.Mui-focused fieldset': { borderColor: '#4a148c' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="To Date"
                      type="date"
                      value={interestValues.toDate}
                      onChange={(e) => handleDateChange('toDate', e.target.value)}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e91e63' },
                          '&:hover fieldset': { borderColor: '#c2185b' },
                          '&.Mui-focused fieldset': { borderColor: '#880e4f' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Total Period (Days)"
                      type="number"
                      value={interestValues.totalDays}
                      onChange={(e) => setInterestValues({...interestValues, totalDays: +e.target.value})}
                      onFocus={(e) => e.target.select()}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#607d8b' },
                          '&:hover fieldset': { borderColor: '#455a64' },
                          '&.Mui-focused fieldset': { borderColor: '#263238' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Total Period (Months)"
                      type="number"
                      value={interestValues.totalMonths}
                      onChange={(e) => setInterestValues({...interestValues, totalMonths: +e.target.value})}
                      onFocus={(e) => e.target.select()}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#795548' },
                          '&:hover fieldset': { borderColor: '#5d4037' },
                          '&.Mui-focused fieldset': { borderColor: '#3e2723' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Principal Amount (₹)"
                      type="number"
                      value={interestValues.principal}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (isNaN(value) || value > 0) {
                          setInterestValues({...interestValues, principal: +e.target.value});
                        }
                      }}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#4caf50' },
                          '&:hover fieldset': { borderColor: '#388e3c' },
                          '&.Mui-focused fieldset': { borderColor: '#2e7d32' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Interest Rate (%)"
                      type="number"
                      value={interestValues.rate}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (isNaN(value) || (value >= 1 && value <= 10 && (value % 0.5 === 0))) {
                          setInterestValues({...interestValues, rate: +e.target.value});
                        }
                      }}
                      onKeyDown={(e) => {
                        const value = e.target.value;
                        if (e.key === '.' && value.includes('.')) e.preventDefault();
                        if (value.includes('.') && value.split('.')[1]?.length >= 1 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) e.preventDefault();
                      }}
                      onFocus={(e) => e.target.select()}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#ff9800' },
                          '&:hover fieldset': { borderColor: '#f57c00' },
                          '&.Mui-focused fieldset': { borderColor: '#e65100' }
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      onClick={handleInterestCalculate} 
                      fullWidth
                      sx={{ borderRadius: 2 }}
                    >
                      Calculate
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      onClick={handleInterestReset} 
                      fullWidth
                      sx={{ 
                        background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: '600',
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(244,67,54,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(244,67,54,0.4)'
                        }
                      }}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ 
                  p: 3, 
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                  borderRadius: 3,
                  height: 'fit-content'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1976d2' }}>
                    Results
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Principal:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>₹{interestValues.principal.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Interest Rate:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>{interestValues.rate}%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Simple Interest:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>₹{interestResult.simpleInterest.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Total Interest:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>₹{interestResult.totalInterest.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Total Amount:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700', color: '#2e7d32' }}>₹{interestResult.totalAmount.toLocaleString()}</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            ) : activeTab === 'simple' ? (
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Paper sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                }}>
                  <TextField
                    id="calculator-display"
                    value={calcDisplay}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    sx={{ 
                      mb: 2, 
                      '& input': { textAlign: 'right', fontSize: '1.5rem', fontWeight: 'bold' },
                      '& .MuiInputBase-root': {
                        '&::before': {
                          content: `"${calcHistory}"`,
                          position: 'absolute',
                          top: '8px',
                          right: '14px',
                          fontSize: '0.75rem',
                          color: '#666',
                          pointerEvents: 'none'
                        }
                      }
                    }}
                  />
                  <Grid container spacing={1}>
                    {[['C', '/', '*', '-'], [7, 8, 9, '+'], [4, 5, 6, 0], [1, 2, 3, '.'], ['=']].map((row, i) => (
                      <Grid container spacing={1} key={i} sx={{ mb: 1 }}>
                        {row.map((item, j) => (
                          <Grid item xs={row.length === 1 ? 12 : 3} key={j}>
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={() => {
                                if (item === 'C') clearCalculator();
                                else if (item === '=') performCalculation();
                                else if (['+', '-', '*', '/'].includes(item)) inputOperation(item);
                                else if (item === '.') setCalcDisplay(calcDisplay.includes('.') ? calcDisplay : calcDisplay + '.');
                                else inputNumber(item);
                              }}
                              sx={{ 
                                height: 40, 
                                borderRadius: 2,
                                background: ['+', '-', '*', '/'].includes(item) ? 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)' : 
                                           item === '=' ? 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)' :
                                           item === 'C' ? 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' :
                                           'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                                color: 'white',
                                fontWeight: '600',
                                '&:hover': {
                                  transform: 'translateY(-1px)',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }
                              }}
                            >
                              {item}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            ) : activeTab === 'cash' ? (
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <TextField
                  id="bill-amount"
                  label="Bill Amount"
                  type="number"
                  value={cashValues.billAmount}
                  onChange={(e) => setCashValues({...cashValues, billAmount: +e.target.value})}
                  onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                  onFocus={(e) => e.target.select()}
                  inputProps={{ min: 0 }}
                  InputProps={{
                    startAdornment: <Receipt sx={{ color: '#4caf50', mr: 1 }} />
                  }}
                  fullWidth
                  margin="normal"
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#4caf50' },
                      '&:hover fieldset': { borderColor: '#388e3c' },
                      '&.Mui-focused fieldset': { borderColor: '#2e7d32' }
                    }
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      id="cash-500"
                      label="₹500"
                      type="number"
                      value={cashValues.n500}
                      onChange={(e) => setCashValues({...cashValues, n500: +e.target.value})}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      inputProps={{ min: 0 }}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#2196f3' },
                          '&:hover fieldset': { borderColor: '#1976d2' },
                          '&.Mui-focused fieldset': { borderColor: '#0d47a1' }
                        }
                      }}
                    />
                    <TextField
                      id="cash-20"
                      label="₹20"
                      type="number"
                      value={cashValues.n20}
                      onChange={(e) => setCashValues({...cashValues, n20: +e.target.value})}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      inputProps={{ min: 0 }}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#9c27b0' },
                          '&:hover fieldset': { borderColor: '#7b1fa2' },
                          '&.Mui-focused fieldset': { borderColor: '#4a148c' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="cash-200"
                      label="₹200"
                      type="number"
                      value={cashValues.n200}
                      onChange={(e) => setCashValues({...cashValues, n200: +e.target.value})}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      inputProps={{ min: 0 }}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#e91e63' },
                          '&:hover fieldset': { borderColor: '#c2185b' },
                          '&.Mui-focused fieldset': { borderColor: '#880e4f' }
                        }
                      }}
                    />
                    <TextField
                      id="cash-10"
                      label="₹10"
                      type="number"
                      value={cashValues.n10}
                      onChange={(e) => setCashValues({...cashValues, n10: +e.target.value})}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      inputProps={{ min: 0 }}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#795548' },
                          '&:hover fieldset': { borderColor: '#5d4037' },
                          '&.Mui-focused fieldset': { borderColor: '#3e2723' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="cash-100"
                      label="₹100"
                      type="number"
                      value={cashValues.n100}
                      onChange={(e) => setCashValues({...cashValues, n100: +e.target.value})}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      inputProps={{ min: 0 }}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#607d8b' },
                          '&:hover fieldset': { borderColor: '#455a64' },
                          '&.Mui-focused fieldset': { borderColor: '#263238' }
                        }
                      }}
                    />
                    <TextField
                      id="cash-amount"
                      label="Cash"
                      type="number"
                      value={cashValues.cash || 0}
                      onChange={(e) => setCashValues({...cashValues, cash: +e.target.value})}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      inputProps={{ min: 0 }}
                      InputProps={{
                        startAdornment: <AccountBalanceWallet sx={{ color: '#ff9800', mr: 1 }} />
                      }}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#ff9800' },
                          '&:hover fieldset': { borderColor: '#f57c00' },
                          '&.Mui-focused fieldset': { borderColor: '#e65100' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="cash-50"
                      label="₹50"
                      type="number"
                      value={cashValues.n50}
                      onChange={(e) => setCashValues({...cashValues, n50: +e.target.value})}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      inputProps={{ min: 0 }}
                      fullWidth
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#009688' },
                          '&:hover fieldset': { borderColor: '#00796b' },
                          '&.Mui-focused fieldset': { borderColor: '#004d40' }
                        }
                      }}
                    />
                    <TextField
                      id="upi-amount"
                      label="UPI Amount"
                      type="number"
                      value={cashValues.upi || 0}
                      onChange={(e) => setCashValues({...cashValues, upi: +e.target.value})}
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      onFocus={(e) => e.target.select()}
                      inputProps={{ min: 0 }}
                      InputProps={{
                        startAdornment: <QrCode sx={{ color: '#2196f3', mr: 1 }} />
                      }}
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      onClick={handleCashCalculate} 
                      fullWidth
                      sx={{ borderRadius: 2 }}
                    >
                      Calculate
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button 
                      variant="contained" 
                      onClick={handleCashReset} 
                      fullWidth
                      sx={{ 
                        background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: '600',
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(244,67,54,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(244,67,54,0.4)'
                        }
                      }}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ 
                  p: 3, 
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                  borderRadius: 3,
                  height: 'fit-content'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1976d2' }}>
                    Summary
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Bill Amount:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>₹{cashValues.billAmount || 0}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Cash Amount:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700' }}>₹{cashResult.total}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Total Amount:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '700', color: (cashResult.total - (cashValues.billAmount || 0)) >= 0 ? '#2e7d32' : '#d32f2f' }}>₹{cashResult.total - (cashValues.billAmount || 0)}</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Calculator;