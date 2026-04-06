// import React, { useEffect, useState } from 'react';
// import { 
//   IonButtons, IonContent, IonHeader, IonMenuButton, 
//   IonPage, IonTitle, IonToolbar, IonText, IonSearchbar 
// } from '@ionic/react';
// import { 
//   Container, Typography, Box, Paper, Stack, Grid, Chip, 
//   Button
// } from '@mui/material';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { medkitOutline, cashOutline, alertCircleOutline, addOutline } from 'ionicons/icons';
// import { IonIcon } from '@ionic/react';
// import { HealthRecord } from '../types/types';
// import { useHistory } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { fetchHealthRecords } from '../redux/store/slices/operationsSlice';



// const HealthAndTreatments: React.FC = () => {
//   const [records, setRecords] = useState<HealthRecord[]>([]);
//   const [searchText, setSearchText] = useState('');
//   const history = useHistory();
//   const dispatch = useAppDispatch();
//   const { healthRecords, loading } = useAppSelector((state) => state.operations);
  
  

//   useEffect(() => {
//     // Replace with your actual thunk/fetch call
//      dispatch(fetchHealthRecords())
//   }, [dispatch,]);

//   const totalInvestment = healthRecords.reduce((sum, r) => sum + parseFloat(r.cost), 0);

//   const columns: GridColDef[] = [
//     { 
//       field: 'treatment_date', 
//       headerName: 'Date', 
//       width: 120,
//       renderCell: (p) => <Typography variant="body2" fontWeight="bold">{p.value}</Typography>
//     },
//     { 
//       field: 'condition', 
//       headerName: 'Condition', 
//       flex: 1,
//       renderCell: (p) => (
//         <Typography variant="body2" sx={{ color: '#eb445a', fontWeight: 'medium' }}>
//           {p.value}
//         </Typography>
//       )
//     },
//     { field: 'treatment', headerName: 'Treatment Administered', flex: 1.5 },
//     { 
//       field: 'cost', 
//       headerName: 'Cost', 
//       width: 110,
//       renderCell: (p) => <Typography variant="body2" fontWeight="bold">${p.value}</Typography>
//     },
//     { 
//       field: 'follow_up_date', 
//       headerName: 'Follow-up', 
//       width: 130,
//       renderCell: (p) => p.value ? (
//         <Chip label={p.value} size="small" color="warning" variant="outlined" />
//       ) : '-'
//     },
//   ];

//   const filteredRecords = healthRecords.filter(r => 
//     r.condition.toLowerCase().includes(searchText.toLowerCase()) ||
//     r.treatment.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle>Health & Treatments</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding">
//            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//                   <Box>
//                     {/* <Typography variant="body2" color="text.secondary">
//                       Managing {animals?.length || 0} total head of cattle
//                     </Typography> */}
//                   </Box>
//                   <Button 
//                     variant="contained" 
//                     startIcon={<IonIcon icon={addOutline} />}
//                     onClick={() => history.push("/health/add")}
//                     sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold'  }}
//                   >
//                     New Health Record
//                   </Button>
//                 </Stack>
//         <Container maxWidth="lg">
          
         

//           {/* Metrics Summary Ribbon */}
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             <Grid item xs={12} md={4}>
//               <Paper elevation={0} sx={{ p: 2, bgcolor: '#f4f5f8', borderRadius: '12px', border: '1px solid #ececec' }}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Box sx={{ p: 1, bgcolor: 'white', borderRadius: '8px', display: 'flex' }}>
//                     <IonIcon icon={cashOutline} style={{ fontSize: '1.5rem', color: '#2dd36f' }} />
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" fontWeight="bold" color="text.secondary">TOTAL HEALTH SPEND</Typography>
//                     <Typography variant="h6" fontWeight="bold">${totalInvestment.toLocaleString()}</Typography>
//                   </Box>
//                 </Stack>
//               </Paper>
//             </Grid>
//             {/* Add more metric cards here if needed (e.g. Active Treatments) */}
//           </Grid>

//           {/* Search and Filters */}
//           <Box sx={{ mb: 3 }}>
//             <IonSearchbar 
//               value={searchText} 
//               onIonInput={(e) => setSearchText(e.detail.value!)} 
//               placeholder="Search conditions or medications..."
//               className="custom-searchbar"
//             />
//           </Box>

//           {/* Data Grid Table */}
//           <Paper elevation={0} sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
//             <Box sx={{ height: 600, width: '100%' }}>
//               <DataGrid
//                 rows={filteredRecords}
//                 columns={columns}
//                 pageSizeOptions={[10, 25, 50]}
//                 initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//                 disableRowSelectionOnClick
//                 sx={{
//                   border: 0,
//                   '& .MuiDataGrid-columnHeaders': { bgcolor: '#fbfbfb', borderBottom: '1px solid #f0f0f0' },
//                   '& .MuiDataGrid-cell:focus': { outline: 'none' },
//                 }}
//               />
//             </Box>
//           </Paper>

