import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useHistory, useLocation } from "react-router-dom";
import { 
  Button, Box, Typography,  Stack, TextField, InputAdornment, Paper, Divider
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonMenuButton, IonIcon, 
  IonSpinner
} from '@ionic/react';
import { addOutline, searchOutline, closeCircleOutline } from 'ionicons/icons';
import { fetchAllAnimals } from '../redux/store/slices/livestockSlice';

const MyAnimals: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<{ filterIds?: number[], title?: string }>();
  
  const { animals, loading, getAnimalsError } = useAppSelector((state) => state.livestock);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAllAnimals());
  }, [dispatch]);

  // --- FILTERING LOGIC ---
  const filteredAnimals = (animals || []).filter((animal) => {
    // 1. Check if we are in "Insight Mode" (filtering by specific IDs)
    const isFilteredById = location.state?.filterIds 
      ? location.state.filterIds.includes(animal.id) 
      : true;

    // 2. Check if matches search bar text
    const matchesSearch = 
      animal.tag_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (animal.breed || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    return isFilteredById && matchesSearch;
  });

  const columns: GridColDef[] = [
    { 
      field: 'tag_number', 
      headerName: 'Tag Number', 
      width: 140, 
      // renderCell: (p) => <strong style={{ color: '#3880ff' }}>{p.value}</strong> 
    },
    { field: 'breed', headerName: 'Breed', flex: 1, minWidth: 120 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      // renderCell: (params) => {
      //   const val = params.value;
      //   let color = '#2dd36f'; 
      //   if (val === 'Sick' || val === 'deceased') color = '#eb445a';
      //   if (val === 'Quarantine') color = '#f2a104';
        
      //   return (
      //     <Chip 
      //       label={val?.toUpperCase() || 'ACTIVE'} 
      //       size="small" 
      //       sx={{ bgcolor: color, color: 'white', fontWeight: 'bold', fontSize: '0.7rem' }} 
      //     />
      //   );
      // }
    },
    { field: 'herd_name', headerName: 'Herd Name', width: 150 },
    {
      field: 'actions',
      headerName: 'Action',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => history.push(`/animal/${params.id}`)}
          sx={{ textTransform: 'none', borderRadius: '6px' }}
        >
          View
        </Button>
      ),
    },
  ];

  if (getAnimalsError) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <Typography color="error">Error loading animals: {getAnimalsError}</Typography>
        </IonContent>
      </IonPage>
    );
  }
  // if ( animals.length === 0) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
  //       <IonSpinner name="crescent" />
  //     </Box>
  //   );
  // }
    if (loading) return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <IonSpinner name="crescent" color="primary" />
      </Box>
    );
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          {/* Shows "Fattening Alerts" etc. if redirected from Insights, else "My Animals" */}
          <IonTitle>{location.state?.title || 'My Animals'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
        {/* 1. Header & Context Actions */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            {location.state?.filterIds ? (
              <Button 
                startIcon={<IonIcon icon={closeCircleOutline} />}
                color="error"
                size="small"
                onClick={() => history.replace('/animals', {})} // Clears the state
                sx={{ textTransform: 'none' }}
              >
                Clear Filter
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Total Stock: {animals?.length || 0}
              </Typography>
            )}
          </Box>
          <Button 
            variant="contained" 
            startIcon={<IonIcon icon={addOutline} />}
            onClick={() => history.push("/animals/add")}
            sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold', }}
          >
            New Animal
          </Button>
        </Stack>

        {/* 2. List Summary Info */}
        <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: '#f4f5f8', borderRadius: '12px' }}>
          <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
            <Box>
              <Typography variant="caption" fontWeight="bold" color="text.secondary">
                {location.state?.filterIds ? "FILTERED RESULT" : "FARM TOTAL"}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {filteredAnimals.length} <small style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>Head</small>
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* 3. Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by Tag Number or Breed..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IonIcon icon={searchOutline} style={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 4. Data Grid */}
        <Box sx={{ 
          height: '60vh', 
          width: '100%', 
          bgcolor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          border: '1px solid #f0f0f0'
        }}>
          <DataGrid
            rows={filteredAnimals}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{ 
              border: 0,
              '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold', color: '#666' },
              '& .MuiDataGrid-cell:focus': { outline: 'none' }
            }}
          />
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default MyAnimals;