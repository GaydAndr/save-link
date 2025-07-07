// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark', // Ти використовуєш темну тему, задамо її як основну
    primary: {
      main: '#9e2dcc', // Твій фіолетовий, трохи підібраний
    },
    secondary: {
      main: '#f50057', // Приклад для іншого кольору
    },
    background: {
      default: '#121212', // Стандартний темний фон
      paper: '#1e1e1e', // Фон для "паперових" елементів
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    error: {
      main: '#f44336',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Кнопки не будуть в верхньому регістрі
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Робить кнопки "пласкими"
      }
    },
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',

          }
        },
      }
    },
});