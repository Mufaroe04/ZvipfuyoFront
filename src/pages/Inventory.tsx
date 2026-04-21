// import React, { useEffect, useState } from 'react';
// import { 
//   IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
//   IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, useIonLoading 
// } from '@ionic/react';
// import { 
//   Container, Box, Typography, Paper, Chip, IconButton, 
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack 
// } from '@mui/material';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { addOutline, alertCircleOutline, removeCircleOutline, addCircleOutline, settingsOutline, archiveOutline, cartOutline } from 'ionicons/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../redux/store';
// import { fetchAllInventory, updateInventoryItem } from '../redux/store/slices/inventorySlice';
// import { useHistory } from 'react-router-dom';
// import { InventoryItem } from '../types/types';

// const Inventory: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const history = useHistory();
//   const [presentLoading, dismissLoading] = useIonLoading();
//   const { items, loading } = useSelector((state: RootState) => state.inventory);

//   // Modal State
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
//   const [adjustAmount, setAdjustAmount] = useState<number>(0);
//   const [notes, setNotes] = useState('');

//   useEffect(() => {
//     dispatch(fetchAllInventory());
//   }, [dispatch]);

//   const handleOpenAdjust = (item: InventoryItem) => {
//     setSelectedItem(item);
//     setOpenModal(true);
//   };

//   const handleUpdateStock = async (type: 'add' | 'remove') => {
//     if (!selectedItem) return;
    
//     await presentLoading('Updating levels...');
//     const change = type === 'add' ? adjustAmount : -adjustAmount;
//     const newTotal = Number(selectedItem.quantity_on_hand) + change;

//     await dispatch(updateInventoryItem({
//       id: selectedItem.id,
//       data: { 
//         quantity_on_hand: newTotal,
//         notes: notes || `${type === 'add' ? 'Added' : 'Used'} ${adjustAmount} ${selectedItem.unit}`
//       }
//     }));

//     dismissLoading();
//     setOpenModal(false);
//     setAdjustAmount(0);
//     setNotes('');
//   };

//   const columns: GridColDef[] = [
//     { field: 'name', headerName: 'Item Name', flex: 1.5 },
//     { field: 'category', headerName: 'Category', flex: 1 },
//     { 
//       field: 'quantity_on_hand', 
//       headerName: 'Stock', 
//       flex: 1,
//       renderCell: (params) => (
//         <Typography variant="body2" fontWeight="700">
//           {params.value} {params.row.unit}
//         </Typography>
//       )
//     },
//     {
//       field: 'actions',
//       headerName: 'Adjust',
//       width: 100,
//       renderCell: (params) => (
//         <IconButton color="primary" onClick={() => handleOpenAdjust(params.row)}>
//           <IonIcon icon={removeCircleOutline} />
//         </IconButton>
//       )
//     },
//     {
//         field: 'history',
//         headerName: 'Log',
//         width: 80,
//         renderCell: (params) => (
//           <IconButton onClick={() => history.push(`/inventory/history?item=${params.row.id}`)}>
//             <IonIcon icon={archiveOutline} />
//           </IconButton>
//         )
//       }
//   ];

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonButtons slot="end">
//       {/* THIS IS YOUR NAVIGATION BUTTON */}
//       <Button 
//         variant="text" 
//         size="small" 
//         startIcon={<IonIcon icon={settingsOutline} />}
//         onClick={() => history.push('/inventory/history')}
//         sx={{ textTransform: 'none', fontWeight: 'bold' }}
//       >
//         Audit Trail
//       </Button>
//     </IonButtons>
//           <IonTitle>Inventory</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//           <Button 
//             size="small" 
//             variant="contained" 
//             color="warning"
//             onClick={() => history.push('/procurement')}
//             startIcon={<IonIcon icon={cartOutline} />}
//             sx={{ borderRadius: '12px', fontWeight: 'bold' }}
//           >
//             Manage Orders
//           </Button>
//         <Container maxWidth="lg">
//           <Box sx={{ mb: 4, mt: 2 }}>
//             <Typography variant="h4" fontWeight="800" color="primary">Digital Kraal Store</Typography>
//             <Typography variant="body1" color="text.secondary">Manage feed, medicine, and equipment.</Typography>
//           </Box>

//           <Paper variant="outlined" sx={{ height: '70vh', borderRadius: '16px', overflow: 'hidden' }}>
//             <DataGrid rows={items} columns={columns} loading={loading} sx={{ border: 'none' }} />
//           </Paper>
//         </Container>

