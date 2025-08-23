import { Box, Drawer, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';

import { headerContainer } from '../sidebar/style';
import { useState } from 'react';
import { Hamburger01Icon } from 'hugeicons-react';
import { Sidebar } from '../sidebar';
import { Well } from '../../types';

interface IHeaderProps {
  isCollapsed: boolean;
  uploadedWells: Well[];
  selectedWell: Well | null;
  setSelectedWell: (well: Well) => void;
  handleCollapsed: () => void;
}
export const Header: React.FC<IHeaderProps> = ({
  isCollapsed,
  uploadedWells,
  selectedWell,
  setSelectedWell,
  handleCollapsed
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box
      sx={{
        ...headerContainer,
        padding: { xs: '8px 16px', sm: '16px 32px' },
        display: 'flex'
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 1 } }}
        ml={isXs ? undefined : isCollapsed ? 15 : 40}
      >
        <img src='/assets/logo.png' alt='Logo' width={40} height={40} />
        <Typography variant='h6'>Drill AI Intelligence Platform</Typography>
      </Box>
      {isXs && (
        <IconButton onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }}>
          <Hamburger01Icon />
        </IconButton>
      )}
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: '300px', padding: '10px' }
        }}
      >
        <Sidebar
          isCollapsed={false}
          handleCollapsed={handleCollapsed}
          uploadedWells={uploadedWells}
          selectedWell={selectedWell}
          setSelectedWell={(well) => {
            setSelectedWell(well);
            setDrawerOpen(false);
          }}
          isDrawer={true}
        />
      </Drawer>
    </Box>
  );
};
