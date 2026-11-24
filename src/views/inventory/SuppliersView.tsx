import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonIcon } from '@ionic/react';
import { Container, Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, TextField, IconButton } from '@mui/material';
import { addOutline, closeOutline } from 'ionicons/icons';
import { useSuppliers } from './hooks/useSuppliers';
import { getSupplierColumns } from './components/SuppliersColumns';
import { CustomDataGrid } from '../../components/datagrid/CustomDataGrid';

const SuppliersView: React.FC = () => {
  const {
    suppliers, loading, openModal, setOpenModal, formData, setFormData, handleRegisterSupplier
  } = useSuppliers();
  
  const columns = getSupplierColumns();

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
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 1 }}>
            <Box>
              <Typography variant="body1" fontWeight="bold">Partners & Suppliers</Typography>
              <Typography variant="body2" color="text.secondary">Maintain your supply chain network.</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => setOpenModal(true)}
              sx={{ borderRadius: '4px', bgcolor: '#18774c', textTransform: 'none', fontWeight: 'bold' }}
            >
              Add Supplier
            </Button>
          </Stack>

          <CustomDataGrid 
            rows={suppliers} 
            columns={columns} 
            loading={loading}
            height="65vh"
            paginationMode="client"
            getRowId={(row) => row.id}
          />
        </Container>

        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            New Partner
            <IconButton onClick={() => setOpenModal(false)} size="small"><IonIcon icon={closeOutline} /></IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleRegisterSupplier}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField label="Company Name" fullWidth required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <TextField label="Contact Person" fullWidth value={formData.contact_person} onChange={e => setFormData({...formData, contact_person: e.target.value})} />
                <TextField label="Phone Number" fullWidth required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <TextField label="Location" fullWidth value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                <TextField label="Email Address" type="email" fullWidth value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#18774c', py: 1.5, borderRadius: '4px' }}>
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

export default SuppliersView;