//         {/* Adjust Stock Modal */}
//         <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
//           <DialogTitle>Adjust Stock: {selectedItem?.name}</DialogTitle>
//           <DialogContent>
//             <Stack spacing={3} sx={{ mt: 1 }}>
//               <TextField 
//                 label={`Amount to Add/Remove (${selectedItem?.unit})`}
//                 type="number" 
//                 fullWidth 
//                 onChange={(e) => setAdjustAmount(Number(e.target.value))} 
//               />
//               <TextField 
//                 label="Reason / Notes" 
//                 placeholder="e.g. Fed Herd B" 
//                 fullWidth 
//                 multiline 
//                 rows={2} 
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//             </Stack>
//           </DialogContent>
//           <DialogActions sx={{ p: 2 }}>
//             <Button onClick={() => handleUpdateStock('remove')} color="error" variant="outlined" startIcon={<IonIcon icon={removeCircleOutline} />}>
//               Use
//             </Button>
//             <Button onClick={() => handleUpdateStock('add')} color="success" variant="contained" startIcon={<IonIcon icon={addCircleOutline} />}>
//               Restock
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <IonFab vertical="bottom" horizontal="end" slot="fixed">
//           <IonFabButton onClick={() => history.push('/inventory/add')}><IonIcon icon={addOutline} /></IonFabButton>
//         </IonFab>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Inventory;
import React, { useEffect, useState } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonIcon, useIonLoading 
} from '@ionic/react';
import { 
  Container, Box, Typography, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, Button, Stack 
} from '@mui/material';
import { addOutline, removeCircleOutline, addCircleOutline, cartOutline, settingsOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchAllInventory, updateInventoryItem } from '../redux/store/slices/inventorySlice';
import { useHistory } from 'react-router-dom';
import { InventoryItem } from '../types/types';
import InventoryTable from '../components/InventoryTable';

const Inventory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { items, loading } = useSelector((state: RootState) => state.inventory);

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(fetchAllInventory());
  }, [dispatch]);

  const handleOpenAdjust = (item: InventoryItem) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleUpdateStock = async (type: 'add' | 'remove') => {
    if (!selectedItem) return;
    
    await presentLoading('Updating levels...');
    const change = type === 'add' ? adjustAmount : -adjustAmount;
    const newTotal = Number(selectedItem.quantity_on_hand) + change;

    await dispatch(updateInventoryItem({
      id: selectedItem.id,
      data: { 
        quantity_on_hand: newTotal,
        notes: notes || `${type === 'add' ? 'Added' : 'Used'} ${adjustAmount} ${selectedItem.unit}`
      }
    }));

    dismissLoading();
    setOpenModal(false);
    setAdjustAmount(0);
    setNotes('');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, mt: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">Digital Kraal Store</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage feed, medicine, and equipment stock levels.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button 
                variant="outlined" 
                startIcon={<IonIcon icon={cartOutline} />}
                onClick={() => history.push('/procurement')}
                sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold', color: '#18774c', borderColor: '#18774c' }}
              >
                Orders
              </Button>
              <Button 
                variant="contained" 
                startIcon={<IonIcon icon={addOutline} />}
                onClick={() => history.push('/inventory/add')}
                sx={{ 
                  borderRadius: '8px', 
                  textTransform: 'none', 
                  fontWeight: 'bold', 
                  bgcolor: '#18774c',
                  '&:hover': { bgcolor: '#14633f' }
                }}
              >
                Add Item
              </Button>
                  <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<IonIcon icon={settingsOutline} />}
                  onClick={() => history.push('/inventory/history')}
                  sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold', color: '#18774c', borderColor: '#18774c' }}
                >
                  History 
                </Button>
            </Stack>
          </Stack>

          <InventoryTable 
            items={items} 
            loading={loading} 
            onAdjust={handleOpenAdjust} 
          />
        </Container>

        {/* Adjust Stock Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontWeight: 'bold' }}>Adjust Stock: {selectedItem?.name}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField 
                label={`Amount to Adjust (${selectedItem?.unit})`}
                type="number" 
                fullWidth 
                onChange={(e) => setAdjustAmount(Number(e.target.value))} 
              />
              <TextField 
                label="Reason / Notes" 
                placeholder="e.g. Fed Herd B" 
                fullWidth 
                multiline 
                rows={2} 
                onChange={(e) => setNotes(e.target.value)}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => handleUpdateStock('remove')} color="error" variant="outlined" startIcon={<IonIcon icon={removeCircleOutline} />}>
              Use
            </Button>
            <Button onClick={() => handleUpdateStock('add')} variant="contained" sx={{ bgcolor: '#18774c' }} startIcon={<IonIcon icon={addCircleOutline} />}>
              Restock
            </Button>
          </DialogActions>
        </Dialog>
      </IonContent>
    </IonPage>
  );
};

export default Inventory;