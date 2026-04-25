import type { ButtonProps } from '@mui/material/Button';

export interface MoarButtonProps extends ButtonProps {
  /**
   * If true, applies an extra-rounded "pill" shape regardless of theme.
   * @default false
   */
  pill?: boolean;
}
