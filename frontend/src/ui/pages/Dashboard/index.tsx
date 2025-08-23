'use client';

import React, { useState } from 'react';
import { Box, Drawer, Fab, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { Well } from '../../types';
import DashboardTabs from './components/DashboardTab';
import WellDataVisualization from './components/DataVisualization';
import ChatbotInterface from './components/ChatBot';
import { useOutletContext } from 'react-router-dom';
import { ChatBotIcon } from 'hugeicons-react';

interface DashboardContext {
  handleDataUpload: (well: Well) => void;
  selectedWell: Well | null;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const [activeTab, setActiveTab] = useState<number>(0);
  const [chatOpen, setChatOpen] = useState(false);

  const { handleDataUpload, selectedWell } = useOutletContext<DashboardContext>();

  const uploadedData = selectedWell?.records || null;

  return (
    <Box sx={{ flexGrow: 1, height: 'calc(100dvh - 90px)', bgcolor: '#f5f5f5' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid size={{ xs: 12, sm: 9 }} sx={{ height: '100%' }}>
          <Paper elevation={0} sx={{ height: '100%', borderRadius: 0 }}>
            <DashboardTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onDataUpload={handleDataUpload}
            />
            <Box sx={{ p: 2, height: 'calc(100% - 64px)', overflow: 'auto' }}>
              {uploadedData && uploadedData.length > 0 ? (
                <WellDataVisualization data={uploadedData} />
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'text.secondary'
                  }}
                >
                  Upload well data to view visualization
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        {isDownLg ? (
          <>
            {' '}
            <Fab
              color='info'
              sx={{ position: 'fixed', bottom: 24, right: 24 }}
              onClick={() => setChatOpen(true)}
            >
              <ChatBotIcon />
            </Fab>
            <Drawer
              anchor='bottom'
              open={chatOpen}
              onClose={() => setChatOpen(false)}
              PaperProps={{
                sx: { height: '100%', borderRadius: '16px 16px 0 0' }
              }}
            >
              <ChatbotInterface uploadedData={uploadedData} />
            </Drawer>
          </>
        ) : (
          <Grid size={{ xs: 12, sm: 3 }} sx={{ height: '100%' }}>
            <ChatbotInterface uploadedData={uploadedData} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
