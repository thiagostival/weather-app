import { ButtonHTMLAttributes, forwardRef } from 'react';

// STYLES
import { WrapperBtn } from './styles';

interface IBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isError?: boolean;
}

export const Btn = forwardRef<HTMLButtonElement, IBtnProps>(
  ({ children, ...rest }, ref) => {
    return (
      <WrapperBtn {...rest} ref={ref}>
        {children}
      </WrapperBtn>
    );
  }
);
