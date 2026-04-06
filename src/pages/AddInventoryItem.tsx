import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, useIonLoading, IonIcon } from '@ionic/react';
import { Container, TextField, MenuItem, Button, Stack, Paper, Typography, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addInventoryItem } from '../redux/store/slices/inventorySlice';
import { AppDispatch } from '../redux/store';
import { useHistory } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons';
import api from '../services/api';

const AddInventoryItem: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [present] = useIonLoading();
  const [suppliers, setSuppliers] = useState<any[]>([]); // To store directory list
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'feed',
    quantity_on_hand: 0,
    unit: 'kg',
    reorder_level: 10,
    preferred_supplier: ''
  });

  useEffect(() => {
    // Fetch suppliers so we can populate the dropdown
    api.get('suppliers/').then(res => setSuppliers(res.data));
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await present('Saving item...');
    await dispatch(addInventoryItem(formData));
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
        <IonButtons slot="start">
                {/* The missing piece of the puzzle! */}
                {/* <IonMenuButton /> */}
                <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
            <IonIcon icon={arrowBackOutline} />
            </IconButton>
            </IonButtons>
          <IonTitle>Add Stock</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Container maxWidth="sm">
          <Paper variant="outlined" sx={{ p: 3, mt: 4, borderRadius: '16px' }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="h6">New Inventory Entry</Typography>
                <TextField label="Item Name" fullWidth required onChange={e => setFormData({...formData, name: e.target.value})} />
                {/* PREFERRED SUPPLIER DROPDOWN */}
                <TextField select label="Preferred Supplier" fullWidth value={formData.preferred_supplier} onChange={e => setFormData({...formData, preferred_supplier: e.target.value})}>
                  <MenuItem value=""><em>None Linked</em></MenuItem>
                  {suppliers.map(s => (
                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                  ))}
                </TextField>
                <TextField select label="Category" fullWidth value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <MenuItem value="feed">Feed</MenuItem>
                  <MenuItem value="medicine">Medicine</MenuItem>
                  <MenuItem value="tool">Equipment</MenuItem>
                </TextField>
                <Stack direction="row" spacing={2}>
                  <TextField label="Initial Quantity" type="number" fullWidth onChange={e => setFormData({...formData, quantity_on_hand: Number(e.target.value)})} />
                  <TextField select label="Unit" sx={{ width: '120px' }} value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                    <MenuItem value="kg">kg</MenuItem>
                    <MenuItem value="l">Liters</MenuItem>
                    <MenuItem value="units">Units</MenuItem>
                  </TextField>
                </Stack>
                <TextField label="Alert Level (Reorder at)" type="number" fullWidth onChange={e => setFormData({...formData, reorder_level: Number(e.target.value)})} />
                <Button type="submit" variant="contained" size="large" sx={{ borderRadius: '12px', py: 1.5 }}>Save to Inventory</Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddInventoryItem;