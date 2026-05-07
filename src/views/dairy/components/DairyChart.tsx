import React from 'react';
import Chart from 'react-apexcharts';
import { Box } from '@mui/material';

interface DairyChartProps {
  series: any[];
  type: "area" | "bar";
  colors: string[];
  yLabel: string;
}

const DairyChart: React.FC<DairyChartProps> = ({ series, type, colors, yLabel }) => {
  const options: any = {
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    colors: colors,
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    stroke: { curve: 'smooth', width: type === 'bar' ? 0 : 3 },
    xaxis: type === 'bar' ? { type: 'category' } : { type: 'datetime' },
    yaxis: { title: { text: yLabel } },
    plotOptions: type === 'bar' ? { bar: { borderRadius: 6, columnWidth: '45%', distributed: true } } : {},
    dataLabels: { enabled: false },
  };

  return (
    <Box sx={{ height: 300 }}>
      <Chart options={options} series={series} type={type} height="100%" />
    </Box>
  );
};

export default DairyChart;