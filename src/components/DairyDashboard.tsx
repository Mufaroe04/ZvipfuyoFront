// import React, { useEffect, useState } from 'react';
// import { 
//   Box, Typography, Stack, Button, Tabs, Tab, Paper, Chip 
// } from '@mui/material';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { IonIcon, IonSpinner } from '@ionic/react';
// import { 
//   addOutline, waterOutline, statsChartOutline, calendarOutline 
// } from 'ionicons/icons';
// import Chart from 'react-apexcharts';
// import { useHistory } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { 
//   fetchMilkYields, 
//   fetchMilkQuality, 
//   fetchLactationPeriods, 
//   updateLactationPeriodDryOff 
// } from '../redux/store/slices/operationsSlice';

// // --- Tab Panel Helper ---
// interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
// const CustomTabPanel = ({ children, value, index }: TabPanelProps) => (
//   <div role="tabpanel" hidden={value !== index}>
//     {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//   </div>
// );

// const DairyDashboard: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const history = useHistory();
//   const [tabValue, setTabValue] = useState(0);
//   const { milkYields, milkQuality, lactations, loading } = useAppSelector((state) => state.operations);

//   useEffect(() => {
//     dispatch(fetchMilkYields());
//     dispatch(fetchMilkQuality());
//     dispatch(fetchLactationPeriods());
//   }, [dispatch]);

//   // --- Handlers ---
//   const handleDryOff = (id: number) => {
//     if (window.confirm("Are you sure you want to mark this animal as Dry?")) {
//       dispatch(updateLactationPeriodDryOff({ id }));
//     }
//   };

//   // --- Chart Configuration (Shared Logic) ---
//   const getChartOptions = (yAxisLabel: string, color: string): any => ({
//     chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
//     colors: [color],
//     fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
//     dataLabels: { enabled: false },
//     stroke: { curve: 'smooth', width: 3 },
//     xaxis: { type: 'datetime', labels: { style: { fontSize: '10px' } } },
//     yaxis: { title: { text: yAxisLabel } },
//     tooltip: { x: { format: 'dd MMM yyyy' } }
//   });

//   // --- Data Preparation ---
//   const yieldSeries = [{ 
//     name: 'Liters', 
//     data: milkYields.map(y => ({ x: new Date(y.date).getTime(), y: y.amount_liters })) 
//   }];

// //   const qualitySeries = [{ 
// //     name: 'Fat %', 
// //     data: milkQuality.map(q => ({ x: new Date(q.date).getTime(), y: q.fat_percentage })) 
// //   }];
// const qualitySeries = [
//   { 
//     name: 'Fat %', 
//     data: milkQuality.map(q => ({ x: new Date(q.date).getTime(), y: q.fat_percentage })) 
//   },
//   { 
//     name: 'Protein %', 
//     data: milkQuality.map(q => ({ x: new Date(q.date).getTime(), y: q.protein_percentage })) 
//   }
// ];
//   const lactationSeries = [{
//     name: 'Days in Milk',
//     data: lactations.map(l => {
//       const start = new Date(l.start_date).getTime();
//       const end = l.end_date ? new Date(l.end_date).getTime() : new Date().getTime();
//       const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
//       return { x: new Date(l.start_date).getTime(), y: days };
//     })
//   }];

//   const lactationOptions = {
//     ...getChartOptions('Days in Milk', '#77757d'),
//     chart: { type: 'bar', toolbar: { show: false } },
//     plotOptions: { bar: { borderRadius: 4, columnWidth: '40%' } }
//   };

//   // --- Column Definitions ---
//   const yieldColumns: GridColDef[] = [
//     { field: 'date', headerName: 'Date', width: 130 },
//     { field: 'animal_tag', headerName: 'Animal', flex: 1 },
//     { 
//       field: 'session', 
//       headerName: 'Session', 
//       width: 120, 
//       // renderCell: (p) => <Chip label={p.value} size="small" color="primary" variant="outlined" /> 
//     },
//     { field: 'amount_liters', headerName: 'Liters (L)', type: 'number', width: 110 },
//   ];

//   const qualityColumns: GridColDef[] = [
//     { field: 'date', headerName: 'Test Date', width: 130 },
//     { field: 'animal_tag', headerName: 'Animal', flex: 1 ,
//         renderCell:(params)=>(
//             < >{params.value}</>
//         )
//     },
//     { field: 'fat_percentage', headerName: 'Fat %', width: 100 },
//     { field: 'protein_percentage', headerName: 'Protein %', width: 100 },
//     { field: 'somatic_cell_count', headerName: 'SCC', width: 100 },
//   ];

//   const lactationColumns: GridColDef[] = [
//     { field: 'animal_tag', headerName: 'Animal', flex: 1 },
//     { field: 'start_date', headerName: 'Start', width: 120 },
//     { 
//       field: 'end_date', 
//       headerName: 'Status', 
//       width: 150,
//       renderCell: (params) => (
//         params.value ? 
//         // <Chip label={`Dry: ${params.value}`} size="small" variant="outlined" /> : 
//         // <Chip label="Milking" color="success" size="small" sx={{ fontWeight: 'bold' }} />
//         <p>Dry</p>:<p>Milking</p>
//       )
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 130,
//       renderCell: (params) => (
//         !params.row.end_date && (
//           <Button 
//             variant="outlined" 
//             // color="secondary" 
//             size="small"
//             // sx={{ textTransform: 'none', fontSize: '0.7rem', borderRadius: '6px' }}
//             sx={{ textTransform: 'none', borderRadius: '6px' }}
//             onClick={() => handleDryOff(params.row.id)}
//           >
//             Mark Dry
//           </Button>
//         )
//       )
//     }
//   ];

