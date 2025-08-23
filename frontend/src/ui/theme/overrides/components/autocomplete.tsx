import { alpha, Theme } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { svgIconClasses } from '@mui/material/SvgIcon';
//
import { paper, menuItem } from '../../css';
import { ChevronDown } from 'react-feather';

// ----------------------------------------------------------------------

export function autocomplete(theme: Theme) {
  const isXs = typeof window !== 'undefined' && window.innerWidth <= 600;
  return {
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: <ChevronDown size={18} />,
        ChipProps: { size: 'small', variant: 'soft' }
      },
      styleOverrides: {
        root: {
          [`& span.${autocompleteClasses.tag}`]: {
            ...theme.typography.subtitle2,
            height: 24,
            minWidth: 24,
            lineHeight: '24px',
            textAlign: 'center',
            padding: theme.spacing(0, 0.75),
            color: theme.palette.text.secondary,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.grey[500], 0.16)
          },
          [`& .${autocompleteClasses.tag} .MuiChip-label`]: {
            maxWidth: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
          },
          [`& .MuiAutocomplete-inputRoot .MuiAutocomplete-input`]: {
            width: 0,
            minWidth: '0px'
          }
        },
        paper: {
          ...paper({ theme, dropdown: true }),
          maxHeight: isXs ? 100 : 200,
          overflowY: 'auto'
        },
        listbox: {
          padding: 0,
          maxHeight: '100%',
          overflowY: 'unset',
          [`& .${autocompleteClasses.option}`]: {
            ...menuItem(theme)
          }
        },

        endAdornment: {
          [`& .${svgIconClasses.root}`]: {
            width: 18,
            height: 18
          }
        }
      }
    }
  };
}
