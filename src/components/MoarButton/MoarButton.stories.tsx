import { MoarButton } from './MoarButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Inputs/MoarButton',
  component: MoarButton,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    pill: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Moar Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    pill: false,
    disabled: false,
  },
} satisfies Meta<typeof MoarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pill: Story = {
  args: { pill: true },
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
