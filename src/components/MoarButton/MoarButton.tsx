import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

import type { MoarButtonProps } from './MoarButton.types';

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'pill',
})<{ pill?: boolean }>(({ pill }) => ({
  ...(pill === true && { borderRadius: 9999 }),
}));

export const MoarButton = forwardRef<HTMLButtonElement, MoarButtonProps>(
  function MoarButton({ pill = false, ...rest }, ref) {
    return <StyledButton ref={ref} pill={pill} {...rest} />;
  },
);
