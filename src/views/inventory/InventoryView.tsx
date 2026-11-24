import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import {  Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material';
import { addOutline, removeCircleOutline, addCircleOutline, cartOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useInventoryList } from './hooks/useInventoryList';
import InventoryGridList from './components/InventoryGridList';

const InventoryView: React.FC = () => {
  const history = useHistory();
  const {
    items, loading, openModal, setOpenModal, selectedItem,rowCount,paginationModel,
    setAdjustAmount, setNotes, handleOpenAdjust, handleUpdateStock,setPaginationModel
  } = useInventoryList();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 1 }}>
            <Box>
              <Typography variant="body1" fontWeight="bold">Digital Kraal Store</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage feed, medicine, and equipment stock levels.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button 
                variant="outlined" 
                startIcon={<IonIcon icon={cartOutline} />}
                onClick={() => history.push('/procurement')}
                sx={{ borderRadius: '4px', textTransform: 'none', fontWeight: 'bold', color: '#18774c', borderColor: '#18774c' }}
              >
                Orders
              </Button>
              <Button 
                variant="contained" 
                startIcon={<IonIcon icon={addOutline} />}
                onClick={() => history.push('/inventory/add')}
                sx={{ borderRadius: '4px', textTransform: 'none', fontWeight: 'bold', bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' } }}
              >
                Add Item
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<IonIcon icon={settingsOutline} />}
                onClick={() => history.push('/inventory/history')}
                sx={{ borderRadius: '4px', textTransform: 'none', fontWeight: 'bold', color: '#18774c', borderColor: '#18774c' }}
              >
                History 
              </Button>
            </Stack>
          </Stack>
          
          <InventoryGridList items={items.results} loading={loading} onAdjust={handleOpenAdjust} rowCount={rowCount} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel}/>

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

export default InventoryView;