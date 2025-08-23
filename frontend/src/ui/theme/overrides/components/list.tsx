import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function list(theme: Theme) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2)
        },

        rootSelected: {
          backgroundColor: '#009983',
          color: 'rgba(0, 153, 131, 1)'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0
        },

        primary: {
          '&.Mui-selected': {
            backgroundColor: '#00937e14',
            color: '#009983'
          }
        }
      }
    }
  };
}
