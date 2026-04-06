import React, { useEffect, useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonBackButton, IonIcon 
} from '@ionic/react';
import { Container, Box, Typography, Paper, Chip, Avatar } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { arrowUpOutline, arrowDownOutline, settingsOutline } from 'ionicons/icons';
import api from '../services/api';
import { useLocation } from 'react-router-dom';

const StockHistory: React.FC = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Use useLocation to properly track URL changes in React
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get('item');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        // We pass the itemId as a parameter so the backend can filter the logs
        const res = await api.get('inventory/logs/', { 
          params: { item_id: itemId } 
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [itemId]); // Re-run if the itemId in the URL changes

  const columns: GridColDef[] = [
    { 
      field: 'log_type', 
      headerName: 'Type', 
      width: 130,
      renderCell: (params) => {
        const isAddition = params.value === 'addition';
        const isUsage = params.value === 'usage';
        return (
          <Chip 
            size="small"
            icon={<IonIcon icon={isAddition ? arrowUpOutline : (isUsage ? arrowDownOutline : settingsOutline)} />}
            label={params.value?.toUpperCase()}
            color={isAddition ? "success" : (isUsage ? "warning" : "default")}
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
          />
        );
      }
    },
    { field: 'item_name', headerName: 'Item', flex: 1 },
    { 
      field: 'quantity', 
      headerName: 'Qty', 
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="700">
          {params.row.log_type === 'usage' ? '-' : '+'}{params.value}
        </Typography>
      )
    },
    { field: 'notes', headerName: 'Activity Note', flex: 1.5 },
    { field: 'date_display', headerName: 'Timestamp', width: 180 },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/inventory" /></IonButtons>
          <IonTitle>Stock Audit Trail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <IonIcon icon={settingsOutline} />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="800">
                {itemId ? `History for Item #${itemId}` : "Inventory Logs"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed history of additions, usage, and stock adjustments.
              </Typography>
            </Box>
          </Box>

          <Paper variant="outlined" sx={{ height: '70vh', borderRadius: '16px', overflow: 'hidden' }}>
            <DataGrid
              rows={logs}
              columns={columns}
              loading={loading}
              pageSizeOptions={[15]}
              initialState={{ pagination: { paginationModel: { pageSize: 15 } } }}
              sx={{ border: 'none' }}
              disableRowSelectionOnClick
            />
          </Paper>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default StockHistory;