import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Stack, InputAdornment, Typography, Divider } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { saveOutline, flagOutline, textOutline, calendarOutline } from 'ionicons/icons';
import { Task } from '../../../types/types';

interface TaskFormProps {
  title: string;
  initialData?: Partial<Task>;
  onSubmit: (data: any) => void;
  buttonText: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ title, initialData, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium',
    due_date: initialData?.due_date 
      ? initialData.due_date.split('T')[0] 
      : new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '500px', margin: '0 auto', mt: 2, pb: 4 }}>
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="700" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill in the details below to complete operational tracking metrics.
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Task Title"
            variant="outlined"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Vaccinate Herd A"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IonIcon icon={flagOutline} style={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            fullWidth
            label="Priority Level"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <MenuItem value="high">High (Urgent)</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Instructions"
            multiline
            rows={4}
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="What needs to be done?"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                  <IonIcon icon={textOutline} style={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& input::-webkit-calendar-picker-indicator': { cursor: 'pointer', filter: 'invert(0.5)' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IonIcon icon={calendarOutline} style={{ color: '#666' }} />
                </InputAdornment>
              ),
              inputProps: {
                onClick: (e: any) => e.target.showPicker?.(), 
              }
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            startIcon={<IonIcon icon={saveOutline} />}
            sx={{ py: 1.8, borderRadius: '12px', textTransform: 'none', fontWeight: 'bold' }}
          >
            {buttonText}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskForm;