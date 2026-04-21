import React, { useEffect, useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonMenuButton, IonIcon, useIonToast, useIonLoading 
} from '@ionic/react';
import { 
  Container, Box, Typography, Paper, Button, Stack, 
  Dialog, DialogTitle, DialogContent, TextField, IconButton 
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { addOutline, businessOutline, closeOutline, callOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchSuppliers, addSupplier } from '../redux/store/slices/supplierSlice';

const Suppliers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { suppliers, loading } = useSelector((state: RootState) => state.suppliers);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', email: '', contact_person: '' });

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await presentLoading('Registering partner...');
    try {
      await dispatch(addSupplier(formData)).unwrap();
      showToast({ message: 'Supplier registered successfully', color: 'success', duration: 2000 });
      setOpenModal(false);
      setFormData({ name: '', phone: '', location: '', email: '', contact_person: '' });
    } catch (err) {
      showToast({ message: 'Error saving supplier', color: 'danger', duration: 2000 });
    } finally {
      dismissLoading();
    }
  };

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Supplier Name', 
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ pt: 1.5 }}>
          <IonIcon icon={businessOutline} style={{ color: '#18774c' }} />
          <Typography variant="body2" fontWeight="bold">{params.value}</Typography>
        </Stack>
      )
    },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'phone', headerName: 'Contact Number', flex: 1 },
    {
      field: 'actions',
      headerName: 'View',
      width: 120,
      renderCell: () => (
        <Button size="small" variant="text" sx={{ textTransform: 'none', fontWeight: 'bold', color: '#18774c' }}>
          History
        </Button>
      )
    }
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Suppliers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, mt: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">Partners & Suppliers</Typography>
              <Typography variant="body2" color="text.secondary">Maintain your supply chain network.</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => setOpenModal(true)}
              sx={{ borderRadius: '8px', bgcolor: '#18774c', textTransform: 'none', fontWeight: 'bold' }}
            >
              Add Supplier
            </Button>
          </Stack>

          <Paper sx={{ height: '65vh', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ececec' }} elevation={0}>
            <DataGrid 
              rows={suppliers} 
              columns={columns} 
              loading={loading}
              sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#fbfbfb' } }}
            />
          </Paper>
        </Container>

        {/* Add Supplier Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            New Partner
            <IconButton onClick={() => setOpenModal(false)} size="small"><IonIcon icon={closeOutline} /></IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField label="Company Name" fullWidth required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <TextField label="Contact Person" fullWidth value={formData.contact_person} onChange={e => setFormData({...formData, contact_person: e.target.value})} />
                <TextField label="Phone Number" fullWidth required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <TextField label="Location" fullWidth value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                <TextField label="Email Address" type="email" fullWidth value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#18774c', py: 1.5, borderRadius: '8px' }}>
                  Register Supplier
                </Button>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>
      </IonContent>
    </IonPage>
  );
};

export default Suppliers;