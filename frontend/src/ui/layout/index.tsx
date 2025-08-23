import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { Well } from '../types';

export const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [uploadedWells, setUploadedWells] = useState<Well[]>([]);
  const [selectedWell, setSelectedWell] = useState<Well | null>(null);

  const handleDataUpload = (well: Well) => {
    setUploadedWells((prev) => [...prev, well]);
    setSelectedWell(well);
  };
  return (
    <Box display={'flex'}>
      <Sidebar
        handleCollapsed={() => setIsCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
        uploadedWells={uploadedWells}
        selectedWell={selectedWell}
        setSelectedWell={setSelectedWell}
      />
      <Box
        sx={{
          pl: { xs: 2, sm: 5, md: isCollapsed ? '130px' : '340px' },
          width: '100%',
          pr: { xs: 2, sm: 4, md: 5 },
          mt: { xs: 8, sm: 10, md: 9 },
          pb: { xs: 10, sm: 10, md: 2 },
          transition: 'padding-left .2s ease-in-out'
        }}
      >
        <Header
          handleCollapsed={() => setIsCollapsed(!isCollapsed)}
          uploadedWells={uploadedWells}
          selectedWell={selectedWell}
          setSelectedWell={setSelectedWell}
          isCollapsed={isCollapsed}
        />
        <Outlet context={{ handleDataUpload, selectedWell }} />
      </Box>
    </Box>
  );
};
