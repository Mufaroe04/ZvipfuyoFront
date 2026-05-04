import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../../redux/hooks';

export const BeefTimeline: React.FC = () => {
  const { insights_data } = useAppSelector((state: any) => state.insights);

  const beef = {
    currentAvgWeight: insights_data?.beef?.currentAvgWeight || insights_data?.beef?.avg_weight || 0,
    targetWeight: insights_data?.beef?.targetWeight || 450,
    pricePerKg: insights_data?.beef?.pricePerKg || 0,
    avgDailyGain: insights_data?.beef?.avgDailyGain || 0,
    projectedAnimals: insights_data?.beef?.projectedAnimals || 0
  };

  const marginAlert = typeof insights_data?.narrative === 'object' 
    ? insights_data.narrative.marginOptimizationAlert 
    : 'Optimization metrics pending evaluation.';

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
        2. Beef Fattening & ROI Intelligence
      </Typography>

      <Box sx={{ mb: 4, mt: 1 }}>
        <Typography variant="subtitle2" sx={{ color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 3 }}>
          Weight & Value Progression Timeline
        </Typography>

        <Paper variant="outlined" sx={{ p: 4, backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', mb: 3 }}>
          <Grid container spacing={0} sx={{ position: 'relative' }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ width: 24, height: 24, borderRadius: '50%', border: '4px solid #94A3B8', backgroundColor: '#FFFFFF', zIndex: 2, boxShadow: '0 0 0 4px #F1F5F9' }} />
                  <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, height: '3px', backgroundColor: '#CBD5E1' }} />
                </Box>
                <Box sx={{ p: 2, mr: { md: 4 }, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #94A3B8' }}>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Phase 1: Entry Baseline</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B', mt: 0.5 }}>320 kg</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mt: 0.5, fontWeight: 500 }}>Initial intake metric</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: { xs: 3, md: 0 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ width: 24, height: 24, borderRadius: '50%', border: '4px solid #3B82F6', backgroundColor: '#EFF6FF', zIndex: 2, boxShadow: '0 0 0 4px #DBEAFE' }} />
                  <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, height: '3px', backgroundColor: '#CBD5E1' }} />
                </Box>
                <Box sx={{ p: 2, mr: { md: 4 }, backgroundColor: '#EFF6FF', borderRadius: '8px', borderLeft: '4px solid #3B82F6', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.05)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#1D4ED8', fontWeight: 700, textTransform: 'uppercase' }}>Phase 2: Current Feedlot</Typography>
                    <Typography variant="caption" sx={{ backgroundColor: '#DBEAFE', color: '#1D4ED8', px: 1, py: 0.25, borderRadius: '4px', fontWeight: 700 }}>Live Status</Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B', mt: 0.5 }}>{beef.currentAvgWeight} kg</Typography>
                  <Typography variant="body2" sx={{ color: '#1E40AF', mt: 0.5, fontWeight: 500 }}>Tracking dynamic daily gains</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: { xs: 3, md: 0 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ width: 24, height: 24, borderRadius: '50%', border: '4px solid #10B981', backgroundColor: '#ECFDF5', zIndex: 2, boxShadow: '0 0 0 4px #D1FAE5' }} />
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#ECFDF5', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>Phase 3: Marketing Target</Typography>
                    <Typography variant="caption" sx={{ backgroundColor: '#D1FAE5', color: '#065F46', px: 1, py: 0.25, borderRadius: '4px', fontWeight: 700 }}>Target Cap</Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B', mt: 0.5 }}>{beef.targetWeight} kg</Typography>
                  <Typography variant="body2" sx={{ color: '#065F46', mt: 0.5, fontWeight: 500 }}>Est. value: ${(beef.targetWeight * beef.pricePerKg).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} /head</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box mb={3}>
        <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
          • <strong>Average Daily Gain (ADG):</strong> The feedlot division is currently achieving <strong>+{beef.avgDailyGain} kg/day</strong> across the performance index.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
          • <strong>Target Weight Projections:</strong> For the upcoming marketing cycle, <strong>{beef.projectedAnimals} animals</strong> are projected to hit the <strong>{beef.targetWeight} kg</strong> target weight.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
          • <strong>Valuation & Price Per Kg:</strong> Using current market pricing of <strong>${beef.pricePerKg.toFixed(2)}/kg live weight</strong>, the current finished head inventory stands at <strong>${(beef.targetWeight * beef.pricePerKg).toLocaleString()} per head</strong>.
        </Typography>
      </Box>

      <Box sx={{ p: 2.5, backgroundColor: '#FFFBEB', borderRadius: '8px', borderLeft: '4px solid #D97706' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E', textTransform: 'uppercase', mb: 0.5 }}>
          Margin Optimization Alert
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: '#78350F', lineHeight: 1.6 }}>
          <ReactMarkdown>{marginAlert}</ReactMarkdown>
        </Typography>
      </Box>
    </Box>
  );
};