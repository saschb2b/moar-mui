import { create } from 'storybook/theming';

const fontBase =
  '"Inter", "Roboto", "Helvetica", "Arial", system-ui, sans-serif';
const fontCode =
  '"JetBrains Mono", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace';

export const moarLight = create({
  base: 'light',
  brandTitle: 'moar-mui',
  brandUrl: 'https://github.com/saschb2b/moar-mui',
  brandTarget: '_blank',

  // MUI default palette (light)
  colorPrimary: '#1976d2',
  colorSecondary: '#9c27b0',

  // UI
  appBg: '#f6f8fa',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e0e3e7',
  appBorderRadius: 8,

  // Text
  textColor: '#1a2027',
  textInverseColor: '#ffffff',
  textMutedColor: '#5a6772',

  // Toolbar
  barTextColor: '#5a6772',
  barHoverColor: '#1976d2',
  barSelectedColor: '#1976d2',
  barBg: '#ffffff',

  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#d0d7de',
  inputTextColor: '#1a2027',
  inputBorderRadius: 6,

  fontBase,
  fontCode,
});

export const moarDark = create({
  base: 'dark',
  brandTitle: 'moar-mui',
  brandUrl: 'https://github.com/saschb2b/moar-mui',
  brandTarget: '_blank',

  colorPrimary: '#90caf9',
  colorSecondary: '#ce93d8',

  appBg: '#0a1929',
  appContentBg: '#0f1d2d',
  appPreviewBg: '#0f1d2d',
  appBorderColor: '#1e3a5f',
  appBorderRadius: 8,

  textColor: '#e7ebf0',
  textInverseColor: '#0a1929',
  textMutedColor: '#8b9bb0',

  barTextColor: '#8b9bb0',
  barHoverColor: '#90caf9',
  barSelectedColor: '#90caf9',
  barBg: '#0f1d2d',

  inputBg: '#132f4c',
  inputBorder: '#1e3a5f',
  inputTextColor: '#e7ebf0',
  inputBorderRadius: 6,

  fontBase,
  fontCode,
});
