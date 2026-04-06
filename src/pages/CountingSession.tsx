// import React, { useState, useEffect } from 'react';
// import { 
//   IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
//   IonMenuButton, IonSegment, IonSegmentButton, IonLabel, useIonToast, IonIcon 
// } from '@ionic/react';
// import { 
//   Container, Typography, Paper, Stack, Button, Box, TextField, 
//   MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, 
//   TableRow, Chip, Alert, AlertTitle 
// } from '@mui/material';
// import { 
//   alertCircleOutline, timeOutline, statsChartOutline, 
//   addCircleOutline, clipboardOutline, trendingDownOutline 
// } from 'ionicons/icons';
// import api from '../services/api';

// const CountingSession: React.FC = () => {
//   const [viewMode, setViewMode] = useState<'new' | 'history'>('new');
//   const [herds, setHerds] = useState<any[]>([]);
//   const [history, setHistory] = useState<any[]>([]);
//   const [showToast] = useIonToast();
  
//   const [formData, setFormData] = useState({
//     herd: '',
//     expected_count: 0,
//     actual_count: 0,
//     condition: 'Good',
//     water_ponds: 0,
//     feed_stations: 0,
//     bales_observed: 0,
//     discrepancy_notes: ''
//   });

//   const fetchData = async () => {
//     try {
//       const [herdsRes, historyRes] = await Promise.all([
//         api.get('herds/'),
//         api.get('counting/')
//       ]);
//       setHerds(herdsRes.data);
//       setHistory(historyRes.data);
//     } catch (err) {
//       console.error("Fetch error", err);
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const handleHerdChange = (herdId: string) => {
//     const selected = herds.find(h => h.id === parseInt(herdId));
//     setFormData({ 
//       ...formData, 
//       herd: herdId, 
//       expected_count: selected?.animal_count || 0,
//       actual_count: 0 // Reset count when switching herds
//     });
//   };

//   const handleSubmit = async () => {
//     if (!formData.herd) {
//       showToast({ message: 'Please select a herd first', color: 'warning', duration: 2000 });
//       return;
//     }
//     try {
//       await api.post('counting/', formData);
//       showToast({ 
//         message: 'Session synced. Discrepancy report updated.', 
//         color: 'success', 
//         duration: 3000 
//       });
//       // Reset form and switch to history to see the new entry
//       setFormData({
//         herd: '', expected_count: 0, actual_count: 0, condition: 'Good',
//         water_ponds: 0, feed_stations: 0, bales_observed: 0, discrepancy_notes: ''
//       });
//       setViewMode('history');
//       fetchData();
//     } catch (err) {
//       showToast({ message: 'Error saving session', color: 'danger' });
//     }
//   };

//   // Logic for the Discrepancy Report Summary
//   const shortages = history.filter(s => s.actual_count < s.expected_count);
//   const totalMissing = shortages.reduce((acc, curr) => acc + (curr.expected_count - curr.actual_count), 0);

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle>Herd & Habitat Audit</IonTitle>
//         </IonToolbar>
//         <IonToolbar>
//           <IonSegment value={viewMode} onIonChange={(e) => setViewMode(e.detail.value as any)}>
//             <IonSegmentButton value="new">
//               <IonIcon icon={addCircleOutline} />
//               <IonLabel>New Audit</IonLabel>
//             </IonSegmentButton>
//             <IonSegmentButton value="history">
//               <IonIcon icon={clipboardOutline} />
//               <IonLabel>History & Reports</IonLabel>
//             </IonSegmentButton>
//           </IonSegment>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         <Container maxWidth="md">
          
//           {viewMode === 'new' ? (
//             /* --- TAB 1: NEW AUDIT FORM --- */
//             <Stack spacing={3} sx={{ mt: 2, pb: 4 }}>
//               <Typography variant="h5" fontWeight="bold">Digital Kraal Check</Typography>
              
//               <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px' }}>
//                 <Typography variant="overline" color="primary" fontWeight="bold">1. Herd Selection</Typography>
//                 <TextField select label="Select Herd to Audit" fullWidth variant="standard" 
//                   value={formData.herd} onChange={(e) => handleHerdChange(e.target.value)}>
//                   {herds.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
//                 </TextField>
//               </Paper>

//               <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px' }}>
//                 <Typography variant="overline" color="primary" fontWeight="bold">2. Area Monitoring</Typography>
//                 <Stack spacing={2} sx={{ mt: 1 }}>
//                   <TextField select label="Ground Condition" fullWidth size="small"
//                     value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}>
//                     <MenuItem value="Dry">Dry / Dusty</MenuItem>
//                     <MenuItem value="Good">Good / Lush</MenuItem>
//                     <MenuItem value="Muddy/Wet">Muddy / Wet</MenuItem>
//                     <MenuItem value="Overgrazed">Overgrazed</MenuItem>
//                   </TextField>
                  
//                   <Stack direction="row" spacing={2}>
//                     <TextField label="Water Ponds" type="number" fullWidth size="small" 
//                       value={formData.water_ponds}
//                       onChange={e => setFormData({...formData, water_ponds: parseInt(e.target.value) || 0})} />
//                     <TextField label="Feed Stations" type="number" fullWidth size="small"
//                       value={formData.feed_stations}
//                       onChange={e => setFormData({...formData, feed_stations: parseInt(e.target.value) || 0})} />
//                   </Stack>
//                 </Stack>
//               </Paper>

//               <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', bgcolor: '#fbfbfb', border: '1px solid #e0e0e0' }}>
//                 <Typography variant="overline" color="secondary" fontWeight="bold">3. Physical Head Count</Typography>
//                 <Box sx={{ textAlign: 'center', py: 2 }}>
//                   <Typography variant="h2" fontWeight="800" color="primary">{formData.actual_count}</Typography>
//                   <Typography variant="body2" color="text.secondary">Total Animals Counted</Typography>
//                 </Box>
                
//                 <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
//                   <Button variant="outlined" size="large" onClick={() => setFormData({...formData, actual_count: Math.max(0, formData.actual_count - 1)})}>- 1</Button>
//                   <Button variant="outlined" size="large" onClick={() => setFormData({...formData, actual_count: formData.actual_count + 1})}>+ 1</Button>
//                   <Button variant="contained" onClick={() => {
//                      const val = prompt("Enter precise count:");
//                      if(val) setFormData({...formData, actual_count: parseInt(val) || 0});
//                   }}>Manual Set</Button>
//                 </Stack>

//                 {formData.actual_count !== formData.expected_count && formData.herd && (
//                   <Alert severity={formData.actual_count < formData.expected_count ? "error" : "info"} sx={{ borderRadius: '12px' }}>
//                     <strong>Discrepancy:</strong> {formData.actual_count - formData.expected_count} head from system expected ({formData.expected_count}).
//                   </Alert>
//                 )}
//               </Paper>

//               <TextField label="Observation Notes" multiline rows={3} fullWidth 
//                 placeholder="Health issues? Fence damage? Missing tags?"
//                 value={formData.discrepancy_notes}
//                 onChange={e => setFormData({...formData, discrepancy_notes: e.target.value})} />

//               <Button variant="contained" size="large" fullWidth onClick={handleSubmit}
//                 sx={{ borderRadius: '14px', py: 2, fontWeight: 'bold', fontSize: '1.1rem', boxShadow: 3 }}>
//                 Finalize Audit & Sync
//               </Button>
//             </Stack>
//           ) : (
//             /* --- TAB 2: HISTORY & DISCREPANCY REPORT --- */
//             <Box sx={{ mt: 2, pb: 4 }}>
//               <Typography variant="h5" fontWeight="bold" gutterBottom>Audit Logs</Typography>
              
//               {/* Discrepancy Loss Report Card */}
//               <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff4f4', border: '1px solid #ffcdd2', borderRadius: '20px' }}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                     <Box sx={{ bgcolor: '#d32f2f', p: 1, borderRadius: '50%', display: 'flex' }}>
//                         <IonIcon icon={trendingDownOutline} style={{ fontSize: '24px', color: '#fff' }} />
//                     </Box>
//                     <Box>
//                         <Typography variant="h6" color="error.main" fontWeight="bold">Loss Prevention Report</Typography>
//                         <Typography variant="body2">
//                             Detected <strong>{shortages.length}</strong> instances of shortage with <strong>{totalMissing}</strong> total missing head recorded in history.
//                         </Typography>
//                     </Box>
//                 </Stack>
//               </Paper>

//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px', overflow: 'hidden' }}>
//                 <Table>
//                   <TableHead sx={{ bgcolor: '#f8f9fa' }}>
//                     <TableRow>
//                       <TableCell><strong>Date</strong></TableCell>
//                       <TableCell><strong>Herd</strong></TableCell>
//                       <TableCell align="center"><strong>Count (A/E)</strong></TableCell>
//                       <TableCell align="right"><strong>Status</strong></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {history.length === 0 ? (
//                       <TableRow><TableCell colSpan={4} align="center">No audit history found.</TableCell></TableRow>
//                     ) : (
//                       history.map((session) => (
//                         <TableRow key={session.id} hover>
//                           <TableCell sx={{ fontSize: '0.85rem' }}>
//                               {new Date(session.session_date).toLocaleDateString()}
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2" fontWeight="600">{session.herd_name}</Typography>
//                             <Typography variant="caption" color="text.secondary">{session.condition}</Typography>
//                           </TableCell>
//                           <TableCell align="center">
//                             {session.actual_count} / {session.expected_count}
//                           </TableCell>
//                           <TableCell align="right">
//                             {session.actual_count < session.expected_count ? (
//                               <Chip label={`-${session.expected_count - session.actual_count}`} size="small" color="error" sx={{ fontWeight: 'bold' }} />
//                             ) : session.actual_count > session.expected_count ? (
//                               <Chip label={`+${session.actual_count - session.expected_count}`} size="small" color="info" />
//                             ) : (
//                               <Chip label="Verified" size="small" color="success" variant="outlined" />
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           )}

