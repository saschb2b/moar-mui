import { addons } from 'storybook/manager-api';

import { moarLight } from './theme';

addons.setConfig({
  theme: moarLight,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: true },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
