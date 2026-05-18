import React from 'react';
import { Stack, Paper, Typography, TextField, MenuItem, Box, Button, Alert } from '@mui/material';
import { IonIcon, IonSpinner } from '@ionic/react';
import { cloudUploadOutline, statsChartOutline } from 'ionicons/icons';
import { AuditFormData } from '../hooks/useCountingSession';

interface DroneAuditTabProps {
  formData: AuditFormData;
  herds: any[];
  isScanning: boolean;
  selectedFile: File | null;
  previewUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleHerdChange: (herdId: string) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearMediaFile: () => void;
  handleDroneScan: () => Promise<void>;
  handleSubmit: () => Promise<void>;
}

export const DroneAuditTab: React.FC<DroneAuditTabProps> = ({
  formData,
  herds,
  isScanning,
  selectedFile,
  previewUrl,
  fileInputRef,
  handleHerdChange,
  handleFileSelect,
  clearMediaFile,
  handleDroneScan,
  handleSubmit
}) => (
  <Stack spacing={3} sx={{ mt: 1, pb: 1 }}>
    <Typography variant="body1" fontWeight="bold">Aerial Drone Audit</Typography>
    <Paper variant="outlined" sx={{ p: 1, borderRadius: '4px' }}>
      <TextField 
        select 
        label="Select Herd for Drone Scan" 
        fullWidth 
        variant="standard" 
        value={formData.herd} 
        onChange={(e) => handleHerdChange(e.target.value)}
      >
        {herds.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
      </TextField>
    </Paper>

    <input type="file" accept="image/*,video/*" ref={fileInputRef as any} hidden onChange={handleFileSelect} />

    <Paper 
      variant="outlined" 
      sx={{ 
        p: previewUrl ? 2 : 6, borderRadius: '4px', textAlign: 'center', border: '2px dashed #ccc',
        bgcolor: isScanning ? '#f0f7ff' : '#fafafa', position: 'relative'
      }}
    >
      {isScanning ? (
        <Box sx={{ py: 1 }}>
          <IonSpinner name="crescent" color="primary" style={{ width: '60px', height: '60px' }} />
          <Typography sx={{ mt: 1, fontWeight: 'bold' }}>Zvipfuyo AI processing...</Typography>
        </Box>
      ) : previewUrl ? (
        <Box>
          {selectedFile?.type.includes('video') ? (
            <video src={previewUrl} style={{ width: '100%', borderRadius: '4px' }} controls />
          ) : (
            <img src={previewUrl} style={{ width: '100%', borderRadius: '4px' }} alt="Preview" />
          )}
          <Button sx={{ mt: 1 }} color="error" onClick={clearMediaFile}>Change Media</Button>
        </Box>
      ) : (
        <Box onClick={() => fileInputRef.current?.click()} sx={{ cursor: 'pointer' }}>
          <IonIcon icon={cloudUploadOutline} style={{ fontSize: '64px', color: '#666' }} />
          <Typography variant="body1">Upload Drone Footage</Typography>
          <Typography variant="body2" color="text.secondary">Tap to select image/video</Typography>
        </Box>
      )}
    </Paper>
    
    {selectedFile && !isScanning && (
      <Button variant="contained" size="large" onClick={handleDroneScan} startIcon={<IonIcon icon={statsChartOutline} />}>
        Run AI Identification
      </Button>
    )}

    {formData.actual_count > 0 && !isScanning && (
      <Stack spacing={2}>
        <Alert severity={formData.actual_count < formData.expected_count ? "error" : "success"} variant="filled">
          AI detected <strong>{formData.actual_count}</strong> head. 
          {formData.actual_count < formData.expected_count && ` Shortage: ${formData.expected_count - formData.actual_count}`}
        </Alert>
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ py: 2 }}>
          Accept AI Count & Save
        </Button>
      </Stack>
    )}
  </Stack>
);