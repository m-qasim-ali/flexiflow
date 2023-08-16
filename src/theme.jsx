import { createTheme } from '@mui/material';

export const colors = [
  '#F49D6E',
  '#E85A4F',
  '#FFD166',
  '#8ABEB7',
  '#247BA0',
  '#D3D3D3',
];

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1D1F26',
    },
    primary: {
      main: '#BEA4FF',
    },
  },
  boardBg: '#000000d6',
  shape: {
    borderRadius: 0,
  },
  typography: {
    button: {
      textTransform: 'unset',
    },
    fontFamily: 'Lato',
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      },
    },

    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },

    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          fontWeight: 600,
          textTransform: 'capitalize',
        },
      },
    },
  },
});
