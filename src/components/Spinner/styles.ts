import { FiRefreshCcw } from 'react-icons/fi';
import styled, { css, keyframes } from 'styled-components';

// TYPES
interface ISpinnerProps {
  loading?: number;
}

const spin = keyframes`
  100% { 
        -webkit-transform: rotate(-360deg); 
        transform:rotate(-360deg); 
    } 
`;

export const WrapperSpinner = styled(FiRefreshCcw)<ISpinnerProps>`
  ${(props) =>
    props.loading &&
    css`
      animation: ${spin} 4s linear infinite;
    `}
`;
