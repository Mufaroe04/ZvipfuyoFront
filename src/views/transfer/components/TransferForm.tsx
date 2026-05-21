import React from 'react';
import { Stack, Paper, Typography, TextField, InputAdornment, MenuItem, Divider, Button } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { documentTextOutline, shieldCheckmarkOutline, personOutline, carOutline, swapHorizontalOutline } from 'ionicons/icons';
import { AsyncAnimalSelect } from '../../../components/search/AsyncAnimalSelect';

interface TransferFormProps {
  title: string;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TransferForm: React.FC<TransferFormProps> = ({
  title,
  formData,
  setFormData,
  onSubmit
}) => {
  
  // Directly pull mapped strings/numbers from the tracking data payload
  const parsedSelectedIds = React.useMemo(() => {
    const currentAnimals = formData.animals || [];
    return currentAnimals.map((a: any) => (typeof a === 'object' ? a.id.toString() : a.toString()));
  }, [formData.animals]);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: '4px' }}>
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        {/* <Paper variant="outlined" sx={{ p: 3, borderRadius: '4px', textAlign: 'center', borderColor: '#18774c' }}>
          <Typography variant="h5" fontWeight="bold">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            Process active animal transfers via legal transport pipelines.
          </Typography>
        </Paper> */}

        {/* Animal Selection Card */}
          <Typography variant="subtitle2" gutterBottom sx={{ color: '#18774c' }} fontWeight="bold">
            Identify Livestock
          </Typography>
          
          <Stack spacing={2.5}>
            <AsyncAnimalSelect
              multiple={true}
              value={parsedSelectedIds}
              onChange={(ids) => {
                // Instantly re-hydrate selected components straight back into the main state object
                const restoredObjects = ids.map(id => ({ id: Number(id), tag_number: `Tag: ${id}` }));
                setFormData({
                  ...formData,
                  animals: restoredObjects
                });
              }}
              label="Select Multiple Animals by Tag"
              valueType="id"
            />
          </Stack>

        {/* Movement Fields */}
          <Typography variant="subtitle2" gutterBottom sx={{ color: '#18774c' }} fontWeight="bold">
            Movement Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              select fullWidth label="Transfer Reason"
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
                fullWidth label="Destination Herd ID" value={formData.to_herd}
                onChange={(e) => setFormData({ ...formData, to_herd: e.target.value })}
              />
            ) : (
              <TextField
                fullWidth label="External Destination" value={formData.external_destination}
                onChange={(e) => setFormData({ ...formData, external_destination: e.target.value })}
              />
            )}
          </Stack>

        {/* Legal Entities */}
          <Typography variant="subtitle2" gutterBottom sx={{ color: '#18774c' }} fontWeight="bold">
            Regulatory & Logistics
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth label="Vet Permit Number" value={formData.vet_permit_number}
              onChange={(e) => setFormData({ ...formData, vet_permit_number: e.target.value })}
              InputProps={{ startAdornment: <InputAdornment position="start"><IonIcon icon={documentTextOutline} /></InputAdornment> }}
            />
            <TextField
              fullWidth label="Police Clearance Ref" value={formData.police_clearance_ref}
              onChange={(e) => setFormData({ ...formData, police_clearance_ref: e.target.value })}
              InputProps={{ startAdornment: <InputAdornment position="start"><IonIcon icon={shieldCheckmarkOutline} /></InputAdornment> }}
            />
            <Divider />
            <TextField
              fullWidth label="Driver Name" value={formData.driver_name}
              onChange={(e) => setFormData({ ...formData, driver_name: e.target.value })}
              InputProps={{ startAdornment: <InputAdornment position="start"><IonIcon icon={personOutline} /></InputAdornment> }}
            />
            <TextField
              fullWidth label="Truck Registration" value={formData.truck_reg_number}
              onChange={(e) => setFormData({ ...formData, truck_reg_number: e.target.value })}
              InputProps={{ startAdornment: <InputAdornment position="start"><IonIcon icon={carOutline} /></InputAdornment> }}
            />
          </Stack>

        <Button
          type="submit" fullWidth variant="contained" size="large"
          startIcon={<IonIcon icon={swapHorizontalOutline} />}
          sx={{ 
            py: 1.8, borderRadius: '12px', fontWeight: 'bold', textTransform: 'none',
            bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' }
          }}
        >
          Commit Manifest
        </Button>
      </Stack>
      </form>
      </Paper>

  );
};

export default TransferForm;