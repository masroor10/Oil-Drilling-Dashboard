'use client';

import React, { useRef, useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Button,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { TabData, UploadStatus, Well } from '../../../types';
import { Cancel01Icon, FilterIcon, Search01Icon, Upload01Icon } from 'hugeicons-react';

interface DashboardTabsProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  onDataUpload: (well: Well) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab, onDataUpload }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    open: false,
    message: '',
    severity: 'success'
  });

  const [tabs, setTabs] = useState<TabData[]>([
    { label: 'Drilling Monitoring', closable: false, id: 'drilling' },
    { label: 'Offset Wells Map', closable: true, id: 'wells-map' },
    { label: 'Bit Summary', closable: true, id: 'bit-summary' }
  ]);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(new Set());

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (uploadedFiles.has(file.name)) {
      setUploadStatus({
        open: true,
        message: `File "${file.name}" has already been uploaded.`,
        severity: 'warning'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();

      if (result.success) {
        const records = result.data.records || [];

        const newWell: Well = {
          id: result.data.id,
          name: result.data.name,
          depth: records[0]?.DEPTH || 0,
          totalDepth: records[records.length - 1]?.DEPTH || 0,
          status: result.data.status,
          records: records.map((row: any) => ({
            depth: row.DEPTH,
            dt: row.DT,
            gr: row.GR,
            rockComposition: {
              sandstone: row['%SS'],
              shale: row['%SH'],
              limestone: row['%LS'],
              dolomite: row['%DOL'],
              clay: row['%ANH']
            }
          }))
        };

        onDataUpload(newWell);

        setUploadedFiles((prev) => new Set(prev).add(file.name));

        setUploadStatus({
          open: true,
          message: 'File uploaded successfully!',
          severity: 'success'
        });
      } else {
        setUploadStatus({
          open: true,
          message: result.message || 'Upload failed',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        open: true,
        message: 'Server error while uploading file.',
        severity: 'error'
      });
    } finally {
      event.target.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCloseTab = (tabIndex: number) => {
    setTabs((prev) => prev.filter((_, i) => i !== tabIndex));

    if (activeTab >= tabs.length - 1) {
      setActiveTab(tabs.length - 2 >= 0 ? tabs.length - 2 : 0);
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          flexDirection: isXs ? 'column' : 'row'
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            value={activeTab}
            variant='scrollable'
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                minHeight: 40,
                fontSize: '0.875rem'
              }
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {tab.label}
                    {tab.closable && (
                      <IconButton
                        size='Xs'
                        color='error'
                        sx={{ ml: 1, p: 0.5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseTab(index);
                        }}
                      >
                        <Cancel01Icon width={15} height={15} />
                      </IconButton>
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, ml: 2, mt: isXs ? 2 : undefined }}>
          <Button
            variant='contained'
            startIcon={<FilterIcon />}
            sx={{
              bgcolor: '#4caf50',
              '&:hover': { bgcolor: '#45a049' },
              textTransform: 'none'
            }}
          >
            Filter
          </Button>
          <Button
            variant='contained'
            startIcon={<Upload01Icon />}
            onClick={handleUploadClick}
            sx={{
              bgcolor: '#2196f3',
              '&:hover': { bgcolor: '#1976d2' },
              textTransform: 'none'
            }}
          >
            Upload
          </Button>
          <IconButton>
            <Search01Icon />
          </IconButton>
        </Box>
      </Box>

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept='.xlsx,.xls'
        style={{ display: 'none' }}
      />

      <Snackbar
        open={uploadStatus.open}
        autoHideDuration={6000}
        onClose={() => setUploadStatus((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setUploadStatus((prev) => ({ ...prev, open: false }))}
          severity={uploadStatus.severity}
        >
          {uploadStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardTabs;
