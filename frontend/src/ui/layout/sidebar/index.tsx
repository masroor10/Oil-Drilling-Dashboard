import { Box, IconButton, List, Typography, useTheme } from '@mui/material';
import { SidebarLeft, SidebarRight } from 'iconsax-react';
import { FC } from 'react';

import { bottomNave, sidebarContainer } from './style';
import { Well } from '../../types';

interface SidebarProps {
  isCollapsed: boolean;
  handleCollapsed: () => void;
  uploadedWells: Well[];
  selectedWell: Well | null;
  setSelectedWell: (well: Well) => void;
  isDrawer?: boolean;
}

export const Sidebar: FC<SidebarProps> = ({
  isCollapsed,
  handleCollapsed,
  uploadedWells,
  selectedWell,
  setSelectedWell,
  isDrawer
}) => {
  const theme = useTheme();

  return (
    <Box position={'relative'}>
      <List
        component='nav'
        sx={{
          borderRadius: isCollapsed ? '16px' : '8px',
          ...(isDrawer ? {} : sidebarContainer),
          width: isCollapsed ? '80px' : '282px',
          display: { xs: isDrawer ? 'block' : 'none', sm: 'none', md: 'block' },
          transition: 'width 0.2s ease-in-out'
        }}
      >
        <Box
          mt={isCollapsed ? 4 : 2}
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center',
            flexDirection: isCollapsed ? 'column-reverse' : 'row'
          }}
        >
          <Box>
            <Typography variant='h5'>Well list</Typography>
          </Box>
          {!isCollapsed && !isDrawer && (
            <IconButton onClick={handleCollapsed}>
              <SidebarLeft color={theme.palette.text.disabled} />
            </IconButton>
          )}
          {isCollapsed && !isDrawer && (
            <IconButton
              style={{
                background: 'white',
                position: 'absolute',
                right: '-22px',
                top: 20,
                boxShadow: '0px 4px 8px 0px #919EAB29'
              }}
              onClick={handleCollapsed}
            >
              <SidebarRight color={theme.palette.text.disabled} />
            </IconButton>
          )}
        </Box>
        <Box
          ml={2}
          display='flex'
          flexDirection='column'
          my={2}
          alignItems='flex-start'
          flex={1}
          minWidth={0}
        >
          {uploadedWells.length === 0 ? (
            <Typography
              variant='body2'
              color='text.secondary'
              whiteSpace={'nowrap'}
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: 'block',
                maxWidth: isCollapsed ? '40px' : '200px'
              }}
            >
              No wells uploaded
            </Typography>
          ) : (
            uploadedWells.map((well) => (
              <Box
                key={well.id}
                onClick={() => setSelectedWell(well)}
                sx={{
                  cursor: 'pointer',
                  p: 1,
                  mb: 1,
                  borderRadius: 1,
                  width: '100%',
                  bgcolor: well.id === selectedWell?.id ? theme.palette.grey[400] : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Typography
                  variant='body2'
                  whiteSpace={'nowrap'}
                  style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                  {well.name}
                </Typography>
                <Typography
                  style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                  variant='subtitle2'
                >
                  Depth {well.totalDepth || well.depth} ft
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </List>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'flex', md: 'none' },
          ...bottomNave,
          padding: { xs: '4px 8px', sm: '4px 24px' }
        }}
      ></Box>
    </Box>
  );
};
