import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';
import { Container, Box, Typography } from '@mui/material';
import { useStockHistory } from './hooks/useStockHistory';
import { getStockHistoryColumns } from './components/StockHistoryColumns';
import { CustomDataGrid } from '../../components/datagrid/CustomDataGrid';

const StockHistoryView: React.FC = () => {
  const { logs, loading, itemId } = useStockHistory();
  const columns = getStockHistoryColumns();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/inventory" /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Stock History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, mt: 2 }}>
            <Typography variant="body1" fontWeight="800">
              {itemId ? `History for Item #${itemId}` : "Inventory Logs"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed history of additions, usage, and stock adjustments.
            </Typography>
          </Box>
          
          <CustomDataGrid
            rows={logs}
            columns={columns}
            loading={loading}
            height="70vh"
            paginationMode="client"
            getRowId={(row: any) => row.id}
          />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default StockHistoryView;