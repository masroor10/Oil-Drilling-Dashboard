'use client';

import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Chart
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WellData } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WellDataVisualizationProps {
  data: WellData[];
}

const WellDataVisualization: React.FC<WellDataVisualizationProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary'
        }}
      >
        Upload or select well data to view visualization
      </Box>
    );
  }

  const sortedData = [...data].sort((a, b) => (a.depth || 0) - (b.depth || 0));

  const depthLabels = sortedData.map((d) => d.depth);
  const rockKeys = Object.keys(sortedData[0].rockComposition || {});

  const rockDatasets = rockKeys.map((key, index) => ({
    label: key.replace('%', ''),
    data: sortedData.map((d) => d.rockComposition[key] || 0),
    borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
    backgroundColor: `hsla(${(index * 60) % 360}, 70%, 50%, 0.2)`,
    fill: true,
    tension: 0.3
  }));

  const generateSpiky = (values: number[]) => {
    return values.map((v) => v + (Math.random() - 0.5) * (v * 0.2));
  };

  const dtDataset = {
    label: 'DT',
    data: generateSpiky(sortedData.map((d) => d.dt || 0)),
    borderColor: '#ff6b9d',
    backgroundColor: 'rgba(255,107,157,0.1)',
    fill: false,
    tension: 0.2,
    pointRadius: 0
  };

  const grDataset = {
    label: 'GR',
    data: generateSpiky(sortedData.map((d) => d.gr || 0)),
    borderColor: '#45b7d1',
    backgroundColor: 'rgba(69,183,209,0.1)',
    fill: false,
    tension: 0.2,
    pointRadius: 0
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    indexAxis: 'y' as const,
    scales: {
      x: {
        title: { display: true, text: 'Value' }
      },
      y: {
        title: { display: true, text: 'Depth' },
        reverse: true
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: false,
          boxWidth: 20,
          boxHeight: 12,
          generateLabels: (chart: Chart) => {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            return original.map((label) => ({
              ...label,
              fillStyle: label.strokeStyle,
              strokeStyle: label.strokeStyle
            }));
          }
        }
      }
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={1} sx={{ height: '100%', p: 2 }}>
            <Typography variant='h6' sx={{ mb: 1, textAlign: 'center' }}>
              Rock Composition
            </Typography>
            <Box sx={{ height: '90%' }}>
              <Line
                data={{ labels: depthLabels, datasets: rockDatasets }}
                options={commonOptions}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={1} sx={{ height: '100%', p: 2 }}>
            <Typography variant='h6' sx={{ mb: 1, textAlign: 'center' }}>
              DT
            </Typography>
            <Box sx={{ height: '90%' }}>
              <Line data={{ labels: depthLabels, datasets: [dtDataset] }} options={commonOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={1} sx={{ height: '100%', p: 2 }}>
            <Typography variant='h6' sx={{ mb: 1, textAlign: 'center' }}>
              GR
            </Typography>
            <Box sx={{ height: '90%' }}>
              <Line data={{ labels: depthLabels, datasets: [grDataset] }} options={commonOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WellDataVisualization;
