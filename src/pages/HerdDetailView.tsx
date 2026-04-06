// import React, { useEffect, useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { 
//   Box, Typography, Button, Chip, Stack, Divider, Paper, Alert
// } from '@mui/material';
// import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
// import { 
//   IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
//   IonTitle, IonContent, IonSpinner, IonToast 
// } from '@ionic/react';
// import { fetchHerdById } from '../redux/store/slices/livestockSlice';
// import { livestockService } from '../services/livestockService'; // Ensure this matches your path
// import { getBreedLabel } from '../constants/livestock';
// const HerdDetailView: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useAppDispatch();
//   const history = useHistory();
  
//   const { selectedHerd, loading } = useAppSelector((state) => state.livestock);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchHerdById(Number(id)));
//     }
//   }, [id, dispatch]);

//   // Handle Bulk Actions
//   const handleBulkAction = async (actionType: 'healthy' | 'vaccinate') => {
//     setActionLoading(true);
//     try {
//       if (actionType === 'healthy') {
//         await livestockService.markHerdHealthy(Number(id));
//         setToastMessage('All animals marked as active/healthy.');
//       } else {
//         await livestockService.vaccinateHerd(Number(id), 'General Vaccination');
//         setToastMessage('Herd vaccination records updated.');
//       }
//       dispatch(fetchHerdById(Number(id))); // Refresh data
//     } catch (error) {
//       setToastMessage('Action failed. Please check server connection.');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const animalColumns: GridColDef[] = [
//     { field: 'tag_number', headerName: 'Tag Number', width: 130, renderCell: (p) => <strong>{p.value}</strong> },
//     { field: 'breed', headerName: 'Breed', width: 120 },
//     { 
//       field: 'gender', 
//       headerName: 'Gender', 
//       width: 100,
//       renderCell: (p) => (
//         <Chip 
//           label={p.value} 
//           size="small" 
//           variant="outlined" 
//           color={p.value?.toLowerCase() === 'female' ? 'secondary' : 'primary'} 
//         />
//       )
//     },
//   { 
//   field: 'status_display', // IMPORTANT: Match the new serializer field name
//   headerName: 'Health Status', 
//   width: 130,
//   renderCell: (params: any) => {
//     const val = params.value; // This will now be "Sick", "Active", etc.
    
//     let chipColor = '#2dd36f'; // Green
//     if (val === 'Sick') chipColor = '#eb445a';
//     if (val === 'Quarantine') chipColor = '#f2a104';
//     if (val === 'Deceased') chipColor = '#707070';

//     return (
//       <Chip 
//         label={val} 
//         size="small" 
//         sx={{ 
//           bgcolor: chipColor, 
//           color: 'white',
//           fontWeight: 'bold'
//         }} 
//       />
//     );
//   }
// },
//     { 
//       field: 'last_treatment_date', 
//       headerName: 'Last Treatment', 
//       width: 150,
//       renderCell: (p) => (
//         <Typography variant="body2" color={p.value === 'N/A' ? 'text.disabled' : 'text.primary'}>
//           {p.value}
//         </Typography>
//       )
//     },
//     { field: 'latest_weight', headerName: 'Weight (kg)', type: 'number', width: 110 },
//     { 
//         field: 'reproductive_status', 
//         headerName: 'Reproduction', 
//         width: 130,
//         renderCell: (p) => (
//             <Typography variant="body2" sx={{ color: p.value === 'pregnant' ? '#7044ff' : 'inherit', textTransform: 'capitalize' }}>
//                 {p.value || 'N/A'}
//             </Typography>
//         )
//     },
//     {
//       field: 'actions',
//       headerName: 'View',
//       width: 90,
//       renderCell: (p) => (
//         <Button size="small" onClick={() => history.push(`/animal/${p.id}`)}>Details</Button>
//       )
//     }
//   ];

//   if (loading || !selectedHerd) {
//     return (
//       <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
//         <IonSpinner name="crescent" color="primary" />
//         <Typography sx={{ mt: 2 }}>Syncing with Digital Kraal...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start"><IonBackButton defaultHref="/herds" /></IonButtons>
//           {/* <IonTitle>{selectedHerd.name} Details</IonTitle> */}
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         {/* 1. Header & Context */}
//         <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
//           <Box>
//             <Typography variant="h4" fontWeight="bold">{selectedHerd.name}</Typography>
//             <Typography color="text.secondary">{selectedHerd.location} • {selectedHerd.herd_type}</Typography>
//           </Box>
//           <Stack direction="row" spacing={1}>
//             <Button 
//               variant="outlined" 
//               color="success" 
//               size="small" 
//               disabled={actionLoading}
//               onClick={() => handleBulkAction('healthy')}
//             >
//               Clear Sick Flags
//             </Button>
//             <Button 
//               variant="outlined" 
//               color="info" 
//               size="small"
//               disabled={actionLoading}
//               onClick={() => handleBulkAction('vaccinate')}
//             >
//               Log Vaccination
//             </Button>
//           </Stack>
//         </Box>

