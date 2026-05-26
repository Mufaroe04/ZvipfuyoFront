// src/views/transfer/components/TransferForm.tsx
import React from 'react';
import { Stack, Paper, Typography, TextField, InputAdornment, MenuItem, Divider, Button, Box } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { documentTextOutline, shieldCheckmarkOutline, personOutline, carOutline, swapHorizontalOutline } from 'ionicons/icons';
import { AsyncAnimalSelect } from '../../../components/search/AsyncAnimalSelect';
import { Animal } from '../../../types/types';

interface TransferFormProps {
  title: string;
  formData: any;
  herdsList: any[];
  handleInputChange: (name: any, value: any) => void;
  animalsValue: Animal[];
  onAnimalsChange: (animals: Animal[]) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TransferForm: React.FC<TransferFormProps> = ({
  title,
  formData,
  herdsList,
  handleInputChange,
  animalsValue,
  onAnimalsChange,
  onSubmit
}) => {

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: '4px' }}>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body1" fontWeight="black">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Process active animal transfers via legal transport pipelines.
            </Typography>
          </Box>
          
          <Divider />

          {/* Animal Selection Card */}
          <Typography variant="subtitle2" sx={{ color: '#18774c' }} fontWeight="bold">
            Identify Livestock
          </Typography>
          
          <Stack spacing={2.5}>
            <AsyncAnimalSelect
              multiple={true}
              value={animalsValue} 
              onChange={(val) => onAnimalsChange(val || [])} 
              label="Select Multiple Animals by Tag"
              // required
            />
          </Stack>

          {/* Movement Fields */}
          <Typography variant="subtitle2" sx={{ color: '#18774c' }} fontWeight="bold">
            Movement Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              select fullWidth label="Transfer Reason"
              value={formData.transfer_type || 'internal'}
              onChange={(e) => handleInputChange('transfer_type', e.target.value)}
            >
              <MenuItem value="internal">Internal Move (Between Herds)</MenuItem>
              <MenuItem value="sale">Commercial Sale</MenuItem>
              <MenuItem value="lobola">Lobola (Bride Price)</MenuItem>
              <MenuItem value="inheritance">Inheritance</MenuItem>
              <MenuItem value="feasting">Feasting / Ceremony</MenuItem>
            </TextField>

            {/* Source Herd Dropdown Selection */}
            <TextField
              select
              fullWidth
              label="Source Herd (Origin)"
              value={formData.from_herd || ''}
              onChange={(e) => handleInputChange('from_herd', e.target.value)}
              required
            >
              {herdsList?.length > 0 ? (
                herdsList.map((h) => (
                  <MenuItem key={h.id} value={Number(h.id)}>
                    {h.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  Loading Associated Herds...
                </MenuItem>
              )}
            </TextField>

            {formData.transfer_type === 'internal' ? (
              /* Destination Herd Dropdown Selection */
              <TextField
                select
                fullWidth
                label="Destination Herd"
                value={formData.to_herd || ''}
                onChange={(e) => handleInputChange('to_herd', e.target.value)}
                required
              >
                {herdsList?.length > 0 ? (
                  herdsList
                    // Exclude the source herd so you can't transfer a herd to itself
                    .filter((h) => Number(h.id) !== Number(formData.from_herd))
                    .map((h) => (
                      <MenuItem key={h.id} value={Number(h.id)}>
                        {h.name}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem value="" disabled>
                    Loading Associated Herds...
                  </MenuItem>
                )}
              </TextField>
            ) : (
              <TextField
                fullWidth label="External Destination" value={formData.external_destination || ''}
                onChange={(e) => handleInputChange('external_destination', e.target.value)}
                required
              />
            )}
          </Stack>

          {/* Legal Entities */}
          <Typography variant="subtitle2" sx={{ color: '#18774c' }} fontWeight="bold">
            Regulatory & Logistics
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth label="Vet Permit Number" value={formData.vet_permit_number || ''}
              onChange={(e) => handleInputChange('vet_permit_number', e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><IonIcon icon={documentTextOutline} /></InputAdornment> }}
              required={formData.transfer_type !== 'internal'}
            />
            <TextField
              fullWidth label="Police Clearance Ref" value={formData.police_clearance_ref || ''}
              onChange={(e) => handleInputChange('police_clearance_ref', e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><IonIcon icon={shieldCheckmarkOutline} /></InputAdornment> }}
              required={formData.transfer_type !== 'internal'}
            />
            <Divider />
            <TextField
              fullWidth label="Driver Name" value={formData.driver_name || ''}
              onChange={(e) => handleInputChange('driver_name', e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><IonIcon icon={personOutline} /></InputAdornment> }}
            />
            <TextField
              fullWidth label="Truck Registration" value={formData.truck_reg_number || ''}
              onChange={(e) => handleInputChange('truck_reg_number', e.target.value)}
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