//   if (loading && milkYields.length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <IonSpinner name="crescent" />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
//       {/* Header Section */}


//       {/* Tabs Navigation */}
//       <Paper sx={{ borderRadius: '12px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
//         <Tabs 
//           value={tabValue} 
//           onChange={(_, val) => setTabValue(val)} 
//           sx={{ px: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 'bold', minHeight: 64 } }}
//         >
//           <Tab icon={<IonIcon icon={waterOutline} style={{ marginRight: 8 }} />} iconPosition="start" label="Milk Yield" />
//           <Tab icon={<IonIcon icon={statsChartOutline} style={{ marginRight: 8 }} />} iconPosition="start" label="Milk Quality" />
//           <Tab icon={<IonIcon icon={calendarOutline} style={{ marginRight: 8 }} />} iconPosition="start" label="Lactation" />
//         </Tabs>
//       </Paper>

//       {/* Panels */}
//       <CustomTabPanel value={tabValue} index={0}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
//         <Box>
//           {/* <Typography variant="h4" fontWeight="bold">Dairy Operations</Typography> */}
//           <Typography variant="body2" color="text.secondary" fontWeight="bold">Manage Milk Yields</Typography>
//         </Box>
//         <Button 
//           variant="contained" 
//           startIcon={<IonIcon icon={addOutline} />}
//           onClick={() => history.push("/dairy/milk-yield/add")}
//           sx={{ borderRadius: '10px', px: 4, textTransform: 'none', fontWeight: 'bold' }}
//         >
//           New Milk Yield
//         </Button>
//       </Stack>
//         <DairyTabContent 
//           title="Yield Trends" 
//           series={yieldSeries} 
//           options={getChartOptions('Liters', '#3880ff')} 
//           rows={milkYields} 
//           columns={yieldColumns} 
//         />
//       </CustomTabPanel>

//       <CustomTabPanel value={tabValue} index={1}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
//         <Box>
//           {/* <Typography variant="h4" fontWeight="bold">Dairy Operations</Typography> */}
//           <Typography variant="body2" color="text.secondary" fontWeight="bold">Manage Milk Quality Audits</Typography>
//         </Box>
//         <Button 
//           variant="contained" 
//           startIcon={<IonIcon icon={addOutline} />}
//           onClick={() => history.push("/dairy/milk-quality/add")}
//           sx={{ borderRadius: '10px', px: 4, textTransform: 'none', fontWeight: 'bold' }}
//         >
//           New Quality Audits
//         </Button>
//       </Stack>
//         <DairyTabContent 
//             title="Quality Analysis (Fat vs Protein)" 
//             series={qualitySeries} 
//             options={{
//             ...getChartOptions('Percentage', '#2dd36f'), // Fat color (Green)
//             colors: ['#2dd36f', '#3880ff'],              // Fat (Green) and Protein (Blue)
//             stroke: { curve: 'smooth', width: [3, 3] },  // Ensure both lines are smooth
//             }} 
//             rows={milkQuality} 
//             columns={qualityColumns} 
//         />
//       </CustomTabPanel>

//       <CustomTabPanel value={tabValue} index={2}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
//         <Box>
//           {/* <Typography variant="h4" fontWeight="bold">Dairy Operations</Typography> */}
//           <Typography variant="body2" color="text.secondary" fontWeight="bold">Manage Milk Lactation Cycles</Typography>
//         </Box>
//         <Button 
//           variant="contained" 
//           startIcon={<IonIcon icon={addOutline} />}
//           onClick={() => history.push("/dairy/milk-lactation/add")}
//           sx={{ borderRadius: '10px', px: 4, textTransform: 'none', fontWeight: 'bold' }}
//         >
//           New Lactation Cycles
//         </Button>
//       </Stack>
//         <DairyTabContent 
//           title="Lactation Persistence (Days)" 
//           series={lactationSeries} 
//           options={lactationOptions} 
//           rows={lactations} 
//           columns={lactationColumns} 
//           chartType="bar"
//         />
//       </CustomTabPanel>
//     </Box>
//   );
// };

// // --- Helper Component ---
// const DairyTabContent = ({ title, series, options, rows, columns, chartType = "area" }: any) => (
//   <Stack spacing={8}>
//     <Paper sx={{ p: 2, height: 350, borderRadius: '16px', border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', pl: 1 }}>{title}</Typography>
//       <Chart options={options} series={series} type={chartType} height="100%" />
//     </Paper>

//     <Box sx={{ 
//       height: 500, 
//       bgcolor: 'white', 
//       borderRadius: '16px', 
//       border: '1px solid #f0f0f0', 
//       overflow: 'hidden',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//     }}>
//       <DataGrid 
//         rows={rows} 
//         columns={columns} 
//         pageSizeOptions={[10, 25]} 
//         initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//         disableRowSelectionOnClick 
//         sx={{ border: 0, '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' } }}
//       />
//     </Box>
//   </Stack>
// );

// export default DairyDashboard;
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