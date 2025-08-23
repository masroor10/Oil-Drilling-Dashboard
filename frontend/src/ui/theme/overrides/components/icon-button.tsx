import { Theme } from '@mui/material/styles';

// Extend IconButton props to include `Xs` as a valid size
declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    Xs: true;
  }
}

export default function IconButton(theme: Theme) {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '500px'
        },
        sizeLarge: {
          width: '48px',
          height: '48px',
          fontSize: '32px'
        },
        sizeMedium: {
          width: '40px',
          height: '40px',
          fontSize: '24px'
        },
        sizeSmall: {
          width: '36px',
          height: '36px',
          fontSize: '20px'
        },
        sizeXs: {
          width: '32px',
          height: '32px'
        }
      }
    }
  };
}
