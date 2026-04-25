import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { createMoarTheme } from '../src/theme/createMoarTheme';

import { moarDark, moarLight } from './theme';

import type { Preview } from '@storybook/react-vite';

const lightTheme = createMoarTheme({ palette: { mode: 'light' } });
const darkTheme = createMoarTheme({ palette: { mode: 'dark' } });

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Introduction', 'Installation', 'Theming'],
          'Components',
          ['Inputs', 'Surfaces', 'Feedback', 'Navigation', 'Data Display'],
          '*',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    docs: {
      theme: moarLight,
      toc: { title: 'On this page' },
      source: { language: 'tsx' },
    },
    a11y: { test: 'todo' },
    layout: 'centered',
    backgrounds: { disable: true },
    darkMode: { dark: moarDark, light: moarLight },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: { light: lightTheme, dark: darkTheme },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
};

export default preview;
