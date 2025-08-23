import { Theme } from '@mui/material/styles';
import { ChevronDown } from 'react-feather';

// ----------------------------------------------------------------------

export function select(theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ChevronDown
      },
      styleOverrides: {
        icon: {
          right: 18,
          width: 18,
          height: 18,
          top: 'calc(50% - 9px)'
        }
      }
    },
    MuiNativeSelect: {
      styleOverrides: {
        icon: {
          right: 18,
          width: 18,
          height: 18,
          top: 'calc(50% - 9px)'
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          maxHeight: '500px !important',
          overflowY: 'auto'
        }
      }
    }
  };
}
