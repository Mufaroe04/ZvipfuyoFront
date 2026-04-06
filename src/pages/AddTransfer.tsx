import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, useIonLoading, useIonToast, IonIcon 
} from '@ionic/react';
import { 
  Container, Box, Typography, TextField, MenuItem, 
  Button, Stack, InputAdornment, Paper, Divider, 
  IconButton, Autocomplete, Chip
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { 
  swapHorizontalOutline, personOutline, carOutline, 
  shieldCheckmarkOutline, documentTextOutline, arrowBackOutline,
  pawOutline
} from 'ionicons/icons';
import api from '../services/api';

// Assuming you have an Animal type
interface Animal {
  id: number;
  tag_number: string;
}

const AddTransfer: React.FC = () => {
  const history = useHistory();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();
  
  const [availableAnimals, setAvailableAnimals] = useState<Animal[]>([]);
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);
  
  const [formData, setFormData] = useState({
    transfer_type: 'internal',
    from_herd: '',
    to_herd: '',
    external_destination: '',
    truck_reg_number: '',
    driver_name: '',
    vet_permit_number: '',
    police_clearance_ref: '',
  });

  // Fetch active animals to populate the multi-select
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await api.get('animals/?status=active');
        setAvailableAnimals(res.data);
      } catch (err) {
        console.error("Failed to load animals", err);
      }
    };
    fetchAnimals();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedAnimals.length === 0) {
      presentToast({ message: 'Please select at least one animal', color: 'warning', duration: 2000 });
      return;
    }

    await presentLoading('Initiating transfer...');
    try {
      await api.post('transfers/', {
        ...formData,
        animals: selectedAnimals.map(a => a.id), // Send array of IDs to Django
        status: 'pending'
      });
      presentToast({ message: 'Transfer request created', duration: 2000, color: 'success' });
      history.goBack();
    } catch (err) {
      presentToast({ message: 'Error initiating transfer', duration: 2000, color: 'danger' });
    } finally {
      dismissLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </IconButton>
          </IonButtons>
          <IonTitle>New Transfer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="sm">
          <Box sx={{ my: 3, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold">Digital Kraal Transfer</Typography>
            <Typography variant="body2" color="text.secondary">
              Select animals and ensure all regulatory documents are ready.
            </Typography>
          </Box>

          <form onSubmit={handleSave}>
            <Stack spacing={3}>
              
              {/* Animal Multi-Select Card */}
              <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px', borderLeft: '6px solid #3880ff' }}>
                <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="bold">
                  Identify Livestock
                </Typography>
                <Autocomplete
                  multiple
                  options={availableAnimals}
                  getOptionLabel={(option) => option.tag_number}
                  value={selectedAnimals}
                  onChange={(_event, newValue) => setSelectedAnimals(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Animals by Tag"
                      placeholder="Search tags..."
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <IonIcon icon={pawOutline} style={{ fontSize: '20px' }} />
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip 
                        label={option.tag_number} 
                        {...getTagProps({ index })} 
                        color="primary" 
                        variant="outlined" 
                        size="small" 
                      />
                    ))
                  }
                />
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px' }}>
                <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="bold">
                  Movement Details
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Transfer Reason"
                    value={formData.transfer_type}
                    onChange={(e) => setFormData({ ...formData, transfer_type: e.target.value })}
                  >
                    <MenuItem value="internal">Internal Move (Between Herds)</MenuItem>
                    <MenuItem value="sale">Commercial Sale</MenuItem>
                    <MenuItem value="lobola">Lobola (Bride Price)</MenuItem>
                    <MenuItem value="inheritance">Inheritance</MenuItem>
                    <MenuItem value="feasting">Feasting / Ceremony</MenuItem>
                  </TextField>

                  {formData.transfer_type === 'internal' ? (
                    <TextField
                      fullWidth
                      label="Destination Herd ID"
                      placeholder="e.g., 5"
                      onChange={(e) => setFormData({ ...formData, to_herd: e.target.value })}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      label="External Destination"
                      placeholder="e.g., CSC Bulawayo"
                      onChange={(e) => setFormData({ ...formData, external_destination: e.target.value })}
                    />
                  )}
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px', bgcolor: '#fcfcfc' }}>
                <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="bold">
                  Regulatory & Logistics
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Vet Permit Number"
                    placeholder="V-2026-XXXX"
                    onChange={(e) => setFormData({ ...formData, vet_permit_number: e.target.value })}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><IonIcon icon={documentTextOutline} /></InputAdornment>,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Police Clearance Ref"
                    placeholder="ZRP-LIV-XXXX"
                    onChange={(e) => setFormData({ ...formData, police_clearance_ref: e.target.value })}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><IonIcon icon={shieldCheckmarkOutline} /></InputAdornment>,
                    }}
                  />
                  <Divider />
                  <TextField
                    fullWidth
                    label="Driver Name"
                    onChange={(e) => setFormData({ ...formData, driver_name: e.target.value })}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><IonIcon icon={personOutline} /></InputAdornment>,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Truck Registration"
                    placeholder="ABW 1234"
                    onChange={(e) => setFormData({ ...formData, truck_reg_number: e.target.value })}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><IonIcon icon={carOutline} /></InputAdornment>,
                    }}
                  />
                </Stack>
              </Paper>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<IonIcon icon={swapHorizontalOutline} />}
                sx={{ 
                  py: 1.8, borderRadius: '12px', fontWeight: 'bold', textTransform: 'none',
                  bgcolor: '#3880ff'
                }}
              >
                Initiate Transfer
              </Button>
            </Stack>
          </form>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddTransfer;