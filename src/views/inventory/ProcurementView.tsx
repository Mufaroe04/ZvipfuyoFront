// import React, { useEffect, useState, useMemo } from 'react';
// import { 
//   IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
//   IonButtons, IonMenuButton, IonIcon, useIonToast, useIonLoading 
// } from '@ionic/react';
// import { Container, Box, Typography, Paper, Button, Stack } from '@mui/material';
// import { sparklesOutline } from 'ionicons/icons';
// import api from '../../services/api';
// import ProcurementTable from './components/ProcurementGridList';

// const ProcurementView: React.FC = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showToast] = useIonToast();
//   const [presentLoading, dismissLoading] = useIonLoading();

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get('procurement/');
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching POs", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchOrders(); }, []);

//   // Calculate stats using useMemo for performance
//   const stats = useMemo(() => {
//     const spent = orders
//       .filter(o => o.status === 'received')
//       .reduce((acc, curr) => acc + parseFloat(curr.estimated_cost || 0), 0);
    
//     const pending = orders
//       .filter(o => o.status !== 'received')
//       .reduce((acc, curr) => acc + parseFloat(curr.estimated_cost || 0), 0);
      
//     return { totalSpent: spent, pendingValue: pending };
//   }, [orders]);

//   const handleMarkAsSent = async (id: number) => {
//     try {
//       await api.patch(`procurement/${id}/`, { status: 'sent' });
//       showToast({ message: 'PO marked as Sent', duration: 2000, color: 'success' });
//       fetchOrders();
//     } catch (err) {
//       showToast({ message: 'Failed to update status', duration: 2000, color: 'danger' });
//     }
//   };

//   const handleReceiveStock = async (id: number) => {
//     try {
//       await api.post(`procurement/${id}/receive_stock/`);
//       showToast({ message: 'Stock added to inventory!', duration: 2000, color: 'success' });
//       fetchOrders(); 
//     } catch (err) {
//       showToast({ message: 'Error receiving stock', duration: 2000, color: 'danger' });
//     }
//   };

//   const handleBulkGenerate = async () => {
//     await presentLoading({ message: 'Analyzing stock levels...', spinner: 'crescent' });
//     try {
//       const res = await api.post('procurement/bulk-generate/');
//       showToast({ message: res.data.message, color: 'success', duration: 3000 });
//       fetchOrders(); 
//     } catch (err) {
//       showToast({ message: 'Failed to auto-generate', color: 'danger' });
//     } finally {
//       dismissLoading();
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle style={{ fontWeight: 700 }}>Procurement</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         <Container maxWidth="lg">
//           <Box sx={{ mb: 4, mt: 2 }}>
//             <Typography variant="h5" fontWeight="bold">Supply Chain</Typography>
//             <Typography variant="body2" color="text.secondary">Automated requisitions based on real-time stock levels.</Typography>
//           </Box>

//           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
//             <Paper sx={{ p: 2, flex: 1, bgcolor: '#18774c', color: 'white', borderRadius: '16px' }}>
//               <Typography variant="overline" sx={{ opacity: 0.8 }}>Total Received (3M)</Typography>
//               <Typography variant="h4" fontWeight="bold">${stats.totalSpent.toLocaleString()}</Typography>
//             </Paper>

//             <Paper sx={{ p: 2, flex: 1, bgcolor: '#fff', border: '1px solid #e0e0e0', borderRadius: '16px' }}>
//               <Typography variant="overline" color="text.secondary">Committed / Pending</Typography>
//               <Typography variant="h4" fontWeight="bold" color="grey">${stats.pendingValue.toLocaleString()}</Typography>
//             </Paper>
//           </Stack>

//           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" fontWeight="bold">Active Requisitions</Typography>
//             <Button 
//               variant="contained" 
//               startIcon={<IonIcon icon={sparklesOutline} />}
//               onClick={handleBulkGenerate}
//               sx={{ borderRadius: '8px', textTransform: 'none', bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' } }}
//             >
//               Auto-Generate
//             </Button>
//           </Box>

//           <ProcurementTable 
//             orders={orders} 
//             loading={loading} 
//             onConfirm={handleMarkAsSent}
//             onReceive={handleReceiveStock}
//           />
//         </Container>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ProcurementView;
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