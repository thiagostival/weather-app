import styled, { css } from 'styled-components';

// TYPES
interface IBtnProps {
  isError?: boolean;
  loading?: number;
}

export const WrapperBtn = styled.button<IBtnProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;
  width: fit-content;
  height: 3.125rem;
  padding: 0 2rem;

  border-radius: 0.5rem;
  background: ${(props) => props.theme['bluish-green']};

  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) => props.theme.white};

  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;

  > svg {
    font-size: 1.3rem;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
    filter: brightness(0.9);
  }

  &.refresh {
    background: ${(props) => props.theme['gray-400']};
  }

  ${(props) =>
    props.isError &&
    css`
      font-weight: 700;
      color: ${props.theme['red-600']};
      background: ${props.theme['red-200']};
    `}
`;