//         </Container>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default HealthAndTreatments;
import React, { useEffect, useState } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, 
  IonPage, IonTitle, IonToolbar, IonSearchbar, IonSegment, 
  IonSegmentButton, IonLabel, IonIcon 
} from '@ionic/react';
import { 
  Container, Typography, Box, Paper, Stack, Grid, Chip, 
  Button, Divider
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { 
  cashOutline, alertCircleOutline, addOutline, 
  listOutline, timeOutline, medicalOutline 
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchHealthRecords } from '../redux/store/slices/operationsSlice';

const HealthAndTreatments: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');
  
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { healthRecords, loading } = useAppSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchHealthRecords());
  }, [dispatch]);

  const totalInvestment = healthRecords.reduce((sum, r) => sum + parseFloat(r.cost || '0'), 0);

  const columns: GridColDef[] = [
    { 
      field: 'treatment_date', 
      headerName: 'Date', 
      width: 120,
      renderCell: (p) => <Typography variant="body2" fontWeight="bold">{p.value}</Typography>
    },
    { 
      field: 'condition', 
      headerName: 'Condition', 
      flex: 1,
      renderCell: (p) => (
        <Typography variant="body2" sx={{ color: '#eb445a', fontWeight: 'medium' }}>
          {p.value}
        </Typography>
      )
    },
    { field: 'treatment', headerName: 'Treatment Administered', flex: 1.5 },
    { 
      field: 'cost', 
      headerName: 'Cost', 
      width: 110,
      renderCell: (p) => <Typography variant="body2" fontWeight="bold">${p.value}</Typography>
    },
    { 
      field: 'follow_up_date', 
      headerName: 'Follow-up', 
      width: 130,
      renderCell: (p) => p.value ? (
        <Chip label={p.value} size="small" color="warning" variant="outlined" />
      ) : '-'
    },
  ];

  const filteredRecords = healthRecords.filter(r => 
    r.condition.toLowerCase().includes(searchText.toLowerCase()) ||
    r.treatment.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Health & Treatments</IonTitle>
        </IonToolbar>
        
        {/* Toggle between Table and Timeline */}
        <IonToolbar>
          <IonSegment value={viewMode} onIonChange={(e: any) => setViewMode(e.detail.value)}>
            <IonSegmentButton value="table">
              <IonIcon icon={listOutline} />
              <IonLabel>Table</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="timeline">
              <IonIcon icon={timeOutline} />
              <IonLabel>Timeline</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="lg">
          
          {/* 1. Top Actions */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">Clinical Records</Typography>
              <Typography variant="body2" color="text.secondary">Tracking medical history and expenses</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push("/health/add")}
              sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold', bgcolor: '#3880ff' }}
            >
              New Record
            </Button>
          </Stack>

          {/* 2. Metrics Summary */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#f4f5f8', borderRadius: '12px', border: '1px solid #ececec' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, bgcolor: 'white', borderRadius: '8px', display: 'flex', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <IonIcon icon={cashOutline} style={{ fontSize: '1.5rem', color: '#2dd36f' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">TOTAL HEALTH SPEND</Typography>
                    <Typography variant="h6" fontWeight="bold">${totalInvestment.toLocaleString()}</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {/* 3. Search Bar */}
          <Box sx={{ mb: 3 }}>
            <IonSearchbar 
              value={searchText} 
              onIonInput={(e) => setSearchText(e.detail.value!)} 
              placeholder="Search conditions or medications..."
              mode="md"
            />
          </Box>

          {/* 4. Conditional Content: Table vs Timeline */}
          {viewMode === 'table' ? (
            <Paper elevation={0} sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
              <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                  rows={filteredRecords}
                  columns={columns}
                  loading={loading}
                  pageSizeOptions={[10, 25, 50]}
                  initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                  disableRowSelectionOnClick
                  sx={{
                    border: 0,
                    '& .MuiDataGrid-columnHeaders': { bgcolor: '#fbfbfb', borderBottom: '1px solid #f0f0f0' },
                    '& .MuiDataGrid-cell:focus': { outline: 'none' },
                  }}
                />
              </Box>
            </Paper>
          ) : (
            <Box sx={{ mt: 2, pl: 1 }}>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <Box key={record.id} sx={{ 
                    display: 'flex', 
                    gap: 3, 
                    borderLeft: '2px solid #3880ff', 
                    ml: 1.5, 
                    pl: 4, 
                    pb: 4,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: '-10px',
                      top: 0,
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      bgcolor: 'white',
                      border: '4px solid #3880ff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Box sx={{ width: '100%' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="caption" fontWeight="bold" color="primary" sx={{ textTransform: 'uppercase' }}>
                            {record.treatment_date}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                            {record.condition}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                          ${record.cost}
                        </Typography>
                      </Stack>
                      
                      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', bgcolor: '#f9f9f9', p: 1.5, borderRadius: '8px' }}>
                        <IonIcon icon={medicalOutline} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                        <strong>Treatment:</strong> {record.treatment}
                      </Typography>

                      {record.follow_up_date && (
                        <Box sx={{ mt: 1.5 }}>
                          <Chip 
                            icon={<IonIcon icon={alertCircleOutline} style={{ color: 'inherit' }} />} 
                            label={`Follow-up scheduled: ${record.follow_up_date}`} 
                            size="small" 
                            color="warning" 
                            variant="filled"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography color="text.secondary">No matching clinical records found.</Typography>
                </Box>
              )}
            </Box>
          )}

        </Container>
      </IonContent>
    </IonPage>
  );
};

export default HealthAndTreatments;