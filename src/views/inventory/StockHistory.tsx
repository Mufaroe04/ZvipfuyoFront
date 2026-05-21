// import React, { useEffect, useState } from 'react';
// import { 
//   IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
//   IonButtons, IonBackButton, IonIcon 
// } from '@ionic/react';
// import { Container, Box, Typography, Paper, Chip,  } from '@mui/material';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { arrowUpOutline, arrowDownOutline, settingsOutline } from 'ionicons/icons';
// import api from '../../services/api';
// import { useLocation } from 'react-router-dom';

// const StockHistory: React.FC = () => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Use useLocation to properly track URL changes in React
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const itemId = queryParams.get('item');

//   useEffect(() => {
//     const fetchLogs = async () => {
//       setLoading(true);
//       try {
//         // We pass the itemId as a parameter so the backend can filter the logs
//         const res = await api.get('inventory/logs/', { 
//           params: { item_id: itemId } 
//         });
//         setLogs(res.data);
//       } catch (err) {
//         console.error("Error fetching logs", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();
//   }, [itemId]); // Re-run if the itemId in the URL changes

 

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonBackButton defaultHref="/inventory" /></IonButtons>
//           <IonTitle>Stock History </IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         <Container maxWidth="lg">
//           <Box sx={{ mb: 4, mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>

//             <Box>
//               <Typography variant="h5" fontWeight="800">
//                 {itemId ? `History for Item #${itemId}` : "Inventory Logs"}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Detailed history of additions, usage, and stock adjustments.
//               </Typography>
//             </Box>
//           </Box>

//           <Paper variant="outlined" sx={{ height: '70vh', borderRadius: '16px', overflow: 'hidden' }}>
//             <DataGrid
//               rows={logs}
//               columns={columns}
//               loading={loading}
//               pageSizeOptions={[15]}
//               initialState={{ pagination: { paginationModel: { pageSize: 15 } } }}
//               sx={{ border: 'none' }}
//               disableRowSelectionOnClick
//             />
//           </Paper>
//         </Container>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default StockHistory;
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