import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../../redux/hooks';

export const DairyTable: React.FC = () => {
  const { insights_data } = useAppSelector((state: any) => state.insights);

  const dairy = {
    activeMilkingCows: insights_data?.dairy?.activeMilkingCows || 0,
    avgDailyYield: insights_data?.dairy?.avgDailyYield || 0,
    somaticCellCount: insights_data?.dairy?.somaticCellCount || 0,
    butterfat: insights_data?.dairy?.butterfat || 0,
    protein: insights_data?.dairy?.protein || 0,
    avgDaysInMilk: insights_data?.dairy?.avgDaysInMilk || 0,
    totalProduction30d: insights_data?.dairy?.totalProduction30d || 0,
    activeTreatments: insights_data?.dairy?.activeTreatments || 0
  };

  const dryOffText = typeof insights_data?.narrative === 'object' 
    ? insights_data.narrative.dryOffActionItem 
    : 'Standard operational protocol applies.';

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
        3. Dairy Operations & Lactation Analytics
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Metric</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Current Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
              <TableCell sx={{ color: '#334155' }}>Butterfat</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{dairy.butterfat}%</TableCell>
            </TableRow>
            <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
              <TableCell sx={{ color: '#334155' }}>Protein</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{dairy.protein}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: '#334155' }}>Avg Days in Milk (DIM)</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#0F172A' }}>{dairy.avgDaysInMilk} Days</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box mb={3}>
        <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
          • <strong>Milk Yield Dynamics:</strong> Total milk production over the last 30 days stands at <strong>{dairy.totalProduction30d.toLocaleString()} liters</strong>.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
          • <strong>Mastitis Screening:</strong> The bulk tank somatic cell count is <strong>{dairy.somaticCellCount.toLocaleString()} cells/mL</strong>.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
          • <strong>Antibiotic Security:</strong> There are <strong>{dairy.activeTreatments} cows</strong> flagged on health treatments. Milk diverted.
        </Typography>
      </Box>

      <Box sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', mb: 0.5 }}>
          Immediate Dry-Off Actions
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: '#334155', lineHeight: 1.6 }}>
          <ReactMarkdown>{dryOffText}</ReactMarkdown>
        </Typography>
      </Box>
    </Box>
  );
};