//         {/* 2. Stats Ribbon */}
//         <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: '#f4f5f8', borderRadius: '12px' }}>
//             <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
//                 <Box>
//                     <Typography variant="caption" fontWeight="bold">TOTAL</Typography>
//                     <Typography variant="h5">{selectedHerd.total_cattle}</Typography>
//                 </Box>
//                 <Box>
//                     <Typography variant="caption" fontWeight="bold">COWS</Typography>
//                     <Typography variant="h5">{selectedHerd.cows_count}</Typography>
//                 </Box>
//                 <Box>
//                     <Typography variant="caption" fontWeight="bold">BULLS</Typography>
//                     <Typography variant="h5">{selectedHerd.bulls_count}</Typography>
//                 </Box>
//                 <Box>
//                     <Typography variant="caption" fontWeight="bold" sx={{ color: '#eb445a' }}>SICK</Typography>
//                     <Typography variant="h5" sx={{ color: '#eb445a' }}>{selectedHerd.sick_count}</Typography>
//                 </Box>
//                 <Box>
//                     <Typography variant="caption" fontWeight="bold" sx={{ color: '#7044ff' }}>PREGNANT</Typography>
//                     <Typography variant="h5" sx={{ color: '#7044ff' }}>{selectedHerd.pregnant_count}</Typography>
//                 </Box>
//             </Stack>
//         </Paper>

//         {selectedHerd.sick_count > 0 && (
//           <Alert severity="warning" sx={{ mb: 2 }}>
//             There are {selectedHerd.sick_count} animals requiring health checks in this herd.
//           </Alert>
//         )}

//         {/* 3. The Digital Kraal DataGrid */}
//         <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Animal Inventory</Typography>
//         <Box sx={{ height: 600, width: '100%', bgcolor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
//           <DataGrid 
//             rows={selectedHerd.animals || []} 
//             columns={animalColumns} 
//             getRowId={(row) => row.id}
//             slots={{ toolbar: GridToolbar }}
//             slotProps={{ toolbar: { showQuickFilter: true } }}
//             pageSizeOptions={[10, 25, 50]}
//             initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//             sx={{ border: 0 }}
//             loading={actionLoading}
//           />
//         </Box>

//         {/* 4. Footer Navigation */}
//         <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//           <Button variant="contained" disableElevation onClick={() => history.push(`/herds/${id}/add-animal`)}>
//             Register Animal
//           </Button>
//           <Button variant="outlined" onClick={() => history.push(`/counting/new?herd=${id}`)}>
//             Start Count Session
//           </Button>
//         </Stack>

//         <IonToast
//           isOpen={!!toastMessage}
//           message={toastMessage}
//           duration={3000}
//           onDidDismiss={() => setToastMessage('')}
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default HerdDetailView;
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  Box, Typography, Button, Chip, Stack, Divider, Paper, Alert, TextField, InputAdornment
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'; // Removed GridToolbar as we are using custom search
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonContent, IonSpinner, IonToast 
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { fetchHerdById } from '../redux/store/slices/livestockSlice';
import { livestockService } from '../services/livestockService';

const HerdDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  
  const { selectedHerd, loading } = useAppSelector((state) => state.livestock);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // 1. ADD SEARCH STATE
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchHerdById(Number(id)));
    }
  }, [id, dispatch]);

  // 2. FILTER LOGIC FOR TAG NUMBER
  const filteredAnimals = (selectedHerd?.animals || []).filter((animal) =>
    animal.tag_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBulkAction = async (actionType: 'healthy' | 'vaccinate') => {
    setActionLoading(true);
    try {
      if (actionType === 'healthy') {
        await livestockService.markHerdHealthy(Number(id));
        setToastMessage('All animals marked as active/healthy.');
      } else {
        await livestockService.vaccinateHerd(Number(id), 'General Vaccination');
        setToastMessage('Herd vaccination records updated.');
      }
      dispatch(fetchHerdById(Number(id))); 
    } catch (error) {
      setToastMessage('Action failed. Please check server connection.');
    } finally {
      setActionLoading(false);
    }
  };

  const animalColumns: GridColDef[] = [
    { field: 'tag_number', headerName: 'Tag Number', width: 130, renderCell: (p) => <strong>{p.value}</strong> },
    { field: 'breed', headerName: 'Breed', width: 120 },
    { 
      field: 'gender', 
      headerName: 'Gender', 
      width: 100,
      renderCell: (p) => (
        <Chip 
          label={p.value} 
          size="small" 
          variant="outlined" 
          color={p.value?.toLowerCase() === 'female' ? 'secondary' : 'primary'} 
        />
      )
    },
    { 
      field: 'status_display', 
      headerName: 'Health Status', 
      width: 130,
      renderCell: (params: any) => {
        const val = params.value;
        let chipColor = '#2dd36f'; 
        if (val === 'Sick') chipColor = '#eb445a';
        if (val === 'Quarantine') chipColor = '#f2a104';
        if (val === 'Deceased') chipColor = '#707070';

        return (
          <Chip 
            label={val} 
            size="small" 
            sx={{ bgcolor: chipColor, color: 'white', fontWeight: 'bold' }} 
          />
        );
      }
    },
    { 
      field: 'last_treatment_date', 
      headerName: 'Last Treatment', 
      width: 150,
      renderCell: (p) => (
        <Typography variant="body2" color={p.value === 'N/A' ? 'text.disabled' : 'text.primary'}>
          {p.value}
        </Typography>
      )
    },
    { field: 'latest_weight', headerName: 'Weight (kg)', type: 'number', width: 110 },
    { 
        field: 'reproductive_status', 
        headerName: 'Reproduction', 
        width: 130,
        renderCell: (p) => (
            <Typography variant="body2" sx={{ color: p.value === 'pregnant' ? '#7044ff' : 'inherit', textTransform: 'capitalize' }}>
                {p.value || 'N/A'}
            </Typography>
        )
    },
    {
      field: 'actions',
      headerName: 'View',
      width: 90,
      renderCell: (p) => (
        <Button size="small" onClick={() => history.push(`/animal/${p.id}`)}>Details</Button>
      )
    }
  ];

  if (loading || !selectedHerd) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
        <IonSpinner name="crescent" color="primary" />
        <Typography sx={{ mt: 2 }}>Syncing with Digital Kraal...</Typography>
      </Box>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/herds" /></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Header Section */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">{selectedHerd.name}</Typography>
            <Typography color="text.secondary">{selectedHerd.location} • {selectedHerd.herd_type}</Typography>
          </Box>
           {/* <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          
          <Button variant="outlined" onClick={() => history.push(`/counting/new?herd=${id}`)}>
            Start Count Session
          </Button>
        </Stack> */}
          <Stack direction="row" spacing={1}>
            <Button variant="contained" disableElevation onClick={() => history.push(`/herds/${id}/add-animal`)}>
            Register Animal
          </Button>
            <Button variant="outlined" color="success" size="small" disabled={actionLoading} onClick={() => handleBulkAction('healthy')}>
              Clear Sick Flags
            </Button>
            <Button variant="outlined" color="info" size="small" disabled={actionLoading} onClick={() => handleBulkAction('vaccinate')}>
              Log Vaccination
            </Button>
          </Stack>
        </Box>

        {/* Stats Ribbon */}
        <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: '#f4f5f8', borderRadius: '12px' }}>
            <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
                <Box><Typography variant="caption" fontWeight="bold">TOTAL</Typography><Typography variant="h5">{selectedHerd.total_cattle}</Typography></Box>
                <Box><Typography variant="caption" fontWeight="bold">COWS</Typography><Typography variant="h5">{selectedHerd.cows_count}</Typography></Box>
                <Box><Typography variant="caption" fontWeight="bold">BULLS</Typography><Typography variant="h5">{selectedHerd.bulls_count}</Typography></Box>
                <Box><Typography variant="caption" fontWeight="bold" sx={{ color: '#eb445a' }}>SICK</Typography><Typography variant="h5" sx={{ color: '#eb445a' }}>{selectedHerd.sick_count}</Typography></Box>
                <Box><Typography variant="caption" fontWeight="bold" sx={{ color: '#7044ff' }}>PREGNANT</Typography><Typography variant="h5" sx={{ color: '#7044ff' }}>{selectedHerd.pregnant_count}</Typography></Box>
            </Stack>
        </Paper>

        {selectedHerd.sick_count > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            There are {selectedHerd.sick_count} animals requiring health checks.
          </Alert>
        )}

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Animal Inventory</Typography>

        {/* 3. SEARCH BAR IMPLEMENTATION */}
        <TextField
          fullWidth
          placeholder="Search by Tag Number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2, bgcolor: 'white' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IonIcon icon={searchOutline} style={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 4. THE DATA GRID (Using filteredAnimals) */}
        <Box sx={{ height: 600, width: '100%', bgcolor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <DataGrid 
            rows={filteredAnimals} 
            columns={animalColumns} 
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            sx={{ border: 0 }}
            loading={actionLoading}
            disableRowSelectionOnClick
          />
        </Box>

        {/* Footer Navigation */}
       

        <IonToast isOpen={!!toastMessage} message={toastMessage} duration={3000} onDidDismiss={() => setToastMessage('')} />
      </IonContent>
    </IonPage>
  );
};

export default HerdDetailView;