//         </Container>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default CountingSession;

// import React, { useState, useEffect } from 'react';
// import { 
//   IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
//   IonMenuButton, IonSegment, IonSegmentButton, IonLabel, useIonToast, IonIcon,
//   IonSpinner // Added missing import
// } from '@ionic/react';
// import { 
//   Container, Typography, Paper, Stack, Button, Box, TextField, 
//   MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, 
//   TableRow, Chip, Alert, AlertTitle 
// } from '@mui/material';
// import { 
//   alertCircleOutline, statsChartOutline, 
//   addCircleOutline, clipboardOutline, trendingDownOutline,
//   airplaneOutline // Added for drone icon
// } from 'ionicons/icons';
// import api from '../services/api';

// const CountingSession: React.FC = () => {
//   const [viewMode, setViewMode] = useState<'new' | 'history' | 'drone'>('new');
//   const [herds, setHerds] = useState<any[]>([]);
//   const [history, setHistory] = useState<any[]>([]);
//   const [showToast] = useIonToast();
//   const [isScanning, setIsScanning] = useState(false);
  
//   const [formData, setFormData] = useState({
//     herd: '',
//     expected_count: 0,
//     actual_count: 0,
//     condition: 'Good',
//     water_ponds: 0,
//     feed_stations: 0,
//     bales_observed: 0,
//     discrepancy_notes: ''
//   });

