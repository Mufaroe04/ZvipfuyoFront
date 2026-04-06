import React, { useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonMenuButton, IonFab, IonFabButton, IonIcon 
} from '@ionic/react';
import { add, trendingUp, trendingDown, addOutline } from 'ionicons/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeights } from '../redux/store/slices/operationsSlice';
import { RootState, AppDispatch } from '../redux/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography, Box, Chip, Paper, Stack, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const WeightListing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { weights, loading } = useSelector((state: RootState) => state.operations);
const history = useHistory();
  

  useEffect(() => {
    dispatch(fetchWeights());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { 
      field: 'animal_tag', 
      headerName: 'Animal Tag', 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          {params.value || 'N/A'}
        </Typography>
      )
    },
    { field: 'date', headerName: 'Date', flex: 1 },
    { 
      field: 'weight_kg', 
      headerName: 'Weight (kg)', 
      width: 130,
      renderCell: (params) => <Typography>{params.value} kg</Typography>
    },
    { 
      field: 'change_kg', 
      headerName: 'Change', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          size="small"
          icon={<IonIcon icon={Number(params.value) >= 0 ? trendingUp : trendingDown} />}
          label={`${Number(params.value) > 0 ? '+' : ''}${params.value} kg`}
          color={Number(params.value) >= 0 ? "success" : "error"}
          variant="outlined"
        />
      )
    },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Weight Logs</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="flex-start" 
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">Growth Monitor</Typography>
            <Typography variant="body2" color="text.secondary">
              Digital Kraal weight gain records.
            </Typography>
          </Box>

          <Button 
            variant="contained" 
            startIcon={<IonIcon icon={addOutline} />}
            onClick={() => history.push("/weights/add")}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontWeight: 'bold', 
              bgcolor: '#3880ff',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#2e69d9' }
            }}
          >
            New Weight
          </Button>
        </Stack>
        <Paper sx={{ height: '70vh', width: '100%', borderRadius: '15px', overflow: 'hidden' }} elevation={0} variant="outlined">
          <DataGrid
            rows={weights}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            sx={{ border: 'none' }}
          />
        </Paper>

        {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/weights/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab> */}
      </IonContent>
    </IonPage>
  );
};

export default WeightListing;