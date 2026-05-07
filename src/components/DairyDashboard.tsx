import React, { useEffect, useState, useMemo } from 'react';
import { 
  Box, Typography, Stack, Button, Tabs, Tab, Paper, 
  MenuItem, Select, FormControl, InputLabel 
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IonIcon, IonSpinner } from '@ionic/react';
import { 
  addOutline, waterOutline, statsChartOutline, calendarOutline, filterOutline 
} from 'ionicons/icons';
import Chart from 'react-apexcharts';
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  fetchMilkYields, 
  fetchMilkQuality, 
  fetchLactationPeriods, 
  updateLactationPeriodDryOff 
} from '../redux/store/slices/operationsSlice';

import { BREED_CHOICES, getBreedLabel } from '../constants/livestock';

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }

const CustomTabPanel = ({ children, value, index }: TabPanelProps) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

const DairyDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState('All');
  const { milkYields, milkQuality, lactations, loading } = useAppSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchMilkYields());
    dispatch(fetchMilkQuality());
    dispatch(fetchLactationPeriods());
  }, [dispatch]);

  const handleDryOff = (id: number) => {
    if (window.confirm("Are you sure you want to mark this animal as Dry?")) {
      dispatch(updateLactationPeriodDryOff({ id }));
    }
  };

  const aggregateData = (data: any[], valueKeys: string | string[]) => {
    const stats = data.reduce((acc: any, curr) => {
      if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;
      const dateKey = curr.date || curr.test_date || curr.start_date;
      if (!dateKey) return acc;
      if (!acc[dateKey]) {
        acc[dateKey] = { total: Array.isArray(valueKeys) ? valueKeys.map(() => 0) : 0, count: 0 };
      }
      if (Array.isArray(valueKeys)) {
        valueKeys.forEach((key, idx) => { acc[dateKey].total[idx] += Number(curr[key]) || 0; });
      } else {
        acc[dateKey].total += Number(curr[valueKeys]) || 0;
      }
      acc[dateKey].count += 1;
      return acc;
    }, {});
    return Object.keys(stats).sort().reduce((obj: any, key) => { obj[key] = stats[key]; return obj; }, {});
  };

  const yieldSeries = useMemo(() => {
    const daily = aggregateData(milkYields, 'amount_liters');
    return [{
      name: 'Avg Liters/Day',
      data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total / daily[date].count).toFixed(2)) }))
    }];
  }, [milkYields, selectedBreed]);

  const qualitySeries = useMemo(() => {
    const daily = aggregateData(milkQuality, ['fat_percentage', 'protein_percentage']);
    return [
      { name: 'Avg Fat %', data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total[0] / daily[date].count).toFixed(2)) })) },
      { name: 'Avg Protein %', data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total[1] / daily[date].count).toFixed(2)) })) }
    ];
  }, [milkQuality, selectedBreed]);

  // --- NEW: Lactation Distribution Logic ---
  const lactationDistribution = useMemo(() => {
    const stages = { 'Early (0-100d)': 0, 'Mid (100-200d)': 0, 'Late (200-305d)': 0, 'Overdue (>305d)': 0 };
    lactations.forEach(l => {
      if (selectedBreed !== 'All' && l.breed !== selectedBreed) return;
      if (l.end_date) return;
      const start = new Date(l.start_date).getTime();
      const days = Math.floor((new Date().getTime() - start) / (1000 * 60 * 60 * 24));
      if (days <= 100) stages['Early (0-100d)']++;
      else if (days <= 200) stages['Mid (100-200d)']++;
      else if (days <= 305) stages['Late (200-305d)']++;
      else stages['Overdue (>305d)']++;
    });
    return Object.keys(stages).map(key => ({ x: key, y: (stages as any)[key] }));
  }, [lactations, selectedBreed]);

  const lactationSeries = [{ name: 'Head Count', data: lactationDistribution }];

  const getChartOptions = (yAxisLabel: string, colors: string[], chartType: "area" | "bar" = "area"): any => ({
    chart: { type: chartType, toolbar: { show: false }, zoom: { enabled: false } },
    colors: colors,
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    stroke: { curve: 'smooth', width: chartType === 'bar' ? 0 : 3 },
    xaxis: chartType === 'bar' ? { categories: lactationDistribution.map(d => d.x) } : { 
      type: 'datetime', 
      labels: { datetimeUTC: false, style: { fontSize: '10px', fontWeight: 600 } } 
    },
    yaxis: { title: { text: yAxisLabel, style: { fontWeight: 600 } } },
    plotOptions: chartType === 'bar' ? { bar: { borderRadius: 6, columnWidth: '45%', distributed: true } } : {},
    dataLabels: { enabled: false },
    legend: { show: chartType === 'bar' ? false : true }
  });

  const yieldColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'animal_tag', headerName: 'Animal', flex: 1 },
    { field: 'breed', headerName: 'Breed', width: 130, renderCell: (p) => getBreedLabel(p.value) },
    { field: 'amount_liters', headerName: 'Liters (L)', type: 'number', width: 110 },
  ];

  const qualityColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'animal_tag', headerName: 'Animal', flex: 1 },
    { field: 'fat_percentage', headerName: 'Fat %', width: 100 },
    { field: 'protein_percentage', headerName: 'Protein %', width: 100 },
  ];

  const lactationColumns: GridColDef[] = [
    { field: 'animal_tag', headerName: 'Animal', flex: 1 },
    { field: 'start_date', headerName: 'Start', width: 120 },
    { field: 'end_date', headerName: 'Status', width: 150, renderCell: (params) => params.value ? "Dry" : "Milking" },
    {
      field: 'actions', headerName: 'Actions', width: 130,
      renderCell: (params) => !params.row.end_date && (
        <Button variant="outlined" size="small" onClick={() => handleDryOff(params.row.id)}>Mark Dry</Button>
      )
    }
  ];

  if (loading && milkYields.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><IonSpinner name="crescent" /></Box>;
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Box><Typography variant="h5" fontWeight="bold">Dairy Intelligence</Typography></Box>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Filter Breed</InputLabel>
          <Select value={selectedBreed} label="Filter Breed" onChange={(e) => setSelectedBreed(e.target.value)} sx={{ borderRadius: '12px', bgcolor: 'white' }}>
            <MenuItem value="All">All Breeds</MenuItem>
            {BREED_CHOICES.map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>

      <Paper sx={{ borderRadius: '16px', mb: 3, overflow: 'hidden', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} variant="fullWidth">
          <Tab icon={<IonIcon icon={waterOutline} />} iconPosition="start" label="Milk Yield" />
          <Tab icon={<IonIcon icon={statsChartOutline} />} iconPosition="start" label="Quality" />
          <Tab icon={<IonIcon icon={calendarOutline} />} iconPosition="start" label="Lactation" />
        </Tabs>
      </Paper>

      <CustomTabPanel value={tabValue} index={0}>
        <DairyTabContent title="Herd Yield Trend" series={yieldSeries} options={getChartOptions('Liters', ['#3880ff'])} rows={milkYields.filter(r => selectedBreed === 'All' || r.breed === selectedBreed)} columns={yieldColumns} actionLabel="Add Yield" onAction={() => history.push("/dairy/milk-yield/add")} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <DairyTabContent title="Quality Trend" series={qualitySeries} options={getChartOptions('Percentage', ['#2dd36f', '#3880ff'])} rows={milkQuality.filter(r => selectedBreed === 'All' || r.breed === selectedBreed)} columns={qualityColumns} actionLabel="Add Quality" onAction={() => history.push("/dairy/milk-quality/add")} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <DairyTabContent title="Herd Stage Distribution" series={lactationSeries} type="bar" options={getChartOptions('Head Count', ['#2dd36f', '#3880ff', '#ffc409', '#eb445a'], 'bar')} rows={lactations.filter(r => selectedBreed === 'All' || r.breed === selectedBreed)} columns={lactationColumns} actionLabel="Add Lactation" onAction={() => history.push("/dairy/milk-lactation/add")} />
      </CustomTabPanel>
    </Box>
  );
};

const DairyTabContent = ({ title, series, options, rows, columns, actionLabel, onAction, type = "area" }: any) => (
  <Stack spacing={3}>
    {series.length > 0 && series[0].data.length > 0 && (
      <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #f0f0f0' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Typography>
        <Box sx={{ height: 300 }}><Chart options={options} series={series} type={type} height="100%" /></Box>
      </Paper>
    )}
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={2}><Typography variant="h6" fontWeight="bold">Records</Typography>
      <Button variant="contained" size="small" onClick={onAction} sx={{ textTransform: 'none' }}>{actionLabel}</Button></Stack>
      <Paper sx={{ height: 450, borderRadius: '16px', overflow: 'hidden' }}><DataGrid rows={rows} columns={columns} getRowId={(r) => r.id} sx={{ border: 0 }} /></Paper>
    </Box>
  </Stack>
);

export default DairyDashboard;