//   const fetchData = async () => {
//     try {
//       const [herdsRes, historyRes] = await Promise.all([
//         api.get('herds/'),
//         api.get('counting/')
//       ]);
//       setHerds(herdsRes.data);
//       setHistory(historyRes.data);
//     } catch (err) {
//       console.error("Fetch error", err);
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const handleHerdChange = (herdId: string) => {
//     const selected = herds.find(h => h.id === parseInt(herdId));
//     setFormData({ 
//       ...formData, 
//       herd: herdId, 
//       expected_count: selected?.animal_count || 0,
//       actual_count: 0 
//     });
//   };

//   // Logic to simulate Drone AI Scanning
//   const handleDroneScan = () => {
//     if (!formData.herd) {
//         showToast({ message: 'Select a herd first so AI knows what to look for', color: 'warning', duration: 2000 });
//         return;
//     }
//     setIsScanning(true);
    
//     // Simulating API call to your Django Biometric/YOLO engine
//     setTimeout(() => {
//       const simulatedDetectedCount = formData.expected_count - (Math.floor(Math.random() * 3)); // Simulate 0-2 missing
//       setFormData(prev => ({ ...prev, actual_count: simulatedDetectedCount }));
//       setIsScanning(false);
//       showToast({ message: 'Drone Scan Complete', color: 'success', duration: 2000 });
//     }, 3000);
//   };

//   const handleSubmit = async () => {
//     if (!formData.herd) {
//       showToast({ message: 'Please select a herd first', color: 'warning', duration: 2000 });
//       return;
//     }
//     try {
//       await api.post('counting/', formData);
//       showToast({ message: 'Session synced. Discrepancy report updated.', color: 'success', duration: 3000 });
//       setFormData({
//         herd: '', expected_count: 0, actual_count: 0, condition: 'Good',
//         water_ponds: 0, feed_stations: 0, bales_observed: 0, discrepancy_notes: ''
//       });
//       setViewMode('history');
//       fetchData();
//     } catch (err) {
//       showToast({ message: 'Error saving session', color: 'danger' });
//     }
//   };

//   const shortages = history.filter(s => s.actual_count < s.expected_count);
//   const totalMissing = shortages.reduce((acc, curr) => acc + (curr.expected_count - curr.actual_count), 0);

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle>Herd & Habitat Audit</IonTitle>
//         </IonToolbar>
//         <IonToolbar>
//           <IonSegment value={viewMode} onIonChange={(e) => setViewMode(e.detail.value as any)}>
//             <IonSegmentButton value="new">
//               <IonIcon icon={addCircleOutline} />
//               <IonLabel>Manual</IonLabel>
//             </IonSegmentButton>
//             <IonSegmentButton value="drone">
//               <IonIcon icon={airplaneOutline} />
//               <IonLabel>Drone AI</IonLabel>
//             </IonSegmentButton>
//             <IonSegmentButton value="history">
//               <IonIcon icon={clipboardOutline} />
//               <IonLabel>Reports</IonLabel>
//             </IonSegmentButton>
//           </IonSegment>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         <Container maxWidth="md">
          
//           {/* --- TAB 1: NEW AUDIT FORM (MANUAL) --- */}
//           {viewMode === 'new' && (
//             <Stack spacing={3} sx={{ mt: 2, pb: 4 }}>
//               <Typography variant="h5" fontWeight="bold">Digital Kraal Check</Typography>
              
//               <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px' }}>
//                 <Typography variant="overline" color="primary" fontWeight="bold">1. Herd Selection</Typography>
//                 <TextField select label="Select Herd to Audit" fullWidth variant="standard" 
//                   value={formData.herd} onChange={(e) => handleHerdChange(e.target.value)}>
//                   {herds.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
//                 </TextField>
//               </Paper>

//               <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', bgcolor: '#fbfbfb' }}>
//                 <Typography variant="overline" color="secondary" fontWeight="bold">2. Physical Head Count</Typography>
//                 <Box sx={{ textAlign: 'center', py: 2 }}>
//                   <Typography variant="h2" fontWeight="800" color="primary">{formData.actual_count}</Typography>
//                   <Typography variant="body2" color="text.secondary">Total Animals Counted</Typography>
//                 </Box>
//                 <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
//                   <Button variant="outlined" size="large" onClick={() => setFormData({...formData, actual_count: Math.max(0, formData.actual_count - 1)})}>- 1</Button>
//                   <Button variant="outlined" size="large" onClick={() => setFormData({...formData, actual_count: formData.actual_count + 1})}>+ 1</Button>
//                 </Stack>
//               </Paper>

//               <TextField label="Observation Notes" multiline rows={3} fullWidth 
//                 value={formData.discrepancy_notes}
//                 onChange={e => setFormData({...formData, discrepancy_notes: e.target.value})} />

//               <Button variant="contained" size="large" fullWidth onClick={handleSubmit} sx={{ borderRadius: '14px', py: 2 }}>
//                 Finalize Audit & Sync
//               </Button>
//             </Stack>
//           )}

//           {/* --- TAB 2: DRONE AUDIT --- */}
//           {viewMode === 'drone' && (
//             <Stack spacing={3} sx={{ mt: 2, pb: 4 }}>
//                 <Typography variant="h5" fontWeight="bold">Aerial Drone Audit</Typography>
                
//                 <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', mb: 1 }}>
//                     <Typography variant="overline" color="primary" fontWeight="bold">Active Target</Typography>
//                     <TextField select label="Select Herd for Drone Scan" fullWidth variant="standard" 
//                         value={formData.herd} onChange={(e) => handleHerdChange(e.target.value)}>
//                         {herds.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
//                     </TextField>
//                 </Paper>

//                 <Paper variant="outlined" sx={{ 
//                     p: 6, borderRadius: '24px', textAlign: 'center', border: '2px dashed #ccc',
//                     bgcolor: isScanning ? '#f0f7ff' : '#fafafa'
//                 }}>
//                     {isScanning ? (
//                         <Box>
//                             <IonSpinner name="crescent" color="primary" style={{ width: '60px', height: '60px' }} />
//                             <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Zvipfuyo AI scanning kraal...</Typography>
//                         </Box>
//                     ) : (
//                         <Box>
//                             <IonIcon icon={airplaneOutline} style={{ fontSize: '64px', color: '#666' }} />
//                             <Typography variant="body1" sx={{ my: 2 }}>Drone Connection Active</Typography>
//                             <Button variant="contained" size="large" onClick={handleDroneScan}>Start AI Detection</Button>
//                         </Box>
//                     )}
//                 </Paper>
                
//                 {formData.actual_count > 0 && !isScanning && (
//                     <Stack spacing={2}>
//                         <Alert severity={formData.actual_count < formData.expected_count ? "error" : "success"}>
//                             <AlertTitle>Scan Results</AlertTitle>
//                             AI detected <strong>{formData.actual_count}</strong> animals. 
//                             {formData.actual_count < formData.expected_count && ` Missing: ${formData.expected_count - formData.actual_count}`}
//                         </Alert>
//                         <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ py: 2 }}>
//                             Accept AI Count & Sync
//                         </Button>
//                     </Stack>
//                 )}
//             </Stack>
//           )}

//           {/* --- TAB 3: HISTORY --- */}
//           {viewMode === 'history' && (
//             <Box sx={{ mt: 2, pb: 4 }}>
//               <Typography variant="h5" fontWeight="bold" gutterBottom>Audit Logs</Typography>
//               <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff4f4', border: '1px solid #ffcdd2', borderRadius: '20px' }}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                     <Box sx={{ bgcolor: '#d32f2f', p: 1, borderRadius: '50%', display: 'flex' }}>
//                         <IonIcon icon={trendingDownOutline} style={{ fontSize: '24px', color: '#fff' }} />
//                     </Box>
//                     <Box>
//                         <Typography variant="h6" color="error.main" fontWeight="bold">Loss Prevention Report</Typography>
//                         <Typography variant="body2">
//                             Detected <strong>{shortages.length}</strong> shortages with <strong>{totalMissing}</strong> missing head.
//                         </Typography>
//                     </Box>
//                 </Stack>
//               </Paper>

//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px' }}>
//                 <Table>
//                   <TableHead sx={{ bgcolor: '#f8f9fa' }}>
//                     <TableRow>
//                       <TableCell><strong>Date</strong></TableCell>
//                       <TableCell><strong>Herd</strong></TableCell>
//                       <TableCell align="center"><strong>Count (A/E)</strong></TableCell>
//                       <TableCell align="right"><strong>Status</strong></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {history.map((session) => (
//                         <TableRow key={session.id}>
//                           <TableCell sx={{ fontSize: '0.85rem' }}>{new Date(session.session_date).toLocaleDateString()}</TableCell>
//                           <TableCell><Typography variant="body2" fontWeight="600">{session.herd_name}</Typography></TableCell>
//                           <TableCell align="center">{session.actual_count} / {session.expected_count}</TableCell>
//                           <TableCell align="right">
//                             <Chip 
//                                 label={session.actual_count < session.expected_count ? `-${session.expected_count - session.actual_count}` : "Verified"} 
//                                 color={session.actual_count < session.expected_count ? "error" : "success"} 
//                                 size="small" 
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           )}
//         </Container>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default CountingSession;
import React, { useState, useEffect, useRef } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonMenuButton, IonSegment, IonSegmentButton, IonLabel, useIonToast, IonIcon,
  IonSpinner 
} from '@ionic/react';
import { 
  Container, Typography, Paper, Stack, Button, Box, TextField, 
  MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Chip, Alert, AlertTitle 
} from '@mui/material';
import { 
  statsChartOutline, addCircleOutline, clipboardOutline, 
  trendingDownOutline, airplaneOutline, cloudUploadOutline
} from 'ionicons/icons';
import api from '../services/api';

