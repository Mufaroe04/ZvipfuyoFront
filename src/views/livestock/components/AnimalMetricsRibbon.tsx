import { Grid, Paper, Stack, Box, Typography, Chip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { scaleOutline, calendarOutline, heartOutline, leafOutline } from 'ionicons/icons';
import { calculateGrowthEfficiency } from '../../../utils/livestockMetrics';

export const AnimalMetricsRibbon = ({ animal }: { animal: any }) => {
  const efficiency = calculateGrowthEfficiency(animal.birth_weight, animal.latest_weight, animal.date_of_birth);

  const stats = [
    { label: 'WEIGHT', value: `${animal.latest_weight} kg`, icon: scaleOutline, color: '#3880ff' },
    { label: 'AGE', value: animal.age, icon: calendarOutline, color: '#7044ff' },
    { label: 'BREEDING', value: animal.status === 'deceased' ? 'N/A' : (animal.reproductive_status || 'N/A'), icon: heartOutline, color: '#ff4961' },
    { label: 'HERD', value: animal.herd, icon: leafOutline, color: '#2dd36f' },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {stats.map((stat, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f4f5f8', borderRadius: '12px', border: '1px solid #ececec' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1, bgcolor: 'white', borderRadius: '8px', display: 'flex' }}>
                <IonIcon icon={stat.icon} style={{ fontSize: '1.5rem', color: stat.color }} />
              </Box>
              <Box>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">{stat.label}</Typography>
                <Typography variant="h6" fontWeight="bold">{stat.value}</Typography>
                {stat.label === 'WEIGHT' && efficiency > 0 && (
                  <Chip label={`${efficiency}% Growth`} size="small" color={efficiency >= 90 ? "success" : "warning"} sx={{ height: 20, fontSize: '0.65rem' }} />
                )}
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};