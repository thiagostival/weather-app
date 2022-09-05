import styled, { css } from 'styled-components';

// TYPES
interface ITooltipProps {
  isError?: boolean;
}

export const WrapperSectionRight = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  gap: 20px;
  max-width: 30%;
  padding: 5rem 2rem;

  /* Glassmorphism */
  background: rgb(0 0 0 / 38%);
  border-radius: 0;
  box-shadow: 0px 0px 5px rgb(0 0 0 / 60%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
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

export const ContentTooltip = styled.div<ITooltipProps>`
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