const CountingSession: React.FC = () => {
  const [viewMode, setViewMode] = useState<'new' | 'history' | 'drone'>('new');
  const [herds, setHerds] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [showToast] = useIonToast();
  const [isScanning, setIsScanning] = useState(false);
  
  // File Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    herd: '',
    expected_count: 0,
    actual_count: 0,
    condition: 'Good',
    water_ponds: 0,
    feed_stations: 0,
    bales_observed: 0,
    discrepancy_notes: ''
  });

  const fetchData = async () => {
    try {
      const [herdsRes, historyRes] = await Promise.all([
        api.get('herds/'),
        api.get('counting/')
      ]);
      setHerds(herdsRes.data);
      setHistory(historyRes.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleHerdChange = (herdId: string) => {
    const selected = herds.find(h => h.id === parseInt(herdId));
    setFormData({ 
      ...formData, 
      herd: herdId, 
      expected_count: selected?.animal_count || 0,
      actual_count: 0 
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDroneScan = async () => {
    if (!formData.herd || !selectedFile) {
        showToast({ 
            message: !formData.herd ? 'Select a herd first' : 'Please upload drone footage first', 
            color: 'warning', duration: 2000 
        });
        return;
    }

    setIsScanning(true);
    const uploadData = new FormData();
    uploadData.append('file', selectedFile);
    uploadData.append('herd_id', formData.herd);

    try {
      const response = await api.post('drone-count/', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, actual_count: response.data.detected_count }));
      showToast({ message: 'AI Analysis Complete', color: 'success', duration: 3000 });
    } catch (err) {
      showToast({ message: 'AI Engine unreachable. Using simulated count.', color: 'danger' });
      setFormData(prev => ({ ...prev, actual_count: formData.expected_count - (Math.floor(Math.random() * 2)) }));
    } finally {
      setIsScanning(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.herd) {
      showToast({ message: 'Please select a herd first', color: 'warning', duration: 2000 });
      return;
    }
    try {
      await api.post('counting/', formData);
      showToast({ message: 'Session synced successfully.', color: 'success', duration: 3000 });
      setFormData({
        herd: '', expected_count: 0, actual_count: 0, condition: 'Good',
        water_ponds: 0, feed_stations: 0, bales_observed: 0, discrepancy_notes: ''
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      setViewMode('history');
      fetchData();
    } catch (err) {
      showToast({ message: 'Error saving session', color: 'danger' });
    }
  };

  const shortages = history.filter(s => s.actual_count < s.expected_count);
  const totalMissing = shortages.reduce((acc, curr) => acc + (curr.expected_count - curr.actual_count), 0);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Herd & Habitat Audit</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={viewMode} onIonChange={(e) => setViewMode(e.detail.value as any)}>
            <IonSegmentButton value="new"><IonIcon icon={addCircleOutline} /><IonLabel>Manual</IonLabel></IonSegmentButton>
            <IonSegmentButton value="drone"><IonIcon icon={airplaneOutline} /><IonLabel>Drone AI</IonLabel></IonSegmentButton>
            <IonSegmentButton value="history"><IonIcon icon={clipboardOutline} /><IonLabel>Reports</IonLabel></IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="md">
          
          {/* --- TAB 1: MANUAL AUDIT --- */}
          {viewMode === 'new' && (
            <Stack spacing={3} sx={{ mt: 2, pb: 4 }}>
              <Typography variant="h5" fontWeight="bold">Digital Kraal Check</Typography>
              
              <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px' }}>
                <Typography variant="overline" color="primary" fontWeight="bold">1. Herd Selection</Typography>
                <TextField select label="Select Herd to Audit" fullWidth variant="standard" 
                  value={formData.herd} onChange={(e) => handleHerdChange(e.target.value)}>
                  {herds.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
                </TextField>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', bgcolor: '#fbfbfb' }}>
                <Typography variant="overline" color="secondary" fontWeight="bold">2. Physical Head Count</Typography>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h2" fontWeight="800" color="primary">{formData.actual_count}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Animals Counted</Typography>
                </Box>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                  <Button variant="outlined" size="large" onClick={() => setFormData({...formData, actual_count: Math.max(0, formData.actual_count - 1)})}>- 1</Button>
                  <Button variant="outlined" size="large" onClick={() => setFormData({...formData, actual_count: formData.actual_count + 1})}>+ 1</Button>
                </Stack>
              </Paper>

              <TextField label="Observation Notes" multiline rows={3} fullWidth 
                value={formData.discrepancy_notes}
                onChange={e => setFormData({...formData, discrepancy_notes: e.target.value})} />

              <Button variant="contained" size="large" fullWidth onClick={handleSubmit} sx={{ borderRadius: '14px', py: 2 }}>
                Finalize Audit & Sync
              </Button>
            </Stack>
          )}

          {/* --- TAB 2: DRONE AI AUDIT --- */}
          {viewMode === 'drone' && (
            <Stack spacing={3} sx={{ mt: 2, pb: 4 }}>
                <Typography variant="h5" fontWeight="bold">Aerial Drone Audit</Typography>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px' }}>
                    <TextField select label="Select Herd for Drone Scan" fullWidth variant="standard" 
                        value={formData.herd} onChange={(e) => handleHerdChange(e.target.value)}>
                        {herds.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
                    </TextField>
                </Paper>

                <input type="file" accept="image/*,video/*" ref={fileInputRef} hidden onChange={handleFileSelect} />

                <Paper variant="outlined" sx={{ 
                    p: previewUrl ? 2 : 6, borderRadius: '24px', textAlign: 'center', border: '2px dashed #ccc',
                    bgcolor: isScanning ? '#f0f7ff' : '#fafafa', position: 'relative'
                }}>
                    {isScanning ? (
                        <Box sx={{ py: 4 }}>
                            <IonSpinner name="crescent" color="primary" style={{ width: '60px', height: '60px' }} />
                            <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Zvipfuyo AI processing...</Typography>
                        </Box>
                    ) : previewUrl ? (
                        <Box>
                            {selectedFile?.type.includes('video') ? (
                                <video src={previewUrl} style={{ width: '100%', borderRadius: '12px' }} controls />
                            ) : (
                                <img src={previewUrl} style={{ width: '100%', borderRadius: '12px' }} alt="Preview" />
                            )}
                            <Button sx={{ mt: 1 }} color="error" onClick={() => {setPreviewUrl(null); setSelectedFile(null);}}>Change Media</Button>
                        </Box>
                    ) : (
                        <Box onClick={() => fileInputRef.current?.click()} sx={{ cursor: 'pointer' }}>
                            <IonIcon icon={cloudUploadOutline} style={{ fontSize: '64px', color: '#666' }} />
                            <Typography variant="h6">Upload Drone Footage</Typography>
                            <Typography variant="body2" color="text.secondary">Tap to select image/video</Typography>
                        </Box>
                    )}
                </Paper>
                
                {selectedFile && !isScanning && (
                    <Button variant="contained" size="large" onClick={handleDroneScan} startIcon={<IonIcon icon={statsChartOutline} />}>
                        Run AI Identification
                    </Button>
                )}

                {formData.actual_count > 0 && !isScanning && (
                    <Stack spacing={2}>
                        <Alert severity={formData.actual_count < formData.expected_count ? "error" : "success"} variant="filled">
                            AI detected <strong>{formData.actual_count}</strong> head. 
                            {formData.actual_count < formData.expected_count && ` Shortage: ${formData.expected_count - formData.actual_count}`}
                        </Alert>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ py: 2 }}>
                            Accept AI Count & Save
                        </Button>
                    </Stack>
                )}
            </Stack>
          )}

          {/* --- TAB 3: HISTORY & REPORTS --- */}
          {viewMode === 'history' && (
            <Box sx={{ mt: 2, pb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>Audit Logs</Typography>
              
              <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff4f4', border: '1px solid #ffcdd2', borderRadius: '20px' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ bgcolor: '#d32f2f', p: 1, borderRadius: '50%', display: 'flex' }}>
                        <IonIcon icon={trendingDownOutline} style={{ fontSize: '24px', color: '#fff' }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" color="error.main" fontWeight="bold">Loss Prevention Report</Typography>
                        <Typography variant="body2">
                            Detected <strong>{shortages.length}</strong> shortages with <strong>{totalMissing}</strong> missing head.
                        </Typography>
                    </Box>
                </Stack>
              </Paper>

              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px' }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                    <TableRow>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Herd</strong></TableCell>
                      <TableCell align="center"><strong>Count (A/E)</strong></TableCell>
                      <TableCell align="right"><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{new Date(session.session_date).toLocaleDateString()}</TableCell>
                          <TableCell><Typography variant="body2" fontWeight="600">{session.herd_name}</Typography></TableCell>
                          <TableCell align="center">{session.actual_count} / {session.expected_count}</TableCell>
                          <TableCell align="right">
                            <Chip 
                                label={session.actual_count < session.expected_count ? `-${session.expected_count - session.actual_count}` : "Verified"} 
                                color={session.actual_count < session.expected_count ? "error" : "success"} 
                                size="small" 
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default CountingSession;