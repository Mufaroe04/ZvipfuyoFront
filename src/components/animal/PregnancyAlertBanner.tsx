import { Paper, Stack, Box, Typography, Button } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';
import { getDaysToCalving } from '../../utils/livestockMetrics';

export const PregnancyAlertBanner = ({ animal, onRegisterBirth }: { animal: any, onRegisterBirth: () => void }) => {
  const daysRemaining = getDaysToCalving(animal.expected_calving_date);
  const isOverdue = daysRemaining !== null && daysRemaining < 0;

  if (animal.reproductive_status !== 'pregnant') return null;

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: isOverdue ? '#fff1f0' : '#fff9e6', border: isOverdue ? '1px solid #ffa39e' : '1px solid #ffe58f', borderRadius: '12px' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ p: 1, bgcolor: isOverdue ? '#ff4d4f' : '#ffec3d', borderRadius: '50%', display: 'flex' }}>
            <IonIcon icon={alertCircleOutline} style={{ fontSize: '1.2rem', color: isOverdue ? 'white' : '#874d00' }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: isOverdue ? '#cf1322' : '#874d00' }}>
              {isOverdue ? 'ATTENTION: ANIMAL OVERDUE' : 'PREGNANCY DETECTED'}
            </Typography>
            <Typography variant="body2" sx={{ color: isOverdue ? '#cf1322' : '#874d00' }}>
              Expected Calving: <strong>{animal.expected_calving_date}</strong>
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" fontWeight="black" sx={{ color: isOverdue ? '#cf1322' : '#d48806', lineHeight: 1 }}>
              {Math.abs(daysRemaining!)}
            </Typography>
            <Typography variant="caption" fontWeight="bold" sx={{ color: isOverdue ? '#cf1322' : '#d48806' }}>
              {isOverdue ? 'DAYS OVERDUE' : 'DAYS TO GO'}
            </Typography>
          </Box>
          <Button variant="contained" color={isOverdue ? "error" : "primary"} size="small" onClick={onRegisterBirth} sx={{ borderRadius: '8px', textTransform: 'none' }}>
            Register Birth
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};