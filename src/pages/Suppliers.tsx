import React, { useEffect, useState, useRef } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonMenuButton, IonIcon, IonFab, IonFabButton, IonModal, useIonToast
} from '@ionic/react';
import { add, businessOutline, callOutline, locationOutline, mailOutline, closeOutline } from 'ionicons/icons';
import { Container, Typography, Card, CardContent, Grid, Stack, Button, Box, TextField } from '@mui/material';
import api from '../services/api';

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [present] = useIonToast();
  const [newSupplier, setNewSupplier] = useState({ name: '', phone: '', location: '', email: '' });

  const fetchSuppliers = () => {
    api.get('suppliers/').then(res => setSuppliers(res.data));
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('suppliers/', newSupplier);
      present({ message: 'Supplier added successfully', duration: 2000, color: 'success' });
      setShowModal(false);
      setNewSupplier({ name: '', phone: '', location: '', email: '' });
      fetchSuppliers();
    } catch (err) {
      present({ message: 'Error saving supplier', duration: 2000, color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Supplier Directory</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, mt: 2 }}>
            <Typography variant="h4" fontWeight="800" color="primary">Partners & Suppliers</Typography>
            <Typography variant="body1" color="text.secondary">Manage your feed, medicine, and equipment providers.</Typography>
          </Box>

          <Grid container spacing={3}>
            {suppliers.map((supplier) => (
              <Grid item xs={12} md={6} key={supplier.id}>
                <Card sx={{ borderRadius: '16px', height: '100%', border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: '12px', color: 'primary.main' }}>
                        <IonIcon icon={businessOutline} style={{ fontSize: '24px' }} />
                      </Box>
                      <Typography variant="h6" fontWeight="bold">{supplier.name}</Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IonIcon icon={callOutline} color="medium" /><Typography variant="body2">{supplier.phone}</Typography></Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IonIcon icon={locationOutline} color="medium" /><Typography variant="body2">{supplier.location}</Typography></Box>
                    </Stack>
                    <Button variant="outlined" fullWidth sx={{ mt: 3, borderRadius: '10px' }}>View Purchase History</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} initialBreakpoint={0.75} breakpoints={[0, 0.75, 1.0]}>
          <Box sx={{ p: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">Add New Partner</Typography>
              <Button onClick={() => setShowModal(false)}><IonIcon icon={closeOutline} style={{ fontSize: '24px' }} /></Button>
            </Stack>
            <form onSubmit={handleAddSupplier}>
              <Stack spacing={3}>
                <TextField label="Company Name" fullWidth required value={newSupplier.name} onChange={e => setNewSupplier({...newSupplier, name: e.target.value})} />
                <TextField label="Phone Number" fullWidth required value={newSupplier.phone} onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})} />
                <TextField label="Location (e.g. Harare)" fullWidth value={newSupplier.location} onChange={e => setNewSupplier({...newSupplier, location: e.target.value})} />
                <TextField label="Email Address" type="email" fullWidth value={newSupplier.email} onChange={e => setNewSupplier({...newSupplier, email: e.target.value})} />
                <Button type="submit" variant="contained" size="large" fullWidth sx={{ borderRadius: '12px', py: 2 }}>Register Supplier</Button>
              </Stack>
            </form>
          </Box>
        </IonModal>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary" onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Suppliers;