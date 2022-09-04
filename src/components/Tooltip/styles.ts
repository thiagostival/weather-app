import styled, { keyframes } from 'styled-components';
import * as Tooltip from '@radix-ui/react-tooltip';

const scaleIn = keyframes`
  0% { opacity: 0; transform: scale(0) };
  100% { opacity: 1; transform: scale(1) };
`;

export const Content = styled(Tooltip.Content)`
  display: flex;
  flex-direction: column;

  padding: 10px;
  max-width: 900px;

  border-radius: 5px;
  background-color: ${({ theme }) => theme.white};

  animation: ${scaleIn} 0.2s ease-in-out;

  > span {
    color: ${({ theme }) => theme['gray-400']};
    font-size: 12px;
    font-weight: 700;
  }
`;

export const StyledArrow = styled(Tooltip.Arrow)`
  fill: ${({ theme }) => theme.white};
`;
