import { Theme } from '@mui/material/styles';
import { tabClasses } from '@mui/material/Tab';

// ----------------------------------------------------------------------

export function tabs(theme: Theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: theme.palette.text.primary // Keep indicator color consistent
        },
        scrollButtons: {
          width: 48,
          borderRadius: '50%'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          opacity: 1,
          minWidth: 48,
          minHeight: 48,
          fontWeight: theme.typography.fontWeightSemiBold,
          borderRadius: '16px',
          transition: theme.transitions.create(['color', 'background-color'], {
            duration: theme.transitions.duration.short
          }),
          '&:not(:last-of-type)': {
            marginRight: theme.spacing(3),
            [theme.breakpoints.up('sm')]: {
              marginRight: theme.spacing(5)
            }
          },
          color: '#454F5B', // Default color for tabs
          [`&.${tabClasses.selected}`]: {
            color: '#161C24' // Active tab color
          }
        }
      }
    }
  };
}
