import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../../test-utils';
import { MoarButton } from './MoarButton';

describe('<MoarButton />', () => {
  it('renders the children inside a button', () => {
    renderWithTheme(<MoarButton>Click me</MoarButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('forwards onClick events', async () => {
    const onClick = vi.fn();
    renderWithTheme(<MoarButton onClick={onClick}>Go</MoarButton>);
    await userEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies a distinct class when pill is true', () => {
    const { rerender } = renderWithTheme(<MoarButton>Btn</MoarButton>);
    const before = screen.getByRole('button').className;
    rerender(<MoarButton pill>Btn</MoarButton>);
    const after = screen.getByRole('button').className;
    expect(after).not.toBe(before);
  });

  it('does not forward the pill prop to the DOM', () => {
    renderWithTheme(<MoarButton pill>Btn</MoarButton>);
    expect(screen.getByRole('button')).not.toHaveAttribute('pill');
  });

  it('respects the disabled prop', () => {
    renderWithTheme(<MoarButton disabled>Off</MoarButton>);
    expect(screen.getByRole('button', { name: 'Off' })).toBeDisabled();
  });
});
