import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';

export const moarThemeDefaults = {
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      '"Inter", "Roboto", "Helvetica", "Arial", system-ui, sans-serif',
  },
} satisfies ThemeOptions;

export const createMoarTheme = (overrides: ThemeOptions = {}): Theme =>
  createTheme(moarThemeDefaults, overrides);
