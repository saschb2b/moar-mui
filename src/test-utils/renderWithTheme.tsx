import { CssBaseline, ThemeProvider } from '@mui/material';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';

import { createMoarTheme } from '../theme/createMoarTheme';

import type { Theme } from '@mui/material/styles';
import type { ReactElement, ReactNode } from 'react';

interface RenderWithThemeOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: Theme;
}

export const renderWithTheme = (
  ui: ReactElement,
  { theme = createMoarTheme(), ...options }: RenderWithThemeOptions = {},
): RenderResult => {
  const Wrapper = ({ children }: { children: ReactNode }): ReactElement => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};
