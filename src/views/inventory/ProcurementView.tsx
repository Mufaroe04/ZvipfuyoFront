import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonIcon } from '@ionic/react';
import { Container, Box, Typography, Paper, Button, Stack } from '@mui/material';
import { sparklesOutline } from 'ionicons/icons';
import { useProcurement } from './hooks/useProcurement';
import ProcurementGridList from './components/ProcurementGridList';

const ProcurementView: React.FC = () => {
  const { orders, loading, stats, handleMarkAsSent, handleReceiveStock, handleBulkGenerate,paginationModel ,rowCount ,setPaginationModel} = useProcurement();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Procurement</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Box sx={{ mb: 1, mt: 1 }}>
            <Typography variant="body1" fontWeight="bold">Supply Chain</Typography>
            <Typography variant="body2" color="text.secondary">Automated requisitions based on real-time stock levels.</Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 1 }}>
            <Paper elevation={0} sx={{ p: 2, flex: 1, bgcolor: '#18774c', color: 'white', borderRadius: '4px' }}>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>Total Received (3M)</Typography>
              <Typography variant="body1" fontWeight="bold">${stats.totalSpent.toLocaleString()}</Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, flex: 1, bgcolor: '#fff', borderRadius: '4px' }}>
              <Typography variant="overline" color="text.secondary">Committed / Pending</Typography>
              <Typography variant="body1" fontWeight="bold" color="grey">${stats.pendingValue.toLocaleString()}</Typography>
            </Paper>
          </Stack>

          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" fontWeight="bold">Active Requisitions</Typography>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={sparklesOutline} />}
              onClick={handleBulkGenerate}
              sx={{ borderRadius: '4px', textTransform: 'none', bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' } }}
            >
              Auto-Generate
            </Button>
          </Box>

          <ProcurementGridList 
            orders={orders} 
            loading={loading} 
            onConfirm={handleMarkAsSent}
            onReceive={handleReceiveStock}
            rowCount={rowCount}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default ProcurementView;