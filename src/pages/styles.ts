import styled, { css, keyframes } from 'styled-components';
import { FiRefreshCcw } from 'react-icons/fi';

// ASSETS
import { cloudyImg } from '../assets';

// TYPES
interface ICommonProps {
  isError?: boolean;
  loading?: number;
}

export const Wrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  background: center / cover no-repeat url(${cloudyImg});
  color: ${(props) => props.theme.white};
`;

export const City = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .city {
    font-size: 2.5rem;
    font-weight: 600;
  }

  > .date {
    font-weight: 200;
    font-size: 1.5rem;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  gap: 20px;

  &.left {
    justify-content: flex-end;

    padding: 5rem 7rem;

    /* Glassmorphism */
    background: rgb(0 0 0 / 12%);
    border-radius: 0;
    box-shadow: 0 4px 30px rgb(0 0 0 / 10%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  &.right {
    padding: 5rem 2rem;
    max-width: 30%;

    /* Glassmorphism */
    background: rgb(0 0 0 / 38%);
    border-radius: 0;
    box-shadow: 0px 0px 5px rgb(0 0 0 / 60%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
`;

export const SectionLeftTop = styled.div`
  display: flex;

  gap: 30px;
  width: 100%;

  > span {
    display: flex;
    align-items: center;

    color: ${(props) => props.theme.white};
    font-size: 7.5rem;
    font-weight: 600;
  }

  > .more-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;

    font-size: 1.25rem;
    font-weight: 200;
  }

  > .content-icon {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    margin-left: 40px;

    > span {
      font-size: 1.5rem;
      font-weight: 200;
    }
  }
`;

export const SectionLeftMiddle = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
  padding-left: 0.9375rem;

  font-weight: 100;

  > svg {
    font-size: 1.25rem;
  }
`;

export const SectionLeftBottom = styled.div`
  display: flex;
  gap: 10px;

  > .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 5px;

    > span {
      font-size: 1rem;
      font-weight: 200;
    }
  }
`;

export const SectionRightTop = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;

  padding-bottom: 5rem;
  border-bottom: 1px solid ${(props) => props.theme['gray-300']};

  > span {
    font-size: 1.35rem;
    font-weight: 200;
  }
`;

export const WeatherDetails = styled.div`
  display: flex;

  gap: 25%;
  width: 100%;

  > .value {
    display: flex;
    align-items: center;
    justify-content: center;

    white-space: nowrap;
  }

  > .title-detail {
    width: 9.375rem;

    font-size: 1.1rem;
    font-weight: 300;
    color: ${(props) => props.theme['gray-300']};
  }

  @media (max-width: 1030px) {
    display: flex;
    flex-direction: column;

    > .value {
      display: block;

      white-space: nowrap;
    }
  }
`;

export const SectionRightBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;

  height: 100%;
`;

export const Btn = styled.button<ICommonProps>`
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

export const ContentTooltip = styled.div<ICommonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;
  max-width: 250px;

  text-align: center;
  font-size: 0.8rem;

  > p {
    font-weight: 700;
  }

  > a {
    text-decoration: none;
  }

  ${(props) =>
    props.isError &&
    css`
      > p {
        color: ${props.theme['red-600']};
      }
    `}
`;

const spin = keyframes`
  100% { 
        -webkit-transform: rotate(-360deg); 
        transform:rotate(-360deg); 
    } 
`;

export const Spinner = styled(FiRefreshCcw)<ICommonProps>`
  ${(props) =>
    props.loading &&
    css`
      animation: ${spin} 4s linear infinite;
    `}
`;
